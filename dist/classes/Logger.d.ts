import { LogLevel } from "../constants";
import { type LoggerOptions } from "../types";
import RCEManager from "./RCEManager";
export default class Logger {
    private emitter;
    private level;
    private file;
    private static LOG_TYPES;
    constructor(emitter: RCEManager, opts: LoggerOptions);
    private validateFilePath;
    private handleFileSize;
    private logToFileAsync;
    private format;
    private formatTimestamp;
    private log;
    logMessage(level: LogLevel, type: keyof typeof Logger.LOG_TYPES, content: any): void;
    warn(content: any): void;
    info(content: any): void;
    debug(content: any): void;
    error(content: any): void;
}
