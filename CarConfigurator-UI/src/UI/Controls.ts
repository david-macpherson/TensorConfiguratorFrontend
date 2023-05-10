// Copyright Epic Games, Inc. All Rights Reserved.

import { FullScreenIcon } from './FullscreenIcon';
import { SettingsIcon } from './SettingsIcon';
import { StatsIcon } from './StatsIcon';
import { XRIcon } from './XRIcon';
import { VolumeIcon } from './VolumeIcon';
import { MicrophoneIcon } from './MicrophoneIcon';
import { PlayIcon } from './PlayIcon'
import { LogsIcon } from './LogsIcon';
import { WebXRController } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.2';
import { UIElementConfig, UIElementCreationMode } from '../UI/UIConfigurationTypes'

/**
 * Configures how UI elements to control the stream are created. 
 * By default, a button will be created for each control. That can be overriden per-control
 * to use an externally provided element, or to disable the element entirely.
 */
export type ControlsUIConfiguration = {
    //[Property in keyof Controls as `${Property}Type`]? : UIElementType;
    statsButtonType? : UIElementConfig,
    fullscreenButtonType? : UIElementConfig,
    settingsButtonType? : UIElementConfig,
    xrIconType? : UIElementConfig
	volumeIconType? : UIElementConfig
	microphoneIconType? : UIElementConfig
	logsIconType?: UIElementConfig
	playIconType?: UIElementConfig
}

// If there isn't a type provided, default behaviour is to create the element.
function shouldCreateButton(type : UIElementConfig | undefined) : boolean {
    return (type == undefined) ? true : (type.creationMode === UIElementCreationMode.CreateDefaultElement);
}

/**
 * Element containing various controls like stats, settings, fullscreen.
 */
export class Controls {
    statsIcon: StatsIcon;
    fullscreenIcon: FullScreenIcon;
    settingsIcon: SettingsIcon;
    xrIcon: XRIcon;
	volumeIcon: VolumeIcon;
	microphoneIcon: MicrophoneIcon;
	logsIcon: LogsIcon;
	playIcon: PlayIcon;

    _rootElement: HTMLElement;

    /**
     * Construct the controls
     */
    constructor(config? : ControlsUIConfiguration) {
        if (!config || shouldCreateButton(config.statsButtonType)) {
            this.statsIcon = new StatsIcon();
        }
        if (!config || shouldCreateButton(config.fullscreenButtonType)){
            this.settingsIcon = new SettingsIcon();
        }
        if (!config || shouldCreateButton(config.settingsButtonType)) {
            this.fullscreenIcon = new FullScreenIcon();
        }
        if (!config || shouldCreateButton(config.xrIconType)){
            this.xrIcon = new XRIcon();
        }
		if (!config || shouldCreateButton(config.volumeIconType)){
            this.volumeIcon = new VolumeIcon();
        }
		if (!config || shouldCreateButton(config.microphoneIconType)){
            this.microphoneIcon = new MicrophoneIcon();
        }
		if (!config || shouldCreateButton(config.logsIconType)){
            this.logsIcon = new LogsIcon();
        }
		if (!config || shouldCreateButton(config.playIconType)){
            this.playIcon = new PlayIcon();
        }
    }

    /**
     * Get the element containing the controls.
     */
    public get rootElement(): HTMLElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'controls';
            if (!!this.fullscreenIcon) {
                this._rootElement.appendChild(this.fullscreenIcon.rootElement);
            }
            if (!!this.settingsIcon) {
                this._rootElement.appendChild(this.settingsIcon.rootElement);
            }
            if (!!this.statsIcon) {
                this._rootElement.appendChild(this.statsIcon.rootElement);
            }
            if (!!this.xrIcon) {
                WebXRController.isSessionSupported('immersive-vr').then(
                (supported: boolean) => {
                    if (supported) {
                        this._rootElement.appendChild(this.xrIcon.rootElement);
                    }
                });
            };
			if (!!this.volumeIcon) {
                this._rootElement.appendChild(this.volumeIcon.rootElement);
            }
			if (!!this.microphoneIcon) {
                this._rootElement.appendChild(this.microphoneIcon.rootElement);
            }
			if (!!this.logsIcon) {
                this._rootElement.appendChild(this.logsIcon.rootElement);
            }
			if (!!this.playIcon) {
                this._rootElement.appendChild(this.playIcon.rootElement);
            }
        }
        return this._rootElement;
    }
}