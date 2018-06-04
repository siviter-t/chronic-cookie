import CookieConsent from "./cookieConsent";

/**
 * Valid dialog display positions
 */
export abstract class ConsentDialogPosition {
    public static top = "chronic-cookie-dialog-top";
    public static bottom = "chronic-cookie-dialog-bottom";
}

/**
 * Pre-built cookie consent dialogs / banners to display to the client 
 */
export abstract class ConsentDialog {

    private static _open: boolean;

    public static id: string = "chronic-cookie-dialog";

    public static titleText = "This website uses cookies to ensure you get the best experience.";
    public static messageText = "We use cookies to personalise your content and to analyse our traffic. " +
                                "Some of these cookies are provided by trusted third parties, like Google, " +
                                "and track usage statistics such as how long you spend on the website. If you " + 
                                "continue to use this website, you consent to our use of cookies.";

    public static optInId = "chronic-cookie-opt-in-button";
    public static optInButtonText = "OK";

    public static optOutId = "chronic-cookie-opt-out-button";
    public static optOutButtonText = "Opt-out";

    public static infoButtonText = "More info";
    public static infoButtonHref = "#";
    
    private static _position = ConsentDialogPosition.top;

    public static get position(): string {
        return ConsentDialog._position;
    }

    public static set position(dialogPosition: string) {
        switch (dialogPosition) {
            case ConsentDialogPosition.top:
            case ConsentDialogPosition.bottom:
                ConsentDialog._position = dialogPosition;
                break;
            default:
                ConsentDialog._position = ConsentDialogPosition.top;
                break;
        }
    }

    public static showPassiveDialog(): void {
        if (!ConsentDialog._open) {
            let body = document.getElementsByTagName('body')[0];
            let dialogContainer = document.createElement("div");
            dialogContainer.id = ConsentDialog.id;
            dialogContainer.className = `chronic-cookie-dialog-container ${ConsentDialog.position}`;
            dialogContainer.innerHTML = ConsentDialog.passiveDialogHtml;
            body.appendChild(dialogContainer);
            ConsentDialog._open = true;
            ConsentDialog.bindClickEvents();
        }
    }

    /**
     * Closes any open dialog windows 
     */
    public static closeDialog(): void {
        if (ConsentDialog._open) {
            let dialog = document.getElementById(ConsentDialog.id);
            if (dialog) dialog.outerHTML = "";
            ConsentDialog._open = false;
        }
    }

    private static bindClickEventsIfEventExists(id: string, event?: () => any): void {
        let element = document.getElementById(id);
        if (element && event) element.onclick = event;
    }

    private static bindClickEvents(): void {
        ConsentDialog.bindClickEventsIfEventExists(ConsentDialog.optInId, CookieConsent.optIn);
        ConsentDialog.bindClickEventsIfEventExists(ConsentDialog.optOutId, CookieConsent.optOut);
    }

    private static get passiveDialogHtml(): string {
        return `<table style="width: 100%;">
<tbody>
    <tr>
        <td style="max-width: 0.1%;">
            <div style="word-wrap: break-word; overflow-wrap:break-word;">
                <h3 class="chronic-cookie-dialog-message">${ConsentDialog.titleText}</h3>
                <p class="chronic-cookie-dialog-message">
                    ${ConsentDialog.messageText} <a href="${ConsentDialog.infoButtonHref}">${ConsentDialog.infoButtonText}</a>.
                </p>
            </div>
        </td>
        <td style="width: 0.1%; white-space: nowrap;">
            <a id="${ConsentDialog.optInId}" class="chronic-cookie-dialog-button" href="#">${ConsentDialog.optInButtonText}</a>
            <a id="${ConsentDialog.optOutId}" class="chronic-cookie-dialog-button" href="#">${ConsentDialog.optOutButtonText}</a>
        </td>
    </tr>
</tbody>
</table>`;
    }
}