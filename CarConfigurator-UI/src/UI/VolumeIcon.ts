/**
 * Base class for an element (i.e. button) that, when clicked, will toggle mute the pixel stream
 * Can be initialized with any HTMLElement, if it is set as rootElement in the constructor.
 */
export class VolumeIconBase {
    isMute = false;
   
    _rootElement: HTMLElement;

    public onToggled: (muted: boolean) => void;

	public get rootElement() {
        return this._rootElement;
    }

    public set rootElement(element) {
        element.onclick = () => this.toggleMute();
        this._rootElement = element;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {

	}

    /**
     * Makes the document or VolumeElement Volume.
     */
    toggleMute() {
		// TODO (william.belcher): Hookup muting functionality
        this.onMuteChange();
    }

    /**
     * Handles the Volume button on change
     */
    onMuteChange() {
        this.isMute = !this.isMute;
        this.onToggled(this.isMute);
    }
}

/**
 * An implementation of VolumeIconBase that uses an externally
 * provided HTMLElement for toggling full screen.
 */
export class VolumeIconExternal extends VolumeIconBase {

    constructor(externalButton : HTMLElement) {
        super();
        this.rootElement = externalButton;
    }

}

/**
 * The default volume icon that contains a button and svgs for each state.
 */
export class VolumeIcon extends VolumeIconBase {
    _muteIcon: SVGElement;
    _unmuteIcon: SVGElement;
    _tooltipText: HTMLElement;

    constructor() {
        super();
        
        const createdButton : HTMLButtonElement = document.createElement('button');
        createdButton.type = 'button';
        createdButton.classList.add('UiTool');
        createdButton.id = 'volume-btn';
        createdButton.appendChild(this.muteIcon);
        createdButton.appendChild(this.unmuteIcon);
        createdButton.appendChild(this.tooltipText);

        this.rootElement = createdButton;

		const unmute = this.unmuteIcon;
        const mute = this.muteIcon;

        if (this.isMute) {
            unmute.style.display = 'inline';
            //ios disappearing svg fix
            unmute.style.transform = 'translate(0, 0)';
            mute.style.display = 'none';
        } else {
            unmute.style.display = 'none';
            mute.style.display = 'inline';
            //ios disappearing svg fix
            mute.style.transform = 'translate(0, 0)';
        }
    }

    public get tooltipText(): HTMLElement {
        if (!this._tooltipText) {
            this._tooltipText = document.createElement('span');
            this._tooltipText.classList.add('tooltiptext');
        }

		this._tooltipText.innerHTML = this.isMute ? 'Undeafen' : 'Deafen';

        return this._tooltipText;
    }

    public get muteIcon(): SVGElement {
        if (!this._muteIcon) {
            this._muteIcon = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'svg'
            );
            this._muteIcon.setAttributeNS(null, 'id', 'muteIcon');
            this._muteIcon.setAttributeNS(null, 'x', '0px');
            this._muteIcon.setAttributeNS(null, 'y', '0px');
            this._muteIcon.setAttributeNS(
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
            this._muteIcon.appendChild(svgGroup);

            // create paths for the icon itself, one for each corner
            const path1 = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );
            path1.setAttributeNS(
                null,
                'd',
				'M243.6,77.9c-2.2-1.5-4.6-2.6-7.2-3.5c-2.6-0.8-5.3-1.2-8.1-1.2c0,0-0.1,0-0.3,0l0,0c-5.7,0-11.4,1.9-16,5.3l-0.8,0.6l-104.1,85.5H27.4c-3.7,0-7.4,0.8-10.7,2.2c-4.9,2.1-9.1,5.5-12.1,9.9c-1.5,2.2-2.7,4.6-3.5,7.2C0.4,186.4,0,189.2,0,192v128c0,3.7,0.8,7.4,2.2,10.7c2.1,4.9,5.5,9.1,9.9,12.1c2.2,1.5,4.6,2.7,7.2,3.5c2.6,0.8,5.3,1.2,8.1,1.2H107l-0.1-0.1l0.1,0.1l0,0h0L211.4,433l0.7,0.6c2.4,1.8,5.1,3.1,7.8,4c2.8,0.9,5.6,1.3,8.4,1.3c4.2,0,8.4-1,12.2-2.8c3.8-1.9,7.3-4.7,9.9-8.3c3.5-4.7,5.3-10.4,5.3-16.2v-311c0-3.7-0.8-7.4-2.2-10.7C251.4,85,247.9,80.8,243.6,77.9z M130.2,319l-0.1-0.1c-6.5-5.3-14.6-8.1-22.9-8.1H107h-0.1H36.6V201.2h70.6l0.2-18.3l-0.1,18.3h0.2c8.4,0,16.5-3,22.9-8.4l0,0l88.8-72.8v272.4L130.2,319z'
            );

            const path2 = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );
            path2.setAttributeNS(
                null,
                'd',
				'M345.6,174.6c-4.6-9-15.6-12.6-24.6-8c-9,4.6-12.6,15.6-8,24.6c5.2,10.2,9.2,20.5,12,31.2s4.3,21.8,4.3,33.7c0,11.6-1.6,22.8-4.4,33.6s-6.9,21.3-12,31.3c-4.5,9-0.9,20,8.1,24.5c9,4.5,19.9,0.9,24.5-8.1c6.1-12.1,11.1-25,14.7-38.6c3.5-13.6,5.6-27.9,5.6-42.8c0-15-1.9-29.3-5.4-42.8C356.9,199.6,351.8,186.8,345.6,174.6z'
            );

            const path3 = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );
            path3.setAttributeNS(
                null,
                'd',
				'M438.9,256c0-14.5-0.9-27.7-2.7-40.2c-2.7-18.7-7.3-35.4-13.5-51.3c-6.2-15.8-14-30.6-22.8-45.8c-5.1-8.7-16.3-11.7-25-6.6c-8.7,5.1-11.7,16.3-6.6,25c5.5,9.5,10.4,18.5,14.6,27.4c6.3,13.4,11.1,26.5,14.4,41.2c3.3,14.6,5.1,30.8,5.1,50.2c0,12.9-0.8,24.4-2.4,35c-2.3,15.9-6.2,29.7-11.5,43.2s-12.1,26.6-20.2,40.7c-5,8.8-2,19.9,6.8,25c8.6,5.1,19.7,2.1,24.8-6.7c5.7-10,11-19.8,15.8-30c7.1-15.2,13-31.1,17-48.7C436.7,296.8,438.9,277.7,438.9,256z'
            );

            const path4 = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );
            path4.setAttributeNS(
                null,
                'd',
				'M508.2,199.2c-3.9-26.4-10.7-50.1-19.9-72.3S467.6,84,454.4,63.2c-5.4-8.5-16.7-11-25.3-5.6c-8.5,5.4-11,16.7-5.6,25.3c8.3,13,15.7,25.7,22.1,38.5c9.6,19.2,17,38.8,22.1,60.5c5.1,21.7,7.8,45.8,7.8,74c0,18.8-1.2,35.8-3.6,51.6c-3.5,23.6-9.4,44.4-17.5,64c-8.1,19.6-18.4,38.2-30.8,57.3c-5.5,8.5-3.1,19.8,5.3,25.3c8.4,5.6,19.8,3.2,25.3-5.3c8.9-13.6,16.9-27.3,24.1-41.5c10.7-21.3,19.2-43.9,25-68.7c5.8-24.9,8.8-52,8.8-82.6C512.1,235.6,510.8,216.8,508.2,199.2z'
            );

            svgGroup.appendChild(path1);
            svgGroup.appendChild(path2);
            svgGroup.appendChild(path3);
            svgGroup.appendChild(path4);
        }
        return this._muteIcon;
    }

    public get unmuteIcon(): SVGElement {
        if (!this._unmuteIcon) {
            this._unmuteIcon = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'svg'
            );
            this._unmuteIcon.setAttributeNS(null, 'id', 'unmuteIcon');
            this._unmuteIcon.setAttributeNS(null, 'x', '0px');
            this._unmuteIcon.setAttributeNS(null, 'y', '0px');
            this._unmuteIcon.setAttributeNS(
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
            this._unmuteIcon.appendChild(svgGroup);

            // create paths for the icon itself, one for each corner
            const path1 = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );
            path1.setAttributeNS(
                null,
                'd',
                'M49.5,41.9c-7.1-7.1-18.7-7.1-25.9,0c-7.2,7.1-7.1,18.7,0,25.9l402.3,402.3c7.1,7.1,18.7,7.1,25.9,0c7.1-7.2,7.1-18.7,0-25.9L49.5,41.9z'
            );

            const path2 = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );
            path2.setAttributeNS(
                null,
                'd',
				'M174.8,115.7l19.5,19.5c1.7,1.7,4.3,1.8,6.1,0.3l19-15.6v38.6c0,1.2,0.5,2.4,1.3,3.2l27.4,27.4c1.8,1.8,4.7,1.8,6.5,0c0.9-0.9,1.3-2,1.3-3.2v-84.7c0.1-10.3-5.5-19.8-14.5-24.8c-9.3-5-20.7-4.2-29.2,2.1c-0.3,0.2-0.5,0.4-0.8,0.6L175.1,109c-2,1.6-2.2,4.5-0.6,6.4C174.6,115.5,174.7,115.6,174.8,115.7z'
            );

            const path3 = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );
            path3.setAttributeNS(
                null,
                'd',
				'M227.2,322.9c-1.8-1.8-4.7-1.8-6.5,0c-0.9,0.9-1.3,2-1.3,3.2v66L130.2,319c-6.6-5.3-14.7-8.2-23.2-8.2H36.6V201.1h58c2.5,0,4.6-2.1,4.6-4.6c0-1.2-0.5-2.4-1.3-3.2l-27.4-27.4c-0.9-0.9-2-1.3-3.2-1.3H27.4C12.3,164.6,0,176.9,0,192v128c0,15.1,12.3,27.4,27.4,27.4h79.7l104.4,85.5c0.2,0.2,0.5,0.4,0.8,0.6c8.6,6.4,20.2,7.1,29.5,1.9c8.8-5,14.2-14.5,14.1-24.6v-57.3c0-1.2-0.5-2.4-1.3-3.2L227.2,322.9z'
            );

            const path4 = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );
            path4.setAttributeNS(
                null,
                'd',
				'M329.2,255.9c0,3-0.1,6.1-0.4,9.3c-0.2,2.7,0.8,5.3,2.7,7.1l22.5,22.5c1.8,1.8,4.7,1.8,6.5,0c0.6-0.6,1.1-1.4,1.2-2.3c2.6-11.9,4-24.2,4-36.5c0-28.1-6.6-54.7-20.3-81.5c-4.8-8.9-15.8-12.3-24.7-7.5c-8.7,4.6-12.1,15.3-7.8,24.1C323.9,212.6,329.2,233.8,329.2,255.9z'
            );

			const path5 = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );
            path5.setAttributeNS(
                null,
                'd',
				'M402.3,256c0,27.2-3.8,49-10.7,69.3c-1.1,3.3-0.3,7,2.2,9.4l19.2,19.2c1.8,1.8,4.7,1.8,6.5,0c0.4-0.4,0.8-0.9,1-1.5c11.6-28,18.4-57.6,18.4-96.4c0-58.5-14.9-95.9-39.1-137.2c-5.2-8.7-16.4-11.5-25.1-6.3c-8.5,5.1-11.4,16.1-6.5,24.7C389.8,174.2,402.3,205.5,402.3,256z'
            );

			const path6 = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );
            path6.setAttributeNS(
                null,
                'd',
				'M454.3,63.3c-5.4-8.5-16.7-11-25.3-5.6c-8.6,5.4-11,16.7-5.6,25.3c31.2,48.9,52,97,52,173c0,54.2-10.2,93.9-27,129.1c-0.8,1.7-0.5,3.8,0.9,5.2l20.4,20.4c1.8,1.8,4.7,1.8,6.5,0c0.3-0.3,0.6-0.7,0.8-1.2c24.6-48.1,35-95.2,35-153.5C512,171.1,488.9,117.6,454.3,63.3z'
            );

            svgGroup.appendChild(path1);
            svgGroup.appendChild(path2);
            svgGroup.appendChild(path3);
            svgGroup.appendChild(path4);
			svgGroup.appendChild(path5);
			svgGroup.appendChild(path6);
        }
        return this._unmuteIcon;
    }

    onMuteChange() {
        super.onMuteChange();

        const unmute = this.unmuteIcon;
        const mute = this.muteIcon;
		this._tooltipText.innerHTML = this.isMute ? 'Undeafen' : 'Deafen';
        if (this.isMute) {
            unmute.style.display = 'inline';
            //ios disappearing svg fix
            unmute.style.transform = 'translate(0, 0)';
            mute.style.display = 'none';
        } else {
            unmute.style.display = 'none';
            mute.style.display = 'inline';
            //ios disappearing svg fix
            mute.style.transform = 'translate(0, 0)';
        }
    }

}
