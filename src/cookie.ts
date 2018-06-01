import CookieStringBuilder from "./cookieStringBuilder";
import Logger from "./logger";

export default class Cookie {

    /**
     * @param key Key identifier
     * @param value Value of the cookie
     * @param expiry Expiry date (default: on browser close)
     * @param path Cookie path (default: page root)
     */
    constructor(public key: string, public value?: string, public expiry?: Date, public path?: string) {
        if (!key) throw Logger.error("A key string is required for cookie instantiation");
        if (!path) this.resetPath();
    }

    /**
     * Sets the cookie to expire by setting the expiry date to the inception point of the
     * JavaScript Date object - 1 January 1970 UTC.
     * @note Dates in JS: Time is measured as a number in milliseconds since 1 January 1970 UTC.
     */
    public expire(): void {
        this.expiry = new Date(0);
    }

    /**
     * Sets the cookie to expire when the current browser instance is closed.
     * By default this is when the expiry is undefined - or null.
     */
    public expireOnBrowserClose(): void {
        this.expiry = undefined;
    }

    /**
     * Sets the expiry date to be when the given duration in days elapses.
     * @param numberOfDays Number of days until expiry
     */
    public expireInDays(numberOfDays: number): void {
        if (numberOfDays > 0) {
            let date = new Date();
            date.setTime(date.getTime() + (numberOfDays * 86400000));
            this.expiry = date;
        } else if (numberOfDays = 0) {
            this.expireOnBrowserClose();
        } else {
            this.expire();
        }
    }

    /**
     * Resets the cookie path to the page root
     */
    public resetPath(): void {
        this.path = "/";
    }

    /**
     * Gets the string representation of this cookie. I.e., the useful part for browsers ;)
     */
    public toString(): string {
        return CookieStringBuilder.getFullString(this);
    }
}