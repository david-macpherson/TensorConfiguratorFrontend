/**
 * This will generate a warning using the by using the replacing the connections element supplied from the pixel streaming Infrastructure
 * and replacing it with a warning element that contains the connection status and a warning message
 */
export class WebRtcTcpRelayDetectIndicator {

    _warningElement: HTMLElement
    _webRtcTcpRelayDetectIndicatorElement: HTMLElement;
    _warningTextElement: HTMLElement;
    _closeButton: HTMLElement;

    constructor() {
    }


    /**
     * Get the generated warning element container that will hold the connection and warning indicator element
     */
    public get WarningElement(): HTMLElement {
        if (!this._warningElement) {
            this._warningElement = document.createElement('div');
            this._warningElement.id = "warning"
            this.WarningElement.appendChild(this.WebRtcTcpRelayDetectIndicatorElement)
        }
        return this._warningElement
    }

    /**
     * Get the generated warning indicator element
     */
    public get WebRtcTcpRelayDetectIndicatorElement(): HTMLElement {
        if (!this._webRtcTcpRelayDetectIndicatorElement) {
            this._webRtcTcpRelayDetectIndicatorElement = document.createElement('div');
            this._webRtcTcpRelayDetectIndicatorElement.id = 'webRtcTcpRelayDetectIndicator';
            this._webRtcTcpRelayDetectIndicatorElement.appendChild(this.closeButtonElement)
            this._webRtcTcpRelayDetectIndicatorElement.appendChild(this.warningTextElement)
        }

        return this._webRtcTcpRelayDetectIndicatorElement;
    }

    /**
     * Get the generated close button element
     */
    public get closeButtonElement(): HTMLElement {
        if (!this._closeButton) {
            this._closeButton = document.createElement('div')
            this._closeButton.id = "warningCloseButton"
            this._closeButton.onclick = () => this.RemoveWarning();
        }
        return this._closeButton
    }

    /**
     * Get the generated warning text element 
     */
    public get warningTextElement(): HTMLElement {
        if (!this._warningTextElement) {
            this._warningTextElement = document.createElement('div');
            this._warningTextElement.id = 'warningTCPStream';
            this._warningTextElement.innerHTML = `<p>Your network is blocking UDP.</br >Expect degraded streaming.</p>`
        }
        return this._warningTextElement;
    }


    /**
    * This will hijack the connection status div to show a warning next to the connection status
    */
    public ShowWarning() {
        
        let connectionElement = document.getElementById("connection")

        let uiFeaturesElement = document.getElementById("uiFeatures")

        // Override the connection element position to unset the position and set the float to left
        connectionElement.style.cssText = "position: unset !important";
        connectionElement.style.float = "left";

        // Temporally remove the connection element from the uiFeatures element
        uiFeaturesElement.removeChild(connectionElement)

        // Add the removed connection element into the warning element div
        this.WarningElement.appendChild(connectionElement)

        // Add the web rtc tcp detect indicator element to the warning
        this.WarningElement.appendChild(this.WebRtcTcpRelayDetectIndicatorElement)

        // Add the newly constructed warning element into the ui features element
        uiFeaturesElement.appendChild(this.WarningElement)
    }


    /**
    * This will reset the connection container back to it's default structure
    */
    public RemoveWarning() {

        // Store a reference to the uiFeatures element from the Pixel streaming Infrastructure
        let uiFeaturesElement = document.getElementById("uiFeatures")

        // Get the warning element
        let warningElement = document.getElementById("warning")

        // Check if the warning element exists before removing it
        if (warningElement != null) {
            let connectionElement = document.getElementById("connection")


            // Remove the warning element element from the uiFeatures element
            uiFeaturesElement.removeChild(this.WarningElement)

            // Clear the connection element position back to what has been specified in the CSS
            connectionElement.style.position = null;
            connectionElement.style.float = null;

            // Add the connection element back to the uiFeatures element
            uiFeaturesElement.appendChild(connectionElement)

        }


    }
}


