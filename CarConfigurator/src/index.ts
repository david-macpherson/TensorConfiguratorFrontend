// Copyright Epic Games, Inc. All Rights Reserved.

import { Config, PixelStreaming, MessageRecv, TextParameters, Flags } from 'carconfigurator-lib';
import { CarConfiguratorStyle, UIElementCreationMode } from 'carconfigurator-ui';
import { SPSApplication } from "./SPSApplication";

const CarConfiguratorStyles =
	new CarConfiguratorStyle();
CarConfiguratorStyles.applyStyleSheet();

// websocket url env
declare var WEBSOCKET_URL: string;

// Extend the MessageRecv to allow the engine version to exist as part of our config message from the signalling server
class MessageExtendedConfig extends MessageRecv {
	peerConnectionOptions: RTCConfiguration;
	engineVersion: string;
	platform: string;
	frontendToSendOffer: boolean;
};

// Extend PixelStreaming to use our custom extended config that includes the engine version
class ScalablePixelStreaming extends PixelStreaming {
	// Create a new method that retains original functionality
	public handleOnConfig(messageExtendedConfig: MessageExtendedConfig) {
		this._webRtcController.handleOnConfigMessage(messageExtendedConfig);
	}
};

document.body.onload = function () {
	// Create a config object. We default to sending the WebRTC offer from the browser as true, TimeoutIfIdle to true, AutoConnect to false and MaxReconnectAttempts to 0
	const config = new Config({ useUrlParams: true, initialSettings: { OfferToReceive: true, TimeoutIfIdle: true, AutoConnect: false, MaxReconnectAttempts: 0, MatchViewportRes: true, MinQP: 20 } });

	// make usage of WEBSOCKET_URL if it is not empty
	let webSocketAddress = WEBSOCKET_URL
	if (webSocketAddress != "") {
		config.setTextSetting(TextParameters.SignallingServerUrl, webSocketAddress);
	}

	// Create stream and spsApplication instances that implement the Epic Games Pixel Streaming Frontend PixelStreaming and Application types
	const stream = new ScalablePixelStreaming(config);

	// Create and append our application
	const spsApplication = new SPSApplication({
		stream,
		onColorModeChanged: (isLightMode) => CarConfiguratorStyles.setColorMode(isLightMode) /* Light/Dark mode support. */,
		volumeControlsConfig: {
			creationMode: UIElementCreationMode.Disable
		},
		microphoneControlsConfig: {
			creationMode: UIElementCreationMode.Disable
		}
	});

	// Only show options bar once stream starts
	stream.addEventListener("playStream", () => {
		spsApplication.showOptions();
	})

	stream.addEventListener("webRtcDisconnected", () => {
		spsApplication.hideOptions();
	})

	document.body.appendChild(spsApplication.rootElement);
}
