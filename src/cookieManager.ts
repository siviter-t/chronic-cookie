import Cookie from "./cookie";
import Logger from "./logger";

export default abstract class Manager {

    /**
     * Sets a cookie on the client browser
     * @param cookie Cookie object
     */
    public static setCookie(cookie: Cookie): void {
        document.cookie = cookie.toString();
    }

    /**
     * Returns all cookies in an array of 'key=value' strings
     * @Warning, watch out for whites
     */
    public static getAllCookies(): string[] {
        return document.cookie.split(';');
    }

    /**
     * Returns a value indicating whether a cookie of the specified key exists
     * @param cookieKey Cookie identifier
     */
    public static checkCookie(cookieKey: string): boolean {
        return (Manager.getAllCookies().filter((cookieString: string): boolean => {
            return cookieString.indexOf(`${cookieKey}=`) >= 0
        }).length > 0);
    }

    /**
     * Checks the client browser for a cookie by key and returns its value
     * @param cookieKey Cookie identifier
     */
    public static getCookieValue(cookieKey: string): string {
        let suffixedKey = `${cookieKey}=`;
        let findResult = Manager.getAllCookies().filter((cookieString: string): boolean => {
            return cookieString.indexOf(suffixedKey) >= 0
        });

        if (findResult.length = 1) {
            let cookie = findResult[0].trim();
            return cookie.substring(suffixedKey.length, cookie.length);
        }

        throw Logger.error(`Could not find ${cookieKey}`);
    }

    /**
     * Deletes a cookie on the client browser
     * This is done by setting the expiry to a past date
     * @param cookie Cookie object
     */
    public static deleteCookie(cookie: Cookie): void {
        if (Manager.getCookieValue(cookie.key)) {
            cookie.expire();
            document.cookie = cookie.toString();
        } else {
            Logger.warn(`Cannot delete '${cookie.key}' as it has not been set`);
        }
    }
}