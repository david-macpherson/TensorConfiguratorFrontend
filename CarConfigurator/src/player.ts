// Copyright Epic Games, Inc. All Rights Reserved.

import { Config, PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.2';
import { CarConfigurator, CarConfiguratorStyle } from 'carconfigurator-ui';
const CarConfiguratorStyles =
    new CarConfiguratorStyle();
	CarConfiguratorStyles.applyStyleSheet();

document.body.onload = function() {
	// Create a config object
	const config = new Config({ useUrlParams: true });

	// Create a Native DOM delegate instance that implements the Delegate interface class
	const stream = new PixelStreaming(config);
	const application = new CarConfigurator({
		stream,
		onColorModeChanged: (isLightMode) => CarConfiguratorStyles.setColorMode(isLightMode)
	});

	document.body.appendChild(application.rootElement);
}
