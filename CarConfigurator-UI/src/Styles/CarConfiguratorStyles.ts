/* Copyright Epic Games, Inc. All Rights Reserved. */

import jss, { Styles } from 'jss';
import global from 'jss-plugin-global';
import camelCase from 'jss-plugin-camel-case';

export interface ColorPalette {
    '--color0': string;
    '--color1': string;
    '--color2': string;
    '--color3': string;
    '--color4': string;
    '--color5': string;
    '--color6': string;
    '--color7': string;
}

export class CarConfiguratorStyle {
    defaultLightModePalette: ColorPalette = {
        '--color0': '#e2e0dd80',
        '--color1': '#FFFFFF',
        '--color2': '#000000',
        '--color3': '#0585fe',
        '--color4': '#35b350',
        '--color5': '#ffab00',
        '--color6': '#e1e2dd',
        '--color7': '#c3c4bf'
    };

    defaultDarkModePalette: ColorPalette = {
        '--color0': '#1D1F2280',
        '--color1': '#000000',
        '--color2': '#FFFFFF',
        '--color3': '#0585fe',
        '--color4': '#35b350',
        '--color5': '#ffab00',
        '--color6': '#1e1d22',
        '--color7': '#3c3b40'
    };

    defaultStyles = {
        ':root': {
            '--color0': '#1D1F2280',
            '--color1': '#000000',
            '--color2': '#FFFFFF',
            '--color3': '#0585fe',
            '--color4': '#35b350',
            '--color5': '#ffab00',
            '--color6': '#1e1d22',
            '--color7': '#3c3b40',
            '--color8': '#41008c',
            '--color9': '#3e0070',
            '--color10': '#2e0052',
            '--color11': 'rgba(65,0,139,1)',
			'--color12': '255, 0, 0',
			'--color13': '60, 59, 64',
			'--color14': '255, 171, 0',
			'--color15': '5, 133, 254',
			
        },
        '.noselect': {
            userSelect: 'none'
        },
        '#playerUI': {
            width: '100%',
            height: '100%',
            position: 'relative'
        },
        '#videoElementParent': {
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'var(--color1)'
        },
        '#uiFeatures': {
            width: '100%',
            height: '100%',
            zIndex: '30',
            position: 'relative',
            color: 'var(--color2)',
            pointerEvents: 'none',
            overflow: 'hidden'
        },
        '.UiTool .tooltiptext': {
            visibility: 'hidden',
            width: 'auto',
            color: 'var(--color2)',
            textAlign: 'center',
            borderRadius: '15px',
            padding: '0px 10px',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.75rem',
            letterSpacing: '0.75px',
            position: 'absolute',
            zIndex: '20'
        },
        '.UiTool:hover .tooltiptext': {
            visibility: 'visible',
            backgroundColor: 'var(--color0)'
        },
        '#connection .tooltiptext': {
            top: '125%',
            transform: 'translateX(-25%)',
            left: '0',
            zIndex: '20',
            padding: '5px 10px'
        },
        '#connection': {
            position: 'absolute',
            bottom: '8%',
            right: '5%',
            fontFamily: "'Michroma', sans-serif",
            height: '3rem',
            width: '3rem',
            pointerEvents: 'all'
        },
        '#settings-panel .tooltiptext': {
            display: 'block',
            top: '125%',
            transform: 'translateX(-50%)',
            left: '0',
            zIndex: '20',
            padding: '5px 10px',
            border: '3px solid var(--color3)',
            width: 'max-content',
            fallbacks: [
                {
                    width: 'max-content'
                },
                {
                    border: '3px solid var(--color3)'
                },
                {
                    padding: '5px 10px'
                },
                {
                    zIndex: '20'
                },
                {
                    left: '0'
                },
                {
                    transform: 'translateX(-50%)'
                },
                {
                    top: '125%'
                },
                {
                    display: 'block'
                }
            ]
        },
		'#optionsBar': {
            position: 'absolute',
            bottom: '5%',
            left: '12.5%',
			width: '75%',
            fontFamily: "'Michroma', sans-serif",
            pointerEvents: 'all',
            display: 'flex',
			color: 'white',
            transition: '0.3s ease',
        },
		'.option': {
			flexBasis: 'calc( 100% / 6 )',
			backgroundColor: 'rgba(0,0,0,0.8)',
			border: '2px solid white',
			borderRadius: '1rem',
			display: 'flex',
            margin: 'auto'
		},
        '.option:hover': {
            border: '2px solid gold'
        },
		'.option img': {
			display: 'inline',
			padding: '1rem',
			width: '30% !important',
			height: 'auto !important',
			borderRight: '2px solid',
            borderColor: 'inherit'
		},
		'.option div': {
			display: 'flex',
			margin: 'auto',
			alignItems: 'center'
		},
        '#controls': {
            position: 'absolute',
            top: '3%',
            right: '2%',
            fontFamily: "'Michroma', sans-serif",
            pointerEvents: 'all',
            display: 'block',
			borderRadius: '0.6rem',
			backgroundColor: 'var(--color0);',
            border: '1px solid rgb(var(--color13))'
        },
        '#controls>*': {
            marginRight: '0.5rem',
			marginLeft: '0.5rem',
            borderRadius: '50%',
            display: 'block',
            height: '2rem',
            lineHeight: '1.75rem',
            padding: '0.5rem'
        },
        '@media (max-width: 1023px)': {
            '#controls>*': {
                marginRight: '0 !important',
                marginLeft: '0 !important'
            },
            '#uiFeatures button': {
                float: 'none !important',
            },
            '.UiTool .tooltiptext': {
                transform: 'translateY(-50%)',
                top: '55%',
                right: '125%',
            }
        },
        '@media (min-width: 1024px)': {
            '.UiTool .tooltiptext': {
                transform: 'translateX(-50%)',
                top: '125%',
                left: '55%'
            }
        },
        '@media (max-width: 1365px)': {
            '.option div': {
                display: 'none'
            },
            '.option img': {
                border: 'none',
                margin: 'auto',
                padding: '0',
                width: '50% !important',
                marginTop: '12.5%',
                marginBottom: '12.5%'
            },
        },
        '@media (min-width: 1366px)': {
        },


        '#controls #additionalinfo': {
            textAlign: 'center',
            fontFamily: "'Montserrat', sans-serif"
        },
        '#minimizeIcon': {
            display: 'none'
        },
        '#settingsBtn, #statsBtn': {
            cursor: 'pointer'
        },
        '#uiFeatures button': {
            background: 'none',
            border: '2px solid rgba(0,0,0,0)',
            color: 'var(--color2)',
            position: 'relative',
            width: '3.1rem',
            height: '3.1rem',
            padding: '0.75rem',
            textAlign: 'center',
			float: 'left'
        },
        '#uiFeatures button:hover': {
            backgroundColor: 'rgba(var(--color15), 0.2)',
            border: '2px solid rgb(var(--color15))',
            transition: '0.25s ease',
            paddingLeft: '0.75rem',
            paddingTop: '0.75rem'
        },
        '#uiFeatures button:active': {
            border: '2px solid rgb(var(--color15))',
            backgroundColor: 'rgba(var(--color13), 0.2)',
            paddingLeft: '0.75rem',
            paddingTop: '0.75rem'
        },
        '.btn-flat': {
            backgroundColor: 'transparent',
            color: 'var(--color2)',
            fontFamily: "'Montserrat'",
            fontWeight: 'bold',
            border: '3px solid var(--color3)',
            borderRadius: '1rem',
            fontSize: '0.75rem',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            cursor: 'pointer',
            textAlign: 'center'
        },
        '.btn-flat:hover': {
            backgroundColor: 'var(--color3)',
            transition: 'ease 0.3s'
        },
        '.btn-flat:disabled': {
            background: 'var(--color7)',
            borderColor: 'var(--color3)',
            color: 'var(--color3)',
            cursor: 'default'
        },
        '.btn-flat:active': {
            backgroundColor: 'transparent'
        },
        '.btn-flat:focus': {
            outline: 'none'
        },
        '.panel-wrap': {
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            height: '100%',
            minWidth: '20vw',
            maxWidth: '90vw',
            transform: 'translateX(-100%)',
            transition: '.3s ease-out',
            pointerEvents: 'all',
            backdropFilter: 'blur(10px)',
            '-webkit-backdrop-filter': 'blur(10px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            backgroundColor: 'var(--color0)'
        },
        '.panel-wrap-visible': {
            transform: 'translateX(0%)'
        },
        '.panel': {
            overflowY: 'auto',
            padding: '1em'
        },
        '#settingsHeading, #statsHeading, #logsHeading, #variantHeading': {
            display: 'inline-block',
            fontSize: '2em',
            marginBlockStart: '0.67em',
            marginBlockEnd: '0.67em',
            marginInlineStart: '0px',
            marginInlineEnd: '0px',
            position: 'relative',
            padding: '0 0 0 2rem'
        },
        '#settingsClose, #statsClose, #logsClose, #variantClose': {
            margin: '0.5rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            paddingRight: '0.5rem',
            fontSize: '2em',
            float: 'right'
        },
        '#settingsClose:after, #statsClose:after, #logsClose:after, #variantClose:after': {
            paddingLeft: '0.5rem',
            display: 'inline-block',
            content: '"\\00d7"'
        },
        '#settingsClose:hover, #statsClose:hover, #logsClose:hover, #variantClose:hover': {
            color: 'var(--color3)',
            transition: 'ease 0.3s'
        },
        '#settingsContent, #statsContent, #logsContent, #variantContent': {
            marginLeft: '2rem',
            marginRight: '2rem'
        },
		'#logsContent': {
			
		},
		'#logsContent > div': {
			backgroundColor: 'rgba(var(--color13), 0.2)',
			color: 'var(--color2)',
			counterReset: 'line',
			borderRadius: '1rem'
		},
        '.setting': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '0.15rem 10px 0.15rem 10px'
        },
        '.settings-text': {
            color: 'var(--color2)',
            verticalAlign: 'middle',
            fontWeight: 'normal'
        },
        '.settings-option': {
            width: '100%',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        },
        '#connectOverlay, #playOverlay, #infoOverlay, #errorOverlay, #afkOverlay, #disconnectOverlay':
            {
                zIndex: '30',
                position: 'absolute',
                color: 'var(--color2)',
                fontSize: '1.8em',
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--color1)',
                alignItems: 'center',
                justifyContent: 'center',
                textTransform: 'uppercase',
                textAlign: 'center'
            },
        '.clickableState': {
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            cursor: 'pointer'
        },
        '.textDisplayState': {
            display: 'flex'
        },
        '.hiddenState': {
            display: 'none'
        },
        '#playButton, #connectButton': {
            display: 'inline-block',
            height: 'auto',
            zIndex: '30'
        },
        'img#playButton': {
            maxWidth: '241px',
            width: '10%'
        },
        '#uiInteraction': {
            position: 'fixed'
        },
        '#UIInteractionButtonBoundary': {
            padding: '2px'
        },
        '#UIInteractionButton': {
            cursor: 'pointer'
        },
        '#hiddenInput': {
            position: 'absolute',
            left: '-10%',
            width: '0px',
            opacity: '0'
        },
        '#editTextButton': {
            position: 'absolute',
            height: '40px',
            width: '40px'
        },
        '.btn-overlay': {
            verticalAlign: 'middle',
            display: 'inline-block'
        },
        '.tgl-switch': {
            verticalAlign: 'middle',
            display: 'inline-block'
        },
        '.tgl-switch .tgl': {
            display: 'none'
        },
        '.tgl, .tgl:after, .tgl:before, .tgl *, .tgl *:after, .tgl *:before, .tgl+.tgl-slider':
            {
                '-webkit-box-sizing': 'border-box',
                boxSizing: 'border-box'
            },
        '.tgl::-moz-selection, .tgl:after::-moz-selection, .tgl:before::-moz-selection, .tgl *::-moz-selection, .tgl *:after::-moz-selection, .tgl *:before::-moz-selection, .tgl+.tgl-slider::-moz-selection':
            {
                background: 'none'
            },
        '.tgl::selection, .tgl:after::selection, .tgl:before::selection, .tgl *::selection, .tgl *:after::selection, .tgl *:before::selection, .tgl+.tgl-slider::selection':
            {
                background: 'none'
            },
        '.tgl-slider': {},
        '.tgl+.tgl-slider': {
            outline: '0',
            display: 'block',
            width: '40px',
            height: '18px',
            position: 'relative',
            cursor: 'pointer',
            userSelect: 'none'
        },
        '.tgl+.tgl-slider:after, .tgl+.tgl-slider:before': {
            position: 'relative',
            display: 'block',
            content: '""',
            width: '50%',
            height: '100%'
        },
        '.tgl+.tgl-slider:after': {
            left: '0'
        },
        '.tgl+.tgl-slider:before': {
            display: 'none'
        },
        '.tgl-flat+.tgl-slider': {
            padding: '2px',
            '-webkit-transition': 'all .2s ease',
            transition: 'all .2s ease',
            background: 'var(--color6)',
            border: '3px solid var(--color7)',
            borderRadius: '2em'
        },
        '.tgl-flat+.tgl-slider:after': {
            '-webkit-transition': 'all .2s ease',
            transition: 'all .2s ease',
            background: 'var(--color7)',
            content: '""',
            borderRadius: '1em'
        },
        '.tgl-flat:checked+.tgl-slider': {
            border: '3px solid var(--color3)'
        },
        '.tgl-flat:checked+.tgl-slider:after': {
            left: '50%',
            background: 'var(--color3)'
        },
        '.btn-apply': {
            display: 'block !important',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '40%'
        },
        '.form-control': {
            backgroundColor: 'var(--color7)',
            border: '2px solid var(--color7)',
            borderRadius: '4px',
            color: 'var(--color2)',
            textAlign: 'right',
            fontFamily: 'inherit'
        },
        '.form-control:hover': {
            borderColor: 'var(--color7)'
        },
        '.form-group': {
            paddingTop: '4px',
            display: 'grid',
            gridTemplateColumns: '80% 20%',
            rowGap: '4px',
            paddingRight: '10px',
            paddingLeft: '10px'
        },
        '.form-group label': {
            verticalAlign: 'middle',
            fontWeight: 'normal'
        },
        '.settingsContainer': {
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '1px solid var(--color7)',
            paddingTop: '10px',
            paddingBottom: '10px'
        },
        '.settingsContainer> :first-child': {
            marginTop: '4px',
            marginBottom: '4px',
            fontWeight: 'bold',
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline'
        },
        '.collapse': {
            paddingLeft: '5%'
        },
        '#streamTools': {
            borderBottomRightRadius: '5px',
            borderBottomLeftRadius: '5px',
            userSelect: 'none',
            position: 'absolute',
            top: '0',
            right: '2%',
            zIndex: '100',
            border: '4px solid var(--colour8)',
            borderTopWidth: '0px'
        },
        '.settingsHeader': {
            fontStyle: 'italic'
        },
        '#streamToolsHeader': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--colour8)',
            backgroundColor: 'var(--color7)'
        },
        '.streamTools': {
            backgroundColor: 'var(--color2)',
            fontFamily: 'var(--buttonFont)',
            fontWeight: 'lighter',
            color: 'var(--color7)'
        },
        '.streamTools-shown>#streamToolsSettings, .streamTools-shown>#streamToolsStats':
            {
                display: 'block'
            },
        '#streamToolsToggle': {
            width: '100%'
        },
        '#qualityStatus': {
            fontSize: '37px',
            paddingRight: '4px'
        },
        '.svgIcon': {
            fill: 'var(--color2)'
        },
		'#filterBar': {
			display: 'flex',
			margin: '0rem 2rem',
			paddingBottom: '2rem'
		},

		'#logMessage': {
			whiteSpace: 'pre-wrap',
			borderRight: '1px solid rgb(var(--color13))',
			borderLeft: '1px solid rgb(var(--color13))',
			margin: 0,
			paddingRight: '1rem'
		},
		'#logMessage:first-of-type': {
			'border-top-left-radius': '1rem',
			'border-top-right-radius': '1rem',
			'border-top': '1px solid rgb(var(--color13))',
		},
		'#logMessage:last-of-type': {
			'border-bottom-left-radius': '1rem',
			'border-bottom-right-radius': '1rem',
			'border-bottom': '1px solid rgb(var(--color13))',
		},
		'#logMessage:before': {
			counterIncrement: 'line',
			content: 'counter(line)',
			display: 'inline-block',
			marginRight: '1rem',
			paddingRight: '1rem',
			borderRight: '1px solid rgb(var(--color13))',
			width: '1.5rem',
			textAlign: 'right',
			paddingBottom: '0.5rem',
			paddingTop: '0.5rem'
		},
		'.logFilter': {
			float: 'left',
			flexBasis: 'calc( 100% / 5 )',
			fontFamily: 'Montserrat'
		},
		'.logFilter:first-of-type': {
			'border-top-left-radius': '10px',
			'border-bottom-left-radius': '10px'
		},
		'.logFilter:last-of-type': {
			'border-top-right-radius': '10px',
			'border-bottom-right-radius': '10px'
		},
		'#logsContainer button': {
            backgroundColor: 'rgba(var(--color13), 0.2)',
            border: '1px solid rgb(var(--color13))',
            color: 'var(--color2)',
            position: 'relative',
            padding: '0.5rem',
            textAlign: 'center',
			float: 'left'
        },
        '#logsContainer button:hover': {
            backgroundColor: 'rgba(var(--color15), 0.2)',
            transition: '0.25s ease',
			border: '2px solid rgb(var(--color15))',
			padding: '0.5rem',
        },
        '#logsContainer button:active': {
            border: '2px solid rgb(var(--color15))',
            backgroundColor: 'rgba(var(--color13), 0.2)',
			padding: '0.5rem',
        },
		'#errorFilter:hover': {
			backgroundColor: 'rgba(var(--color12), 0.2) !important',
			border: '2px solid rgb(var(--color12)) !important',
		},
		'#errorFilter:active': {
			backgroundColor: 'rgba(var(--color12), 0.2) !important',
			border: '2px solid rgb(var(--color12)) !important',
		},
		'#errorFilter.active': {
			backgroundColor: 'rgba(var(--color12), 0.2) !important',
			border: '2px solid rgb(var(--color12)) !important',
		},
		'#warnFilter:hover': {
			backgroundColor: 'rgba(var(--color14), 0.2) !important',
			border: '2px solid rgb(var(--color14)) !important',
		},
		'#warnFilter:active': {
			backgroundColor: 'rgba(var(--color14), 0.2) !important',
			border: '2px solid rgb(var(--color14)) !important',
		},
		'#warnFilter.active': {
			backgroundColor: 'rgba(var(--color14), 0.2) !important',
			border: '2px solid rgb(var(--color14)) !important',
		},
		'#debugFilter': {
		},
		'#debugFilter.active': {
			border: '2px solid rgb(var(--color15))',
            backgroundColor: 'rgba(var(--color15), 0.2)',
		},
		'#infoFilter': {
		},
		'#infoFilter.active': {
			border: '2px solid rgb(var(--color15))',
            backgroundColor: 'rgba(var(--color15), 0.2)',
		},
		'#logFilter': {
		},
		'#logFilter.active': {
			border: '2px solid rgb(var(--color15))',
            backgroundColor: 'rgba(var(--color15), 0.2)',
		},
		'.invisible': {
			'display': 'none !important'
		},
        '.opacity': {
			'opacity': '0'
		},
        '.hide': {
            'display': 'none !important'
        },
		'.variant-container': {
			flexBasis: 'calc( 100% / 5 )',
			backgroundColor: 'rgba(var(--color13), 0.2)',
			border: '1px solid rgb(var(--color13))',
			borderRadius: '1rem',
			marginBottom: '1rem',
			display: 'flex'
		},
        '.variant-container:hover': {
            border: '1px solid gold'
        },
		'.variant-container img': {
			display: 'inline',
			width: 'auto',
			height: 'auto !important',
			borderRight: '1px solid rgb(var(--color13))',
			'border-top-left-radius': '1rem',
			'border-bottom-left-radius': '1rem'
		},
		'.variant-container div': {
			display: 'flex',
			alignItems: 'center',
			margin: '2rem 1rem'
		},
    };

    customStyles?: Partial<Styles>;
    lightModePalette: ColorPalette;
    darkModePalette: ColorPalette;

    constructor(options?: {
        customStyles?: Partial<Styles>;
        lightModePalette?: ColorPalette;
        darkModePalette?: ColorPalette;
    }) {
        const { customStyles, lightModePalette, darkModePalette } =
            options ?? {};
        // One time setup with default plugins and settings.
        const jssOptions = {
            // JSS has many interesting plugins we may wish to turn on
            //plugins: [functions(), template(), global(), extend(), nested(), compose(), camelCase(), defaultUnit(options.defaultUnit), expand(), vendorPrefixer(), propsSort()]
            plugins: [global(), camelCase()]
        };

        jss.setup(jssOptions);

        this.customStyles = customStyles;
        this.lightModePalette =
            lightModePalette ?? this.defaultLightModePalette;
        this.darkModePalette = darkModePalette ?? this.defaultDarkModePalette;
    }

    applyStyleSheet() {
        // Todo: refactor codebase to use jss at a component level, classes can be grabbed like so:
        //const {pixelStreamingClasses} = jss.createStyleSheet(styles).attach();

        // attach generated style sheet to page
        jss.createStyleSheet({
            '@global': {
                ...this.defaultStyles,
                ...this.customStyles
            }
        }).attach();
    }

    applyPalette(palette: ColorPalette) {
        const rootElement = document.querySelector(':root') as HTMLElement;
        rootElement.style.setProperty('--color0', palette['--color0']);
        rootElement.style.setProperty('--color1', palette['--color1']);
        rootElement.style.setProperty('--color2', palette['--color2']);
        rootElement.style.setProperty('--color3', palette['--color3']);
        rootElement.style.setProperty('--color4', palette['--color4']);
        rootElement.style.setProperty('--color5', palette['--color5']);
        rootElement.style.setProperty('--color6', palette['--color6']);
        rootElement.style.setProperty('--color7', palette['--color7']);
    }

    /**
     * Update the players color variables
     * @param isLightMode - should we use a light or dark color scheme
     */
    setColorMode(isLightMode: boolean) {
        if (isLightMode) {
            this.applyPalette(this.lightModePalette);
        } else {
            this.applyPalette(this.darkModePalette);
        }
    }
}
