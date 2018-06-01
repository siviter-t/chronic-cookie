import Cookie from "./cookie";

export default abstract class CookieStringBuilder {

    /**
     * Gets a 'key = value' string format for cookies
     * Undefined values are replaced with empty strings
     * @param key Cookie identifier
     * @param value Cookie value
     */
    public static getKeyValuePairString(key: string, value?: string): string {
        return `${key}=${value ? value : ""}; `
    }

    /**
     * Gets a pre-formatted 'expires = value' string for cookies
     * @param expiryDate Date of cookie expiry
     */
    public static getExpiryString(expiryDate?: Date): string {
        return expiryDate
            ? CookieStringBuilder.getKeyValuePairString("expires", expiryDate.toUTCString())
            : "";
    }

    /**
     * Gets a pre-formatted 'path = value' string for cookies
     * @param path Cookie path
     */
    public static getPathString(path?: string): string {
        return CookieStringBuilder.getKeyValuePairString("path", path ? path : "/");
    }

    /**
     * Combines the key, value, expiry, and path properties of a Cookie objects
     * into a valid document.cookie string
     * @param cookie Cookie object
     */
    public static getFullString(cookie: Cookie): string {
        return (
            CookieStringBuilder.getKeyValuePairString(cookie.key, cookie.value) +
            CookieStringBuilder.getExpiryString(cookie.expiry) +
            CookieStringBuilder.getPathString(cookie.path)
        ).trim();
    }
}