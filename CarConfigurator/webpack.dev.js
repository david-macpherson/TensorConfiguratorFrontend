// Copyright Epic Games, Inc. All Rights Reserved.

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            WEBSOCKET_URL: JSON.stringify((process.env.WEBSOCKET_URL !== undefined) ? process.env.WEBSOCKET_URL : undefined)
        }),
    ]
});
