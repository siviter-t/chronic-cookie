import Cookie from "./cookie";
import Logger from "./logger";

export default abstract class Manager {

    /**
     * Sets a cookie on the client browser
     * @param cookie Cookie object
     */
    public static set(cookie: Cookie): void {
        document.cookie = cookie.toString();
    }

    /**
     * Returns all cookies in an array of 'key=value' strings
     * @Warning, watch out for whites
     */
    public static getAll(): string[] {
        return document.cookie.split(';');
    }

    /**
     * Returns a value indicating whether a cookie of the specified key exists
     * @param cookieKey Cookie identifier
     */
    public static check(cookieKey: string): boolean {
        return (Manager.getAll().filter((cookieString: string): boolean => {
            return cookieString.indexOf(`${cookieKey}=`) >= 0
        }).length > 0);
    }

    /**
     * Checks the client browser for a cookie by key and returns its value if possible
     * @param cookieKey Cookie identifier
     */
    public static getValue(cookieKey: string): string | null {
        let suffixedKey = `${cookieKey}=`;
        let findResult = Manager.getAll().filter((cookieString: string): boolean => {
            return cookieString.indexOf(suffixedKey) >= 0
        });

        if (findResult && findResult.length == 1) {
            let cookie = findResult[0];
            if (cookie) cookie = cookie.trim();
            return cookie.substring(suffixedKey.length, cookie.length);
        }

        return null;
    }

    /**
     * Deletes a cookie on the client browser
     * This is done by setting the expiry to a past date
     * @param cookie Cookie object
     */
    public static delete(cookie: Cookie): void {
        if (Manager.getValue(cookie.key)) {
            cookie.expire();
            document.cookie = cookie.toString();
        }
    }
}