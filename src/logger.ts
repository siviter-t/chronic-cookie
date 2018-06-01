export default abstract class Logger {

    public static readonly ApplicationName: string = "chronic-cookie";

    public static error(message: string): Error {
        return new Error(Logger.prefixFormat(message));
    }

    public static info(message: string): void {
        console.info(Logger.prefixFormat(message));
    }

    public static log(message: string): void {
        console.log(Logger.prefixFormat(message));
    }
    
    public static warn(message: string): void {
        console.warn(Logger.prefixFormat(message));
    }

    private static prefixFormat(message: string): string {
        return `<${Logger.ApplicationName}>  ${message}`;
    }
}