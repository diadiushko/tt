class Logger {
    public info(msg: string, ...additional: Array<unknown>): void {
        console.log(msg, ...additional);
    }

    public warn(msg: string, ...additional: Array<unknown>): void {
        console.warn(msg, ...additional);
    }

    public error(msg: string, error: Error, ...additional: Array<unknown>): void {
        console.error(msg, error, ...additional);
    }
}

export default new Logger();
