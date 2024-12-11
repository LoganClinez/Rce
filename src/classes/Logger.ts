import { LogLevel, RCEEvent } from "../constants";
import { inspect } from "util";
import { type LoggerOptions } from "../types";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import RCEManager from "./RCEManager";

enum ConsoleColor {
  Reset = "\x1b[0m",
  FgRed = "\x1b[31m",
  FgGreen = "\x1b[32m",
  FgYellow = "\x1b[33m",
  FgCyan = "\x1b[36m",
  FgMagenta = "\x1b[35m",
}

interface LogType {
  prefix: string;
  emoji: string;
  color: string;
}

export default class Logger {
  private emitter: RCEManager;
  private level: LogLevel;
  private file: string | undefined;

  private static LOG_TYPES: Record<string, LogType> = {
    warn: { prefix: "[WARNING]", emoji: "⚠️", color: ConsoleColor.FgYellow },
    info: { prefix: "[INFO]", emoji: "💬", color: ConsoleColor.FgCyan },
    debug: { prefix: "[DEBUG]", emoji: "🔧", color: ConsoleColor.FgMagenta },
    error: { prefix: "[ERROR]", emoji: "❌", color: ConsoleColor.FgRed },
  };

  public constructor(emitter: RCEManager, opts: LoggerOptions) {
    this.level = opts.logLevel ?? LogLevel.Info;
    this.file = opts.logFile;
    this.emitter = emitter;

    if (this.file) {
      this.validateFilePath();
    }
  }

  private validateFilePath(): void {
    if (this.file && !fs.existsSync(this.file)) {
      const dir = path.dirname(this.file);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.file, "");
    }
  }

  private handleFileSize(): void {
    if (this.file) {
      const stats = fs.statSync(this.file);
      if (stats.size > 300_000_000) {
        const archiveName = `${this.file}.${uuidv4()}.log`;
        fs.renameSync(this.file, archiveName);
        if (!fs.existsSync(archiveName)) {
          console.error(`Failed to archive log file: ${archiveName}`);
        }
        fs.writeFileSync(this.file, "");
      }
    }
  }

  private async logToFileAsync(type: string, content: any): Promise<void> {
    if (this.file) {
      await fs.promises.stat(this.file).then(stats => {
        if (stats.size > 300_000_000) {
          const archiveName = `${this.file}.${uuidv4()}.log`;
          return fs.promises.rename(this.file, archiveName).then(() => {
            if (!fs.existsSync(archiveName)) {
              console.error(`Failed to archive log file: ${archiveName}`);
            }
            fs.promises.writeFile(this.file!, "");
          });
        }
      }).catch(err => {
        console.error(`Error handling log file size: ${err.message}`);
      });

      const logMessage =
        typeof content === "string"
          ? `[${type.toUpperCase()}]: ${content}\n`
          : `[${type.toUpperCase()}]: ${inspect(content, { depth: 5 })}\n`;

      await fs.promises.appendFile(this.file, logMessage);
    }
  }

  private format(content: any): string {
    return typeof content === "string"
      ? content
      : inspect(content, { depth: 5 });
  }

  private formatTimestamp(date: Date, format = "hh:mm:ss A"): string {
    return date.toLocaleTimeString([], { hour12: true });
  }

  private log(
    level: LogLevel,
    type: string,
    content: any,
    logType: LogType
  ): void {
    this.handleFileSize();
    this.logToFileAsync(type, content).catch(console.error);

    if (this.level !== LogLevel.None && level <= this.level) {
      const date = new Date();
      const timestamp = this.formatTimestamp(date);

      const formattedMessage = `\x1b[90m[${timestamp}]\x1b[0m  ${logType.color}${logType.prefix}${ConsoleColor.Reset}  ${logType.emoji}  ${this.format(content)}`;

      console.log(formattedMessage);

      this.emitter.emit(RCEEvent.Log, { level, content: this.format(content) });
      this.emitter.emit(RCEEvent.LogRaw, { level, type, content });
    }
  }

  public logMessage(level: LogLevel, type: keyof typeof Logger.LOG_TYPES, content: any): void {
    const logType = Logger.LOG_TYPES[type];
    this.log(level, type, content, logType);
  }

  public warn(content: any): void {
    this.logMessage(LogLevel.Warn, "warn", content);
  }

  public info(content: any): void {
    this.logMessage(LogLevel.Info, "info", content);
  }

  public debug(content: any): void {
    this.logMessage(LogLevel.Debug, "debug", content);
  }

  public error(content: any): void {
    this.logMessage(LogLevel.Error, "error", content);
  }
}
