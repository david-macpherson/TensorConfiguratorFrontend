/**
 * A UI component containing an image and text.
 */
export class OptionPanel {
    _rootElement: HTMLElement;
    _optionsContentElement: HTMLElement;
	
	private optionName: string;
	private optionImagePath: string;

    constructor(optionName: string, optionImagePath: string) {
        this._rootElement = null;
		this.optionName = optionName;
		this.optionImagePath = optionImagePath;
    }

    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    public get rootElement(): HTMLElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
			this._rootElement.classList.add('option');

			const image = document.createElement('img');
			image.src = this.optionImagePath;
			// image.classList.add('option-image');

			const descriptor = document.createElement('div');
			descriptor.innerHTML = this.optionName;
			// descriptor.classList.add('option-descriptor');

			this._rootElement.appendChild(image);
			this._rootElement.appendChild(descriptor);
        }
        return this._rootElement;
    }
}
