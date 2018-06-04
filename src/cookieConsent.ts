import Cookie from "./cookie";
import CookieManager from "./cookieManager";
import Logger from "./logger";
import { ConsentDialog } from "./consentDialog";

export default abstract class CookieConsent {

    public static readonly key = `${Logger.applicationName}_consented`;
    public static readonly optInValue = "1";    
    public static readonly optOutValue = "0";    

    public static defaultOptInExpiryDurationInDays = 365;
    public static defaultOptOutExpiryDurationInDays = 1;

    /**
     * The callback function called if cookie consent has been given.
     */
    public static optInCallback?: () => void;

    /**
     * The callback function called if cookie consent has not been given.
     */
    public static optOutCallback?: () => void;

    /**
     * Returns a value indicating whether cookie consent been previously given or refused
     * If consent has never been given (i.e., no cookie is set), returns null
     */
    public static check(): boolean | null {
        let value = CookieManager.getValue(CookieConsent.key);
        switch (value) {
            case CookieConsent.optInValue: return true;
            case CookieConsent.optOutValue: return false;
            default: return null;
        }
    }

    /**
     * Sets the consent cookie to opt-in on the client browser
     */
    public static optIn(): void {
        let consentCookie = new Cookie(CookieConsent.key, CookieConsent.optInValue);
        consentCookie.expireInDays(CookieConsent.defaultOptInExpiryDurationInDays);
        CookieManager.set(consentCookie);
        if (CookieConsent.optInCallback) CookieConsent.optInCallback();
        ConsentDialog.closeDialog();
    }

    /**
     * Sets the consent cookie to opt-out on the client browser
     */
    public static optOut(): void {
        let consentCookie = new Cookie(CookieConsent.key, CookieConsent.optOutValue);
        consentCookie.expireInDays(CookieConsent.defaultOptOutExpiryDurationInDays);
        CookieManager.set(consentCookie);
        if (CookieConsent.optOutCallback) CookieConsent.optOutCallback();
        ConsentDialog.closeDialog();
    }

    /**
     * Resets the consent cookie on the client browser
     */
    public static reset(): void {
        CookieManager.delete(new Cookie(CookieConsent.key));
    }

    /**
     * Shorthand method for checking, asking, and setting cookies based on client consent
     * @param cookieCallback Callback for setting any cookies if consent has been given
     */
    public static go(): void {
        let check = CookieConsent.check();
        if (check === null) {
            ConsentDialog.showPassiveDialog();
        } else if (check && CookieConsent.optInCallback) {
            CookieConsent.optInCallback();
        } else if (!check && CookieConsent.optOutCallback) {
            CookieConsent.optOutCallback();
        }
    }
}