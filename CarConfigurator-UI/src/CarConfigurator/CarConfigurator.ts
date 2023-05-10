// Copyright Epic Games, Inc. All Rights Reserved.

import {
    PixelStreaming,
    Flags,
    Logger,
    AggregatedStats,
    LatencyTestResults,
    InitialSettings,
    MessageStreamerList
} from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.2';
import { OverlayBase } from '../Overlay/BaseOverlay';
import { ActionOverlay } from '../Overlay/ActionOverlay';
import { TextOverlay } from '../Overlay/TextOverlay';
import { ConnectOverlay } from '../Overlay/ConnectOverlay';
import { DisconnectOverlay } from '../Overlay/DisconnectOverlay';
import { PlayOverlay } from '../Overlay/PlayOverlay';
import { InfoOverlay } from '../Overlay/InfoOverlay';
import { ErrorOverlay } from '../Overlay/ErrorOverlay';
import { AFKOverlay } from '../Overlay/AFKOverlay';
import { Controls, ControlsUIConfiguration } from '../UI/Controls';
import { LabelledButton } from '../UI/LabelledButton';
import { SettingsPanel } from '../UI/SettingsPanel';
import { StatsPanel } from '../UI/StatsPanel';
import { LogsPanel } from '../UI/LogsPanel';
import { VideoQpIndicator } from '../UI/VideoQpIndicator';
import { ConfigUI, LightMode } from '../Config/ConfigUI';
import { 
    UIElementCreationMode, 
    PanelConfiguration, 
    isPanelEnabled,
    UIElementConfig
} from '../UI/UIConfigurationTypes'
import { FullScreenIconBase, FullScreenIconExternal } from '../UI/FullscreenIcon';
import { Variant } from '../Variants/Variant'
import { VariantPanel } from '../UI/VariantPanel'
import { OptionPanel } from '../UI/OptionPanel';
import { LoggingUtils } from '../Util/LoggingUtils'
/** 
 * Configuration of the internal video QP indicator element.
 * By default, one will be made, but if needed this can be disabled.
 * 
 * Note: For custom UI elements to react to the QP being changed, use a PixelStreaming 
 * object's addEventListener('videoEncoderAvgQP', ...) or removeEventListener(...).
 */
export type VideoQPIndicatorConfig = {
    disableIndicator?: boolean
}

/**
 * UI Options can be provided when creating an Application, to configure it's internal
 * and external behaviour, enable/disable features, and connect to external UI.
 */
export interface UIOptions {
    stream: PixelStreaming;
    onColorModeChanged?: (isLightMode: boolean) => void;
    /** By default, a settings panel and associate visibility toggle button will be made.
      * If needed, this behaviour can be configured. */
    settingsPanelConfig?: PanelConfiguration;
    /** By default, a stats panel and associate visibility toggle button will be made.
      * If needed, this behaviour can be configured. */
    statsPanelConfig?: PanelConfiguration;
	/** By default, a log panel and associate visibility toggle button will be made.
      * If needed, this behaviour can be configured. */
    logsPanelConfig?: PanelConfiguration;
    /** If needed, the full screen button can be external or disabled. */
    fullScreenControlsConfig? : UIElementConfig,
    /** If needed, XR button can be external or disabled. */
    xrControlsConfig? : UIElementConfig,
    /** Configuration of the video QP indicator. */
    videoQpIndicatorConfig? : VideoQPIndicatorConfig
}

/**
 * An Application is a combination of UI elements to display and manage a WebRTC Pixel Streaming
 * connection. It includes features for controlling a stream with mouse and keyboard, 
 * managing connection endpoints, as well as displaying stats and other information about it.
 */
export class CarConfigurator {
    stream: PixelStreaming;

    _rootElement: HTMLElement;
    _uiFeatureElement: HTMLElement;

    // set the overlay placeholders
    currentOverlay: OverlayBase | null;
    disconnectOverlay: ActionOverlay;
    connectOverlay: ActionOverlay;
    playOverlay: ActionOverlay;
    infoOverlay: TextOverlay;
    errorOverlay: TextOverlay;
    afkOverlay: AFKOverlay;

    controls: Controls;

    settingsPanel: SettingsPanel;
    statsPanel: StatsPanel;
	logsPanel: LogsPanel;
	paintPanel: VariantPanel;
	wheelPanel: VariantPanel;
	trimPanel: VariantPanel;
	leatherPanel: VariantPanel;
	seatPanel: VariantPanel;
    videoQpIndicator: VideoQpIndicator;

	optionsBar: HTMLElement;
	paintButton: OptionPanel;
	wheelButton: OptionPanel;
	trimButton: OptionPanel;
	leatherButton: OptionPanel;
	seatButton: OptionPanel;

    configUI: ConfigUI;

    onColorModeChanged: UIOptions["onColorModeChanged"];

    protected _options : UIOptions;

    /**
     * @param options - Initialization options
     */
    constructor(options: UIOptions) {
        this._options = options;
        
        this.stream = options.stream;
        this.onColorModeChanged = options.onColorModeChanged;
        this.configUI = new ConfigUI(this.stream.config);

        this.createOverlays();

        if (isPanelEnabled(options.statsPanelConfig)) {
            // Add stats panel
            this.statsPanel = new StatsPanel();
            this.uiFeaturesElement.appendChild(this.statsPanel.rootElement);
        }
        
        if (isPanelEnabled(options.settingsPanelConfig)) {
            // Add settings panel
            this.settingsPanel = new SettingsPanel();
            this.uiFeaturesElement.appendChild(this.settingsPanel.rootElement);
            this.configureSettings();
        }

		if (isPanelEnabled(options.logsPanelConfig)) {
            // Add logs panel
            this.logsPanel = new LogsPanel();
            this.uiFeaturesElement.appendChild(this.logsPanel.rootElement);
			LoggingUtils.setupLoggingOverrides(this.logsPanel.logsContentElement);
        }

		this.paintPanel = new VariantPanel('Paint');
		this.uiFeaturesElement.appendChild(this.paintPanel.rootElement);
		this.wheelPanel = new VariantPanel('Wheels');
		this.uiFeaturesElement.appendChild(this.wheelPanel.rootElement);
		this.trimPanel = new VariantPanel('Trim');
		this.uiFeaturesElement.appendChild(this.trimPanel.rootElement);
		this.leatherPanel = new VariantPanel('Leather');
		this.uiFeaturesElement.appendChild(this.leatherPanel.rootElement);
		this.seatPanel = new VariantPanel('Seats');
		this.uiFeaturesElement.appendChild(this.seatPanel.rootElement);
        
        if (!options.videoQpIndicatorConfig || !options.videoQpIndicatorConfig.disableIndicator) {
            // Add the video stream QP indicator
            this.videoQpIndicator = new VideoQpIndicator();
            this.uiFeaturesElement.appendChild(this.videoQpIndicator.rootElement);
        }

		this.optionsBar = document.createElement('div');
		this.optionsBar.id = 'optionsBar'
		this.uiFeaturesElement.appendChild(this.optionsBar);

		this.paintButton = new OptionPanel('Paint', './images/T_Icon_Paint.PNG');
		this.optionsBar.appendChild(this.paintButton.rootElement);

		this.wheelButton = new OptionPanel('Wheels', './images/T_Icon_Rim.PNG');
		this.optionsBar.appendChild(this.wheelButton.rootElement);

		this.trimButton = new OptionPanel('Trim', './images/T_Icon_Trim.PNG');
		this.optionsBar.appendChild(this.trimButton.rootElement);

		this.leatherButton = new OptionPanel('Leather', './images/T_Icon_Leather.PNG');
		this.optionsBar.appendChild(this.leatherButton.rootElement);

		this.seatButton = new OptionPanel('Seats', './images/T_Icon_Seats.PNG');
		this.optionsBar.appendChild(this.seatButton.rootElement);


        this.createButtons();

        this.registerCallbacks();

        this.showConnectOrAutoConnectOverlays();

        this.setColorMode(this.configUI.isCustomFlagEnabled(LightMode));

		const paintVariants = new Map<string, string>();
		paintVariants.set('Red', './images/paint0.png');
		paintVariants.set('Black', './images/paint1.png');
		paintVariants.set('White', './images/paint2.png');
		paintVariants.set('Grey', './images/paint3.png');
		paintVariants.set('Blue', './images/paint4.png');

		const paint = new Variant(paintVariants);
		paint.populateVariants(this.paintPanel.variantContentElement, (index: number) => {
			let payload = { Cmd: "variant" };
			const body = { SetIndex: '0', Index: index.toString() }
			payload = { ...payload, ...body };
			this.stream.emitUIInteraction(payload);
		});

		const wheelVariants = new Map<string, string>();
		wheelVariants.set('20" Pylon Arm', './images/wheel0.png');
		wheelVariants.set('20" Parallel Spoke', './images/wheel1.png');
		wheelVariants.set('19" V-Spoke', './images/wheel2.png');

		const wheel = new Variant(wheelVariants);
		wheel.populateVariants(this.wheelPanel.variantContentElement, (index: number) => {
			let payload = { Cmd: "variant" };
			const body = { SetIndex: '1', Index: index.toString() }
			payload = { ...payload, ...body };
			this.stream.emitUIInteraction(payload);
		});

		const trimVariants = new Map<string, string>();
		trimVariants.set('Brown Walnut Wood', './images/trim0.png');
		trimVariants.set('Grey Oak Natural', './images/trim1.png');
		trimVariants.set('Carbon Fibre', './images/trim2.png');

		const trim = new Variant(trimVariants);
		trim.populateVariants(this.trimPanel.variantContentElement, (index: number) => {
			let payload = { Cmd: "variant" };
			const body = { SetIndex: '2', Index: index.toString() }
			payload = { ...payload, ...body };
			this.stream.emitUIInteraction(payload);
		});

		const leatherVariants = new Map<string, string>();
		leatherVariants.set('Atlas Beige', './images/leather0.png');
		leatherVariants.set('Rock Gray', './images/leather1.png');
		leatherVariants.set('Okapi Brown', './images/leather2.png');
		leatherVariants.set('Black', './images/leather3.png');

		const leather = new Variant(leatherVariants);
		leather.populateVariants(this.leatherPanel.variantContentElement, (index: number) => {
			let payload = { Cmd: "variant" };
			const body = { SetIndex: '3', Index: index.toString() }
			payload = { ...payload, ...body };
			this.stream.emitUIInteraction(payload);
		});

		const seatVariants = new Map<string, string>();
		seatVariants.set('Ventilated', './images/seat0.png');
		seatVariants.set('Sport', './images/seat1.png');

		const seats = new Variant(seatVariants);
		seats.populateVariants(this.seatPanel.variantContentElement, (index: number) => {
			let payload = { Cmd: "variant" };
			const body = { SetIndex: '4', Index: index.toString() }
			payload = { ...payload, ...body };
			this.stream.emitUIInteraction(payload);
		});
    }

    public createOverlays(): void {
        // build all of the overlays
        this.disconnectOverlay = new DisconnectOverlay(
            this.stream.videoElementParent
        );
        this.connectOverlay = new ConnectOverlay(
            this.stream.videoElementParent
        );
        this.playOverlay = new PlayOverlay(
            this.stream.videoElementParent
        );
        this.infoOverlay = new InfoOverlay(
            this.stream.videoElementParent
        );
        this.errorOverlay = new ErrorOverlay(
            this.stream.videoElementParent
        );
        this.afkOverlay = new AFKOverlay(
            this.stream.videoElementParent
        );

        this.disconnectOverlay.onAction(() => this.stream.reconnect());

        // Build the webRtc connect overlay Event Listener and show the connect overlay
        this.connectOverlay.onAction(() => this.stream.connect());

        // set up the play overlays action
        this.playOverlay.onAction(() => this.stream.play());
    }

    /**
     * Set up button click functions and button functionality
     */
    public createButtons() {
        const controlsUIConfig : ControlsUIConfiguration = {
            statsButtonType : !!this._options.statsPanelConfig
                ? this._options.statsPanelConfig.visibilityButtonConfig
                : undefined,
            settingsButtonType: !!this._options.settingsPanelConfig
                ? this._options.settingsPanelConfig.visibilityButtonConfig
                : undefined,
            fullscreenButtonType: this._options.fullScreenControlsConfig,
            xrIconType: this._options.xrControlsConfig
        }
        // Setup controls
        const controls = new Controls(controlsUIConfig);
        this.uiFeaturesElement.appendChild(controls.rootElement);

        // When we fullscreen we want this element to be the root
        const fullScreenButton : FullScreenIconBase | undefined = 
            // Depending on if we're creating an internal button, or using an external one
            (!!this._options.fullScreenControlsConfig 
                && this._options.fullScreenControlsConfig.creationMode === UIElementCreationMode.UseCustomElement)
            // Either create a fullscreen class based on the external button
            ? new FullScreenIconExternal(this._options.fullScreenControlsConfig.customElement)
            // Or use the one created by the Controls initializer earlier
            : controls.fullscreenIcon;
        if (fullScreenButton) fullScreenButton.fullscreenElement = this.rootElement;

        // Add settings button to controls
        const settingsButton : HTMLElement | undefined = 
            !!controls.settingsIcon ? controls.settingsIcon.rootElement : 
            this._options.settingsPanelConfig.visibilityButtonConfig.customElement;
        if (!!settingsButton) settingsButton.onclick = () =>
            this.settingsClicked();
        if (!!this.settingsPanel) this.settingsPanel.settingsCloseButton.onclick = () =>
            this.settingsClicked();

		// Add logs button to controls
        const logsButton : HTMLElement | undefined = 
            !!controls.logsIcon ? controls.logsIcon.rootElement : 
            this._options.logsPanelConfig.visibilityButtonConfig.customElement;
        if (!!logsButton) logsButton.onclick = () =>
            this.logsClicked();
		if (!!this.logsPanel) this.logsPanel.logsCloseButton.onclick = () =>
            this.logsClicked();

		// Add paint button to controls
		const paintButton : HTMLElement | undefined = this.paintButton.rootElement;
        if (!!paintButton) paintButton.onclick = () => {
			let payload = { Cmd: "set" };
			const body = { SetIndex: '0' }
			payload = { ...payload, ...body };
			this.stream.emitUIInteraction(payload);

			this.paintClicked();
		}
		if (!!this.paintPanel) this.paintPanel.variantCloseButton.onclick = () =>
            this.paintClicked();

		// Add wheel button to controls
		const wheelButton : HTMLElement | undefined = this.wheelButton.rootElement;
        if (!!wheelButton) wheelButton.onclick = () => {
			let payload = { Cmd: "set" };
			const body = { SetIndex: '1' }
			payload = { ...payload, ...body };
			this.stream.emitUIInteraction(payload);

			this.wheelClicked();
		}
		if (!!this.wheelPanel) this.wheelPanel.variantCloseButton.onclick = () =>
            this.wheelClicked();

		// Add trim button to controls
		const trimButton : HTMLElement | undefined = this.trimButton.rootElement;
        if (!!trimButton) trimButton.onclick = () => {
			let payload = { Cmd: "set" };
			const body = { SetIndex: '2' }
			payload = { ...payload, ...body };
			this.stream.emitUIInteraction(payload);

			this.trimClicked();
		}
		if (!!this.trimPanel) this.trimPanel.variantCloseButton.onclick = () =>
            this.trimClicked();

		// Add leather button to controls
		const leatherButton : HTMLElement | undefined = this.leatherButton.rootElement;
        if (!!leatherButton) leatherButton.onclick = () => {
			let payload = { Cmd: "set" };
			const body = { SetIndex: '3' }
			payload = { ...payload, ...body };
			this.stream.emitUIInteraction(payload);

			this.leatherClicked();
		}
		if (!!this.leatherPanel) this.leatherPanel.variantCloseButton.onclick = () =>
            this.leatherClicked();

		// Add seat button to controls
		const seatButton : HTMLElement | undefined = this.seatButton.rootElement;
        if (!!seatButton) seatButton.onclick = () => {
			let payload = { Cmd: "set" };
			const body = { SetIndex: '3' }
			payload = { ...payload, ...body };
			this.stream.emitUIInteraction(payload);

			this.seatClicked();
		}
		if (!!this.seatPanel) this.seatPanel.variantCloseButton.onclick = () =>
            this.seatClicked();

        // Add WebXR button to controls
        const xrButton : HTMLElement | undefined = 
            !!controls.xrIcon ? controls.xrIcon.rootElement : 
            this._options.xrControlsConfig.creationMode === UIElementCreationMode.UseCustomElement ?
            this._options.xrControlsConfig.customElement : undefined;
        if (!!xrButton) xrButton.onclick = () =>
            this.stream.toggleXR();

		// Add freeze button to controls
        const playButton : HTMLElement | undefined = 
            !!controls.playIcon ? controls.playIcon.rootElement : undefined;
        if (!!playButton) playButton.onclick = () => {
			const payload = { Cmd: "toggleFreeze" };
			this.stream.emitUIInteraction(payload);
			controls.playIcon.onFreezeChange();
		}

        // setup the stats/info button
        const statsButton : HTMLElement | undefined = 
            !!controls.statsIcon ? controls.statsIcon.rootElement : 
            this._options.statsPanelConfig.visibilityButtonConfig.customElement;
        if (!!statsButton) statsButton.onclick = () => this.statsClicked()

        if (!!this.statsPanel) {
            this.statsPanel.statsCloseButton.onclick = () => this.statsClicked();
        }

        // Add command buttons (if we have somewhere to add them to)
        if (!!this.settingsPanel) {
            // Add button for toggle fps
            const showFPSButton = new LabelledButton('Show FPS', 'Toggle');
            showFPSButton.addOnClickListener(() => {
                this.stream.requestShowFps();
            });

            // Add button for restart stream
            const restartStreamButton = new LabelledButton(
                'Restart Stream',
                'Restart'
            );
            restartStreamButton.addOnClickListener(() => {
                this.stream.reconnect();
            });

            // Add button for request keyframe
            const requestKeyframeButton = new LabelledButton(
                'Request keyframe',
                'Request'
            );
            requestKeyframeButton.addOnClickListener(() => {
                this.stream.requestIframe();
            });

            const commandsSectionElem = this.configUI.buildSectionWithHeading(
                this.settingsPanel.settingsContentElement,
                'Commands'
            );
            commandsSectionElem.appendChild(showFPSButton.rootElement);
            commandsSectionElem.appendChild(requestKeyframeButton.rootElement);
            commandsSectionElem.appendChild(restartStreamButton.rootElement);
        }
    }

    /**
     * Configure the settings with on change listeners and any additional per experience settings.
     */
    configureSettings(): void {
        // This builds all the settings sections and flags under this `settingsContent` element.
        this.configUI.populateSettingsElement(
            this.settingsPanel.settingsContentElement
        );

        this.configUI.addCustomFlagOnSettingChangedListener(
            LightMode,
            (isLightMode: boolean) => {
                this.configUI.setCustomFlagLabel(
                    LightMode,
                    `Color Scheme: ${isLightMode ? 'Light' : 'Dark'} Mode`
                );
                this.setColorMode(isLightMode);
            }
        );
    }

    registerCallbacks() {
        this.stream.addEventListener(
            'afkWarningActivate',
            ({ data: { countDown, dismissAfk } }) =>
                this.showAfkOverlay(countDown, dismissAfk)
        );
        this.stream.addEventListener(
            'afkWarningUpdate',
            ({ data: { countDown } }) =>
                this.afkOverlay.updateCountdown(countDown)
        );
        this.stream.addEventListener(
            'afkWarningDeactivate',
            () => this.afkOverlay.hide()
        );
        this.stream.addEventListener('afkTimedOut', () =>
            this.afkOverlay.hide()
        );
        this.stream.addEventListener(
            'videoEncoderAvgQP',
            ({ data: { avgQP } }) => this.onVideoEncoderAvgQP(avgQP)
        );
        this.stream.addEventListener('webRtcSdp', () =>
            this.onWebRtcSdp()
        );
        this.stream.addEventListener('webRtcAutoConnect', () =>
            this.onWebRtcAutoConnect()
        );
        this.stream.addEventListener('webRtcConnecting', () =>
            this.onWebRtcConnecting()
        );
        this.stream.addEventListener('webRtcConnected', () =>
            this.onWebRtcConnected()
        );
        this.stream.addEventListener('webRtcFailed', () =>
            this.onWebRtcFailed()
        );
        this.stream.addEventListener(
            'webRtcDisconnected',
            ({ data: { eventString, showActionOrErrorOnDisconnect } }) =>
                this.onDisconnect(eventString, showActionOrErrorOnDisconnect)
        );
        this.stream.addEventListener('videoInitialized', () =>
            this.onVideoInitialized()
        );
        this.stream.addEventListener('streamLoading', () =>
            this.onStreamLoading()
        );
        this.stream.addEventListener(
            'playStreamError',
            ({ data: { message } }) => this.onPlayStreamError(message)
        );
        this.stream.addEventListener('playStream', () =>
            this.onPlayStream()
        );
        this.stream.addEventListener(
            'playStreamRejected',
            ({ data: { reason } }) => this.onPlayStreamRejected(reason)
        );
        this.stream.addEventListener(
            'loadFreezeFrame',
            ({ data: { shouldShowPlayOverlay } }) =>
                this.onLoadFreezeFrame(shouldShowPlayOverlay)
        );
        this.stream.addEventListener(
            'statsReceived',
            ({ data: { aggregatedStats } }) =>
                this.onStatsReceived(aggregatedStats)
        );
        this.stream.addEventListener(
            'latencyTestResult',
            ({ data: { latencyTimings } }) =>
                this.onLatencyTestResults(latencyTimings)
        );
        this.stream.addEventListener(
            'streamerListMessage',
            ({ data: { messageStreamerList, autoSelectedStreamerId } }) =>
                this.handleStreamerListMessage(messageStreamerList, autoSelectedStreamerId)
        );
        this.stream.addEventListener(
            'settingsChanged',
            (event) => this.configUI.onSettingsChanged(event)
        );
    }

    /**
     * Gets the rootElement of the application, video stream and all UI are children of this element.
     */
    public get rootElement(): HTMLElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'playerUI';
            this._rootElement.classList.add('noselect');
            this._rootElement.appendChild(
                this.stream.videoElementParent
            );
            this._rootElement.appendChild(this.uiFeaturesElement);
        }
        return this._rootElement;
    }

    /**
     * Gets the element that contains all the UI features, like the stats and settings panels.
     */
    public get uiFeaturesElement(): HTMLElement {
        if (!this._uiFeatureElement) {
            this._uiFeatureElement = document.createElement('div');
            this._uiFeatureElement.id = 'uiFeatures';
        }
        return this._uiFeatureElement;
    }

    /**
     * Shows the disconnect overlay
     * @param updateText - the text that will be displayed in the overlay
     */
    showDisconnectOverlay(updateText: string) {
        this.hideCurrentOverlay();
        this.updateDisconnectOverlay(updateText);
        this.disconnectOverlay.show();
        this.currentOverlay = this.disconnectOverlay;
    }

    /**
     * Update the disconnect overlays span text
     * @param updateText - the new countdown number
     */
    updateDisconnectOverlay(updateText: string) {
        this.disconnectOverlay.update(updateText);
    }

    /**
     * Activates the disconnect overlays action
     */
    onDisconnectionAction() {
        this.disconnectOverlay.activate();
    }

    /**
     * Hides the current overlay
     */
    hideCurrentOverlay() {
        if (this.currentOverlay != null) {
            this.currentOverlay.hide();
            this.currentOverlay = null;
        }
    }

    /**
     * Shows the connect overlay
     */
    showConnectOverlay() {
        this.hideCurrentOverlay();
        this.connectOverlay.show();
        this.currentOverlay = this.connectOverlay;
    }

    /**
     * Shows the play overlay
     */
    showPlayOverlay() {
        this.hideCurrentOverlay();
        this.playOverlay.show();
        this.currentOverlay = this.playOverlay;
    }

    /**
     * Shows the text overlay
     * @param text - the text that will be shown in the overlay
     */
    showTextOverlay(text: string) {
        this.hideCurrentOverlay();
        this.infoOverlay.update(text);
        this.infoOverlay.show();
        this.currentOverlay = this.infoOverlay;
    }

    /**
     * Shows the error overlay
     * @param text - the text that will be shown in the overlay
     */
    showErrorOverlay(text: string) {
        this.hideCurrentOverlay();
        this.errorOverlay.update(text);
        this.errorOverlay.show();
        this.currentOverlay = this.errorOverlay;
    }

    /**
     * Shows or hides the settings panel if clicked
     */
    settingsClicked() {
        this.statsPanel.hide();
		this.logsPanel.hide();
		this.paintPanel.hide();
        this.settingsPanel.toggleVisibility();
		this.wheelPanel.hide();
		this.trimPanel.hide();
		this.leatherPanel.hide();
		this.seatPanel.hide();
    }

    /**
     * Shows or hides the stats panel if clicked
     */
    statsClicked() {
        this.settingsPanel.hide();
		this.logsPanel.hide();
		this.paintPanel.hide();
        this.statsPanel.toggleVisibility();
		this.wheelPanel.hide();
		this.trimPanel.hide();
		this.leatherPanel.hide();
		this.seatPanel.hide();
    }

	/**
     * Shows or hides the logs panel if clicked
     */
    logsClicked() {
        this.settingsPanel.hide();
		this.statsPanel.hide();
		this.paintPanel.hide();
        this.logsPanel.toggleVisibility();
		this.wheelPanel.hide();
		this.trimPanel.hide();
		this.leatherPanel.hide();
		this.seatPanel.hide();
    }

	/**
     * Shows or hides the paint panel if clicked
     */
    paintClicked() {
        this.settingsPanel.hide();
		this.statsPanel.hide();
		this.logsPanel.hide();
        this.paintPanel.toggleVisibility();
		this.wheelPanel.hide();
		this.trimPanel.hide();
		this.leatherPanel.hide();
		this.seatPanel.hide();
    }

	/**
     * Shows or hides the wheel panel if clicked
     */
    wheelClicked() {
        this.settingsPanel.hide();
		this.statsPanel.hide();
		this.logsPanel.hide();
        this.paintPanel.hide();
		this.wheelPanel.toggleVisibility();
		this.trimPanel.hide();
		this.leatherPanel.hide();
		this.seatPanel.hide();
    }

	/**
     * Shows or hides the trim panel if clicked
     */
    trimClicked() {
        this.settingsPanel.hide();
		this.statsPanel.hide();
		this.logsPanel.hide();
        this.paintPanel.hide();
		this.wheelPanel.hide();
		this.trimPanel.toggleVisibility();
		this.leatherPanel.hide();
		this.seatPanel.hide();
    }

	/**
     * Shows or hides the leather panel if clicked
     */
    leatherClicked() {
        this.settingsPanel.hide();
		this.statsPanel.hide();
		this.logsPanel.hide();
        this.paintPanel.hide();
		this.wheelPanel.hide();
		this.trimPanel.hide();
		this.leatherPanel.toggleVisibility();
		this.seatPanel.hide();
    }

	/**
     * Shows or hides the seats panel if clicked
     */
    seatClicked() {
        this.settingsPanel.hide();
		this.statsPanel.hide();
		this.logsPanel.hide();
        this.paintPanel.hide();
		this.wheelPanel.hide();
		this.trimPanel.hide();
		this.leatherPanel.hide();
		this.seatPanel.toggleVisibility();
    }

    /**
     * Activates the connect overlays action
     */
    onConnectAction() {
        this.connectOverlay.activate();
    }

    /**
     * Activates the play overlays action
     */
    onPlayAction() {
        this.playOverlay.activate();
    }

    /**
     * Shows the afk overlay
     * @param countDown - the countdown number for the afk countdown
     */
    showAfkOverlay(countDown: number, dismissAfk: () => void) {
        this.hideCurrentOverlay();
        this.afkOverlay.updateCountdown(countDown);
        this.afkOverlay.onAction(() => dismissAfk());
        this.afkOverlay.show();
        this.currentOverlay = this.afkOverlay;
    }

    /**
     * Show the Connect Overlay or auto connect
     */
    showConnectOrAutoConnectOverlays() {
        // set up if the auto play will be used or regular click to start
        if (!this.stream.config.isFlagEnabled(Flags.AutoConnect)) {
            this.showConnectOverlay();
        }
    }

    /**
     * Show the webRtcAutoConnect Overlay and connect
     */
    onWebRtcAutoConnect() {
        this.showTextOverlay('Auto Connecting Now');
    }

    /**
     * Set up functionality to happen when receiving a webRTC answer
     */
    onWebRtcSdp() {
        this.showTextOverlay('WebRTC Connection Negotiated');
    }

    /**
     * Shows a text overlay to alert the user the stream is currently loading
     */
    onStreamLoading() {
        // build the spinner span
        const spinnerSpan: HTMLSpanElement = document.createElement('span');
        spinnerSpan.className = 'visually-hidden';
        spinnerSpan.innerHTML = 'Loading...';

        // build the spinner div
        const spinnerDiv: HTMLDivElement = document.createElement('div');
        spinnerDiv.id = 'loading-spinner';
        spinnerDiv.className = 'spinner-border ms-2';
        spinnerDiv.setAttribute('role', 'status');

        // append the spinner to the element
        spinnerDiv.appendChild(spinnerSpan);

        this.showTextOverlay('Loading Stream ' + spinnerDiv.outerHTML);
    }

    /**
     * Event fired when the video is disconnected - displays the error overlay and resets the buttons stream tools upon disconnect
     * @param eventString - the event text that will be shown in the overlay
     */
    onDisconnect(eventString: string, showActionOrErrorOnDisconnect: boolean) {
        if (showActionOrErrorOnDisconnect == false) {
            this.showErrorOverlay(`Disconnected: ${eventString}`);
        } else {
            this.showDisconnectOverlay(
                `Disconnected: ${eventString}  <div class="clickableState">Click To Restart</div>`
            );
        }
        // disable starting a latency check
        this.statsPanel.latencyTest.latencyTestButton.onclick = () => {
            // do nothing
        };
    }

    /**
     * Handles when Web Rtc is connecting
     */
    onWebRtcConnecting() {
        this.showTextOverlay('Starting connection to server, please wait');
    }

    /**
     * Handles when Web Rtc has connected
     */
    onWebRtcConnected() {
        this.showTextOverlay('WebRTC connected, waiting for video');
    }

    /**
     * Handles when Web Rtc fails to connect
     */
    onWebRtcFailed() {
        this.showErrorOverlay('Unable to setup video');
    }

    onLoadFreezeFrame(shouldShowPlayOverlay: boolean) {
        if (shouldShowPlayOverlay === true) {
            Logger.Log(Logger.GetStackTrace(), 'showing play overlay');
            this.showPlayOverlay();
        }
    }

    onPlayStream() {
        this.hideCurrentOverlay();
    }

    onPlayStreamError(message: string) {
        this.showErrorOverlay(message);
    }

    onPlayStreamRejected(onRejectedReason: unknown) {
        this.showPlayOverlay();
    }

    onVideoInitialized() {
        if (!this.stream.config.isFlagEnabled(Flags.AutoPlayVideo)) {
            this.showPlayOverlay();
        }

        // starting a latency check
        this.statsPanel.latencyTest.latencyTestButton.onclick = () => {
            this.stream.requestLatencyTest();
        };
    }

    /**
     * Set up functionality to happen when calculating the average video encoder qp
     * @param QP - the quality number of the stream
     */
    onVideoEncoderAvgQP(QP: number) {
        // Update internal QP indicator if one is present
        if (!!this.videoQpIndicator) {
            this.videoQpIndicator.updateQpTooltip(QP);
        }
    }

    onInitialSettings(settings: InitialSettings) {
        if (settings.PixelStreamingSettings) {
            const disableLatencyTest =
                settings.PixelStreamingSettings.DisableLatencyTest;
            if (disableLatencyTest) {
                this.statsPanel.latencyTest.latencyTestButton.disabled = true;
                this.statsPanel.latencyTest.latencyTestButton.title =
                    'Disabled by -PixelStreamingDisableLatencyTester=true';
                Logger.Info(
                    Logger.GetStackTrace(),
                    '-PixelStreamingDisableLatencyTester=true, requesting latency report from the the browser to UE is disabled.'
                );
            }
        }
    }

    onStatsReceived(aggregatedStats: AggregatedStats) {
        // Grab all stats we can off the aggregated stats
        this.statsPanel.handleStats(aggregatedStats);
    }

    onLatencyTestResults(latencyTimings: LatencyTestResults) {
        this.statsPanel.latencyTest.handleTestResult(latencyTimings);
    }

    handleStreamerListMessage(messageStreamingList: MessageStreamerList, autoSelectedStreamerId: string | null) {
        if (autoSelectedStreamerId === null) {
            if(messageStreamingList.ids.length === 0) {
                this.showDisconnectOverlay(
                    'No streamers connected. <div class="clickableState">Click To Restart</div>'
                );
            } else {
                this.showTextOverlay(
                    'Multiple streamers detected. Use the dropdown in the settings menu to select the streamer'
                );
            }
        }
    }

    /**
     * Set light/dark color mode
     * @param isLightMode - should we use a light or dark color scheme
     */
    setColorMode(isLightMode: boolean) {
        if (this.onColorModeChanged) {
            this.onColorModeChanged(isLightMode);
        }
    }
}
