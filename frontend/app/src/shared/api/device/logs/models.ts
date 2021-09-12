export interface DeviceLog {
    date: string;
    level: LogLevel;
    message: string;
}

export enum LogLevel {
    Verbose = "VERBOSE",
    Info = "INFO",
    Warning = "WARNING",
    Error = "ERROR",
}
