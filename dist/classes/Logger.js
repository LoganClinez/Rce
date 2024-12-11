"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
var ConsoleColor;
(function (ConsoleColor) {
    ConsoleColor["Reset"] = "\u001B[0m";
    ConsoleColor["FgRed"] = "\u001B[31m";
    ConsoleColor["FgGreen"] = "\u001B[32m";
    ConsoleColor["FgYellow"] = "\u001B[33m";
    ConsoleColor["FgCyan"] = "\u001B[36m";
    ConsoleColor["FgMagenta"] = "\u001B[35m";
})(ConsoleColor || (ConsoleColor = {}));
class Logger {
    emitter;
    level;
    file;
    static LOG_TYPES = {
        warn: { prefix: "[WARNING]", emoji: "⚠️", color: ConsoleColor.FgYellow },
        info: { prefix: "[INFO]", emoji: "💬", color: ConsoleColor.FgCyan },
        debug: { prefix: "[DEBUG]", emoji: "🔧", color: ConsoleColor.FgMagenta },
        error: { prefix: "[ERROR]", emoji: "❌", color: ConsoleColor.FgRed },
    };
    constructor(emitter, opts) {
        this.level = opts.logLevel ?? constants_1.LogLevel.Info;
        this.file = opts.logFile;
        this.emitter = emitter;
        if (this.file) {
            this.validateFilePath();
        }
    }
    validateFilePath() {
        if (this.file && !fs_1.default.existsSync(this.file)) {
            const dir = path_1.default.dirname(this.file);
            if (!fs_1.default.existsSync(dir)) {
                fs_1.default.mkdirSync(dir, { recursive: true });
            }
            fs_1.default.writeFileSync(this.file, "");
        }
    }
    handleFileSize() {
        if (this.file) {
            const stats = fs_1.default.statSync(this.file);
            if (stats.size > 300_000_000) {
                const archiveName = `${this.file}.${(0, uuid_1.v4)()}.log`;
                fs_1.default.renameSync(this.file, archiveName);
                fs_1.default.writeFileSync(this.file, "");
            }
        }
    }
    async logToFileAsync(type, content) {
        if (this.file) {
            const stats = await fs_1.default.promises.stat(this.file).catch(() => null);
            if (stats && stats.size > 300_000_000) {
                const archiveName = `${this.file}.${(0, uuid_1.v4)()}.log`;
                await fs_1.default.promises.rename(this.file, archiveName);
                await fs_1.default.promises.writeFile(this.file, "");
            }
            const logMessage = typeof content === "string"
                ? `[${type.toUpperCase()}]: ${content}\n`
                : `[${type.toUpperCase()}]: ${(0, util_1.inspect)(content, { depth: 5 })}\n`;
            await fs_1.default.promises.appendFile(this.file, logMessage);
        }
    }
    format(content) {
        return typeof content === "string"
            ? content
            : (0, util_1.inspect)(content, { depth: 5 });
    }
    formatTimestamp(date) {
        return date.toLocaleTimeString([], { hour12: true });
    }
    log(level, type, content, logType) {
        this.handleFileSize();
        this.logToFileAsync(type, content).catch(console.error);
        if (this.level !== constants_1.LogLevel.None && level <= this.level) {
            const timestamp = this.formatTimestamp(new Date());
            const formattedMessage = `\x1b[90m[${timestamp}]\x1b[0m  ${logType.color}${logType.prefix}${ConsoleColor.Reset}  ${logType.emoji}  ${this.format(content)}`;
            console.log(formattedMessage);
            this.emitter.emit(constants_1.RCEEvent.Log, { level, content: this.format(content) });
        }
    }
    logMessage(level, type, content) {
        const logType = Logger.LOG_TYPES[type];
        this.log(level, type, content, logType);
    }
    warn(content) {
        this.logMessage(constants_1.LogLevel.Warn, "warn", content);
    }
    info(content) {
        this.logMessage(constants_1.LogLevel.Info, "info", content);
    }
    debug(content) {
        this.logMessage(constants_1.LogLevel.Debug, "debug", content);
    }
    error(content) {
        this.logMessage(constants_1.LogLevel.Error, "error", content);
    }
}
exports.default = Logger;
//# sourceMappingURL=Logger.js.map