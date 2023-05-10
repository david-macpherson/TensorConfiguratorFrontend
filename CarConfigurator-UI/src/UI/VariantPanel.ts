// Copyright Epic Games, Inc. All Rights Reserved.


/**
 * A UI component containing all the logs for the application.
 */
export class VariantPanel {
    _rootElement: HTMLElement;
    _variantCloseButton: HTMLElement;
    _variantContentElement: HTMLElement;

	private variantName: string;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(variantName: string) {
		this.variantName = variantName;
    }

    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    public get rootElement(): HTMLElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'variant-panel';
            this._rootElement.classList.add('panel-wrap');

            const panelElem = document.createElement('div');
            panelElem.classList.add('panel');
            this._rootElement.appendChild(panelElem);

            const variantHeading = document.createElement('div');
            variantHeading.id = 'variantHeading';
            variantHeading.textContent = this.variantName;
            panelElem.appendChild(variantHeading);

            panelElem.appendChild(this.variantCloseButton);
            panelElem.appendChild(this.variantContentElement);
        }
        return this._rootElement;
    }

    public get variantContentElement(): HTMLElement {
        if (!this._variantContentElement) {
            this._variantContentElement = document.createElement('div');
            this._variantContentElement.id = 'variantContent';
        }
        return this._variantContentElement;
    }


    public get variantCloseButton(): HTMLElement {
        if (!this._variantCloseButton) {
            this._variantCloseButton = document.createElement('div');
            this._variantCloseButton.id = 'variantClose';
        }
        return this._variantCloseButton;
    }

    /**
     * Show variant panel.
     */
    public show(): void {
        if (!this.rootElement.classList.contains('panel-wrap-visible')) {
            this.rootElement.classList.add('panel-wrap-visible');
        }
    }

    /**
     * Toggle the visibility of the variant panel.
     */
    public toggleVisibility(): void {
        this.rootElement.classList.toggle('panel-wrap-visible');
    }

    /**
     * Hide the variant panel.
     */
    public hide(): void {
        if (this.rootElement.classList.contains('panel-wrap-visible')) {
            this.rootElement.classList.remove('panel-wrap-visible');
        }
    }
}
