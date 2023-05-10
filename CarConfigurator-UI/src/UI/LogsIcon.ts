// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Stats icon that can be clicked.
 */
export class LogsIcon {
    _rootElement: HTMLButtonElement;
    _logsIcon: SVGElement;
    _tooltipText: HTMLElement;

    /**
     * Get the the button containing the stats icon.
     */
    public get rootElement(): HTMLButtonElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('button');
            this._rootElement.type = 'button';
            this._rootElement.classList.add('UiTool');
            this._rootElement.id = 'statsBtn';
            this._rootElement.appendChild(this.logsIcon);
            this._rootElement.appendChild(this.tooltipText);
        }
        return this._rootElement;
    }

    public get tooltipText(): HTMLElement {
        if (!this._tooltipText) {
            this._tooltipText = document.createElement('span');
            this._tooltipText.classList.add('tooltiptext');
            this._tooltipText.innerHTML = 'Logs';
        }
        return this._tooltipText;
    }

    public get logsIcon(): SVGElement {
        if (!this._logsIcon) {
            this._logsIcon = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'svg'
            );
            this._logsIcon.setAttributeNS(null, 'id', 'statsIcon');
            this._logsIcon.setAttributeNS(null, 'x', '0px');
            this._logsIcon.setAttributeNS(null, 'y', '0px');
            this._logsIcon.setAttributeNS(null, 'viewBox', '0 0 512 512');

            // create svg group for the paths
            const svgGroup = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'g'
            );
            svgGroup.classList.add('svgIcon');
            this._logsIcon.appendChild(svgGroup);

            // create paths for the icon itself, the inner and out path of a cog
            const path1 = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );
            path1.setAttributeNS(
                null,
                'd',
				'M109.71,274.29H128c-0.12-44.51,4.83-92.32,23.02-126.3c9.07-17.06,20.99-30.72,37.47-40.55c16.5-9.78,38.08-15.98,67.52-16.01c29.43,0.03,51.01,6.22,67.52,16.01c12.38,7.38,22.12,16.89,30.11,28.4c11.95,17.22,19.74,39.14,24.33,63.25c4.61,24.08,6.06,50.18,6.05,75.2c0,49.42,14.84,89.04,29.66,116.18c14.84,27.18,29.66,42.13,30.55,43.03l12.93-12.93v-18.29H54.86v18.29l12.93,12.93c0.89-0.9,15.71-15.85,30.55-43.03C113.16,363.32,128,323.71,128,274.29H109.71H91.43c0,42.01-12.58,75.53-25.2,98.67c-6.3,11.55-12.59,20.45-17.2,26.34c-2.31,2.95-4.19,5.15-5.45,6.55l-1.38,1.51l-0.28,0.3l0.96,0.94l-0.95-0.95l-0.01,0.01l0.96,0.94l-0.95-0.95c-5.23,5.23-6.79,13.1-3.96,19.93s9.5,11.29,16.89,11.29h402.29c7.39,0,14.06-4.46,16.89-11.29s1.27-14.7-3.96-19.93l-0.98,0.98l0.99-0.97l-0.01-0.01l-0.98,0.98l0.99-0.97c-0.73-0.73-13.32-13.87-25.5-36.89c-12.21-23.05-24.01-55.78-24.02-96.48c-0.12-46.92-4.31-99.68-27.27-143.41c-11.5-21.79-28.16-41.28-51.11-54.88c-22.93-13.65-51.63-21.17-86.2-21.14c-34.57-0.03-63.27,7.49-86.2,21.14c-17.19,10.2-30.92,23.72-41.49,39.02c-15.89,23-24.92,49.79-30.18,77.2c-5.24,27.44-6.69,55.66-6.7,82.07H109.71z M310.86,420.57h5.25l-5.25-0.09V420.57h5.25l-5.25-0.09c0.09,0.58-0.64,16.47-7.88,29.78c-3.59,6.71-8.46,12.73-15.51,17.25c-7.08,4.48-16.67,7.87-31.46,7.91c-15.27-0.05-24.99-3.65-32.14-8.36c-10.6-7-16.49-18.17-19.63-28.61c-1.55-5.14-2.34-9.9-2.72-13.23c-0.19-1.66-0.28-2.97-0.33-3.79l-0.03-0.85l0-0.02c0-10.1-8.19-18.29-18.29-18.29c-10.1,0-18.29,8.19-18.29,18.29c0.1,1.53-0.12,22.05,11.07,44.75c5.63,11.29,14.47,23.22,27.93,32.18c13.42,9,31.13,14.55,52.43,14.5c21.3,0.05,39.01-5.5,52.43-14.5c20.26-13.57,29.79-33.26,34.37-48.53c4.6-15.43,4.6-27.25,4.63-28.4c0-10.1-8.19-18.29-18.29-18.29C319.04,402.29,310.86,410.47,310.86,420.57L310.86,420.57z M237.71,18.29v54.86c0,10.1,8.19,18.29,18.29,18.29c10.1,0,18.29-8.19,18.29-18.29V18.29C274.29,8.19,266.1,0,256,0C245.9,0,237.71,8.19,237.71,18.29z'
            );

            svgGroup.appendChild(path1);
        }
        return this._logsIcon;
    }
}
