// Copyright Epic Games, Inc. All Rights Reserved.

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    usedExports: true,
    minimize: true
  },
  stats: 'errors-only',
  performance: {
    hints: false
  },
  plugins: [
    new webpack.DefinePlugin({
      WEBSOCKET_URL: undefined,
      ENABLE_METRICS: undefined,
      BUCCANEER_URL: undefined
    }),
  ]
});
