export interface DeviceLog {
    date: string;
    level: LogLevel;
    message: string;
}

export enum LogLevel {
    Verbose = "Verbose",
    Info = "Info",
    Warning = "Warning",
    Error = "Error",
}
