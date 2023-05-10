// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Settings icon that can be clicked.
 */
export class SettingsIcon {
    _rootElement: HTMLButtonElement;
    _settingsIcon: SVGElement;
    _tooltipText: HTMLElement;

    /**
     * Get the the button containing the settings icon.
     */
    public get rootElement(): HTMLButtonElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('button');
            this._rootElement.type = 'button';
            this._rootElement.classList.add('UiTool');
            this._rootElement.id = 'settingsBtn';
            this._rootElement.appendChild(this.settingsIcon);
            this._rootElement.appendChild(this.tooltipText);
        }
        return this._rootElement;
    }

    public get tooltipText(): HTMLElement {
        if (!this._tooltipText) {
            this._tooltipText = document.createElement('span');
            this._tooltipText.classList.add('tooltiptext');
            this._tooltipText.innerHTML = 'Options';
        }
        return this._tooltipText;
    }

    public get settingsIcon(): SVGElement {
        if (!this._settingsIcon) {
            this._settingsIcon = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'svg'
            );
            this._settingsIcon.setAttributeNS(null, 'id', 'settingsIcon');
            this._settingsIcon.setAttributeNS(null, 'x', '0px');
            this._settingsIcon.setAttributeNS(null, 'y', '0px');
            this._settingsIcon.setAttributeNS(
                null,
                'viewBox',
                '0 0 512 512'
            );

            // create svg group for the paths
            const svgGroup = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'g'
            );
            svgGroup.classList.add('svgIcon');
            this._settingsIcon.appendChild(svgGroup);

            // create paths for the icon itself, the inner and out path of a cog
            const path1 = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );
            path1.setAttributeNS(
                null,
                'd',
                'M362.7,0C338.8,0,320,17.1,320,37.5v102.4c0,20.5,18.8,37.5,42.7,37.5c23.9,0,42.7-17.1,42.7-37.5V37.5C405.3,17.1,386.6,0,362.7,0z M0,70.8v35.8h298.7V70.8H0z M426.7,70.8v35.8H512V70.8H426.7z M149.3,170.7c-23.9,0-42.7,17.1-42.7,37.5v102.4c0,20.5,18.8,37.5,42.7,37.5s42.7-17.1,42.7-37.5V208.2C192,187.7,173.2,170.7,149.3,170.7zM0,241.5v35.8h85.3v-35.8H0z M213.3,241.5v35.8H512v-35.8H213.3z M362.7,334.5c-23.9,0-42.7,17.1-42.7,37.5v102.4c0,20.5,18.8,37.5,42.7,37.5c23.9,0,42.7-17.1,42.7-37.5V372.1C405.3,350.7,386.6,334.5,362.7,334.5z M0,405.3v35.8h298.7v-35.8H0zM426.7,405.3v35.8H512v-35.8H426.7z'
            );

            svgGroup.appendChild(path1);
        }
        return this._settingsIcon;
    }
}
