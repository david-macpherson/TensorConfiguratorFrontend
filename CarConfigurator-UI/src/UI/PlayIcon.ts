/**
 * The default play icon that contains a button and svgs for each state.
 */
export class PlayIcon {
	isFrozen = false;
    _playIcon: SVGElement;
    _pauseIcon: SVGElement;
    _tooltipText: HTMLElement;
	_rootElement: HTMLElement;

    constructor() {        
        const createdButton : HTMLButtonElement = document.createElement('button');
        createdButton.type = 'button';
        createdButton.classList.add('UiTool');
        createdButton.id = 'volume-btn';
        createdButton.appendChild(this.playIcon);
        createdButton.appendChild(this.pauseIcon);
        createdButton.appendChild(this.tooltipText);
        this.rootElement = createdButton;

		const pause = this.pauseIcon;
        const play = this.playIcon;

        if (this.isFrozen) {
            pause.style.display = 'inline';
            //ios disappearing svg fix
            pause.style.transform = 'translate(0, 0)';
            play.style.display = 'none';
        } else {
            pause.style.display = 'none';
            play.style.display = 'inline';
            //ios disappearing svg fix
            play.style.transform = 'translate(0, 0)';
        }
    }

	public get rootElement() {
        return this._rootElement;
    }

	public set rootElement(rootElement: HTMLElement) {
        this._rootElement = rootElement;
    }

    public get tooltipText(): HTMLElement {
        if (!this._tooltipText) {
            this._tooltipText = document.createElement('span');
            this._tooltipText.classList.add('tooltiptext');
            this._tooltipText.innerHTML = 'Volume';
        }

		this._tooltipText.innerHTML = this.isFrozen ? 'Unfreeze' : 'Freeze';

        return this._tooltipText;
    }

    public get playIcon(): SVGElement {
        if (!this._playIcon) {
            this._playIcon = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'svg'
            );
            this._playIcon.setAttributeNS(null, 'id', 'muteIcon');
            this._playIcon.setAttributeNS(null, 'x', '0px');
            this._playIcon.setAttributeNS(null, 'y', '0px');
            this._playIcon.setAttributeNS(
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
            this._playIcon.appendChild(svgGroup);

            // create paths for the icon itself, one for each corner
            const path1 = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );
            path1.setAttributeNS(
                null,
                'd',
				'M384,0c43.9,0,65.8,15.6,65.8,46.8v416.9c0,32.2-21.9,48.3-65.8,48.3s-65.8-16.1-65.8-48.3V46.8C318.2,15.6,340.1,0,384,0M128,0c43.9,0,65.8,15.6,65.8,46.8v416.9c0,32.2-21.9,48.3-65.8,48.3s-65.8-16.1-65.8-48.3V46.8C62.2,15.6,84.1,0,128,0'
            );

            svgGroup.appendChild(path1);
        }
        return this._playIcon;
    }

    public get pauseIcon(): SVGElement {
        if (!this._pauseIcon) {
            this._pauseIcon = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'svg'
            );
            this._pauseIcon.setAttributeNS(null, 'id', 'unmuteIcon');
            this._pauseIcon.setAttributeNS(null, 'x', '0px');
            this._pauseIcon.setAttributeNS(null, 'y', '0px');
            this._pauseIcon.setAttributeNS(
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
            this._pauseIcon.appendChild(svgGroup);

            // create paths for the icon itself
            const path1 = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );
			path1.setAttributeNS(
                null,
                'd',
				'M460.5,295.6l-361.9,210c-30.7,17.8-70.1-3.8-70.1-39.7V46c0-35.8,39.4-57.4,70.1-39.6l361.9,210c21.8,12.5,29.5,40.4,17,62.2C473.5,285.7,467.6,291.6,460.5,295.6z'
            );

            svgGroup.appendChild(path1);
        }
        return this._pauseIcon;
    }

    onFreezeChange() {
		this.isFrozen = !this.isFrozen
		this._tooltipText.innerHTML = this.isFrozen ? 'Unfreeze' : 'Freeze';

        if (this.isFrozen) {
            this.pauseIcon.style.display = 'inline';
            //ios disappearing svg fix
            this.pauseIcon.style.transform = 'translate(0, 0)';
            this.playIcon.style.display = 'none';
        } else {
            this.pauseIcon.style.display = 'none';
            this.playIcon.style.display = 'inline';
            //ios disappearing svg fix
            this.playIcon.style.transform = 'translate(0, 0)';
        }
    }

}
