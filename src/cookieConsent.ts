import Cookie from "./cookie";
import CookieManager from "./cookieManager";
import Logger from "./logger";

export default abstract class CookieConsent {

    public static readonly defaultExpiryDurationInDays = 365;
    public static readonly key = `${Logger.applicationName}_consented`;

    /**
     * Returns a value indicating whether cookie consent been previously given
     */
    public static check(): boolean {
        return CookieManager.check(CookieConsent.key);
    }

    /**
     * Sets the consent cookie on the client browser
     */
    public static set(): void {
        let consentCookie = new Cookie(CookieConsent.key, "1");
        consentCookie.expireInDays(CookieConsent.defaultExpiryDurationInDays);
        CookieManager.set(consentCookie);
    }

    /**
     * Resets the consent cookie on the client browser
     */
    public static reset(): void {
        CookieManager.delete(new Cookie(CookieConsent.key, "1"));
    }

    /**
     * Ask the client for cookie consent and set if given
     * @param method Callback that returns a value whether the client has consented
     */
    public static ask(method: () => boolean): boolean {
        let askResult = method();
        if (askResult) CookieConsent.set();
        return askResult;
    }

    /**
     * Shorthand method for checking, asking, and setting cookies based on client consent
     * @param askMethod Callback that returns a value whether the client has consented
     * @param cookieMethod Callback for setting any cookies based on consent
     */
    public static go(askMethod: () => boolean, cookieMethod: () => void): void {
        if (CookieConsent.check() || CookieConsent.ask(askMethod)) {
            cookieMethod();
        } else {
            Logger.warn("Cookie consent has not been given. Be wary of unexpected behaviour!");
        }
    }
}