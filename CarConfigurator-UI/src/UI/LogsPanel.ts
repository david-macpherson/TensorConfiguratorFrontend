// Copyright Epic Games, Inc. All Rights Reserved.

declare global {
    interface HTMLElement {
        show(): void;
		hide(): void;
    }
}

export class logsContentElement {
	_rootElement: HTMLElement;
	_errorElement: HTMLElement;
	_warnElement: HTMLElement;
	_debugElement: HTMLElement;
	_infoElement: HTMLElement;
	_logElement: HTMLElement;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {
    }

	public get rootElement(): HTMLElement {
		if(!this._rootElement) {
			this._rootElement = document.createElement('div');
			this._rootElement.id = 'logsContent';

			this._rootElement.appendChild(this.errorElement);
			this._rootElement.appendChild(this.warnElement);
			this._rootElement.appendChild(this.debugElement);
			this._rootElement.appendChild(this.infoElement);
			this._rootElement.appendChild(this.logElement);
		}

		return this._rootElement;
	}

	public get errorElement(): HTMLElement {
		if(!this._errorElement) {
			this._errorElement = document.createElement('div');
			this._errorElement.id = "errorContent"
			this._errorElement.classList.add('invisible');
			this._errorElement.show = () => {
				if (this._errorElement.classList.contains('invisible')) {
					this._errorElement.classList.remove('invisible');
				}
			}
			this._errorElement.hide = () => {
				if (!this._errorElement.classList.contains('invisible')) {
					this._errorElement.classList.add('invisible');
				}
			}
		}

		return this._errorElement;
	}

	public get warnElement(): HTMLElement {
		if(!this._warnElement) {
			this._warnElement = document.createElement('div');
			this._warnElement.id = "warnContent"
			this._warnElement.classList.add('invisible');
			this._warnElement.show = () => {
				if (this._warnElement.classList.contains('invisible')) {
					this._warnElement.classList.remove('invisible');
				}
			}
			this._warnElement.hide = () => {
				if (!this._warnElement.classList.contains('invisible')) {
					this._warnElement.classList.add('invisible');
				}
			}
		}

		return this._warnElement;
	}

	public get debugElement(): HTMLElement {
		if(!this._debugElement) {
			this._debugElement = document.createElement('div');
			this._debugElement.id = "debugContent"
			this._debugElement.classList.add('invisible');
			this._debugElement.show = () => {
				if (this._debugElement.classList.contains('invisible')) {
					this._debugElement.classList.remove('invisible');
				}
			}
			this._debugElement.hide = () => {
				if (!this._debugElement.classList.contains('invisible')) {
					this._debugElement.classList.add('invisible');
				}
			}
		}

		return this._debugElement;
	}

	public get infoElement(): HTMLElement {
		if(!this._infoElement) {
			this._infoElement = document.createElement('div');
			this._infoElement.id = "infoContent"
			this._infoElement.classList.add('invisible');
			this._infoElement.show = () => {
				if (this._infoElement.classList.contains('invisible')) {
					this._infoElement.classList.remove('invisible');
				}
			}
			this._infoElement.hide = () => {
				if (!this._infoElement.classList.contains('invisible')) {
					this._infoElement.classList.add('invisible');
				}
			}
		}

		return this._infoElement;
	}

	public get logElement(): HTMLElement {
		if(!this._logElement) {
			this._logElement = document.createElement('div');
			this._logElement.id = "logContent"
			this._logElement.classList.add('invisible');
			this._logElement.show = () => {
				if (this._logElement.classList.contains('invisible')) {
					this._logElement.classList.remove('invisible');
				}
			}
			this._logElement.hide = () => {
				if (!this._logElement.classList.contains('invisible')) {
					this._logElement.classList.add('invisible');
				}
			}
		}

		return this._logElement;
	}
}

/**
 * A UI component containing all the logs for the application.
 */
export class LogsPanel {
    _rootElement: HTMLElement;
    _logsCloseButton: HTMLElement;
    _logsContentElement: logsContentElement;
    _logsContainer: HTMLElement;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
    }

    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    public get rootElement(): HTMLElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'logs-panel';
            this._rootElement.classList.add('panel-wrap');

            const panelElem = document.createElement('div');
            panelElem.classList.add('panel');
            this._rootElement.appendChild(panelElem);

            const logsHeading = document.createElement('div');
            logsHeading.id = 'logsHeading';
            logsHeading.textContent = 'Session Logs';
            panelElem.appendChild(logsHeading);

            panelElem.appendChild(this.logsCloseButton);
			panelElem.appendChild(this.logsContainer);
        }
        return this._rootElement;
    }

    public get logsContentElement(): logsContentElement {
        if (!this._logsContentElement) {
            this._logsContentElement = new logsContentElement();
        }

        return this._logsContentElement;
    }

    public get logsContainer(): HTMLElement {
        if (!this._logsContainer) {
            this._logsContainer = document.createElement('div');
            this._logsContainer.id = 'logsContainer';
            this._logsContainer.classList.add('d-none');

			const filterBar = document.createElement('div');
			filterBar.id = "filterBar";

			const errorFilter = document.createElement('button');
			const warnFilter = document.createElement('button');
			const debugFilter = document.createElement('button')
			const infoFilter = document.createElement('button')
			const logFilter = document.createElement('button')

			errorFilter.innerHTML = 'ERROR';
			errorFilter.id = 'errorFilter';
			errorFilter.classList.add('logFilter');
			errorFilter.onclick = () => {
				errorFilter.classList.add('active')
				warnFilter.classList.remove('active')
				debugFilter.classList.remove('active')
				infoFilter.classList.remove('active')
				logFilter.classList.remove('active')
				this.logsContentElement.errorElement.show();
				this.logsContentElement.warnElement.hide();
				this.logsContentElement.debugElement.hide();
				this.logsContentElement.infoElement.hide();
				this.logsContentElement.logElement.hide();
			}

			
			warnFilter.innerHTML = 'WARN';
			warnFilter.id = 'warnFilter';
			warnFilter.classList.add('logFilter');
			warnFilter.onclick = () => {
				errorFilter.classList.remove('active')
				warnFilter.classList.add('active')
				debugFilter.classList.remove('active')
				infoFilter.classList.remove('active')
				logFilter.classList.remove('active')
				this.logsContentElement.errorElement.hide();
				this.logsContentElement.warnElement.show();
				this.logsContentElement.debugElement.hide();
				this.logsContentElement.infoElement.hide();
				this.logsContentElement.logElement.hide();
			}

			
			debugFilter.innerHTML = 'DEBUG';
			debugFilter.id = 'debugFilter';
			debugFilter.classList.add('logFilter');
			debugFilter.onclick = () => {
				errorFilter.classList.remove('active')
				warnFilter.classList.remove('active')
				debugFilter.classList.add('active')
				infoFilter.classList.remove('active')
				logFilter.classList.remove('active')
				this.logsContentElement.errorElement.hide();
				this.logsContentElement.warnElement.hide();
				this.logsContentElement.debugElement.show();
				this.logsContentElement.infoElement.hide();
				this.logsContentElement.logElement.hide();
			}

			
			infoFilter.innerHTML = 'INFO';
			infoFilter.id = 'infoFilter';
			infoFilter.classList.add('logFilter');
			infoFilter.onclick = () => {
				errorFilter.classList.remove('active')
				warnFilter.classList.remove('active')
				debugFilter.classList.remove('active')
				infoFilter.classList.add('active')
				logFilter.classList.remove('active')
				infoFilter.classList.add('active')
				this.logsContentElement.errorElement.hide();
				this.logsContentElement.warnElement.hide();
				this.logsContentElement.debugElement.hide();
				this.logsContentElement.infoElement.show();
				this.logsContentElement.logElement.hide();
			}

			
			logFilter.innerHTML = 'LOG';
			logFilter.id = 'logFilter';
			logFilter.classList.add('logFilter');
			logFilter.onclick = () => {
				errorFilter.classList.remove('active')
				warnFilter.classList.remove('active')
				debugFilter.classList.remove('active')
				infoFilter.classList.remove('active')
				logFilter.classList.add('active')
				this.logsContentElement.errorElement.hide();
				this.logsContentElement.warnElement.hide();
				this.logsContentElement.debugElement.hide();
				this.logsContentElement.infoElement.hide();
				this.logsContentElement.logElement.show();
			}

			filterBar.appendChild(errorFilter);
			filterBar.appendChild(warnFilter);
			filterBar.appendChild(debugFilter);
			filterBar.appendChild(infoFilter);
			filterBar.appendChild(logFilter);

			this._logsContainer.appendChild(filterBar)
			this._logsContainer.appendChild(this.logsContentElement.rootElement)
        }
        return this._logsContainer;
    }

    public get logsCloseButton(): HTMLElement {
        if (!this._logsCloseButton) {
            this._logsCloseButton = document.createElement('div');
            this._logsCloseButton.id = 'logsClose';
        }
        return this._logsCloseButton;
    }

    /**
     * Show logs panel.
     */
    public show(): void {
        if (!this.rootElement.classList.contains('panel-wrap-visible')) {
            this.rootElement.classList.add('panel-wrap-visible');
        }
    }

    /**
     * Toggle the visibility of the logs panel.
     */
    public toggleVisibility(): void {
        this.rootElement.classList.toggle('panel-wrap-visible');
    }

    /**
     * Hide the logs panel.
     */
    public hide(): void {
        if (this.rootElement.classList.contains('panel-wrap-visible')) {
            this.rootElement.classList.remove('panel-wrap-visible');
        }
    }
}
