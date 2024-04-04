// Copyright Epic Games, Inc. All Rights Reserved.

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const fs = require('fs');
require('dotenv').config({ path: './.env' });

const pages = fs.readdirSync('./src', {
  withFileTypes: true
})
  .filter(item => !item.isDirectory())
  .filter(item => path.parse(item.name).ext === '.html')
  .map(htmlFile => path.parse(htmlFile.name).name);

module.exports = {
  entry: pages.reduce((config, page) => {
    config[page] = `./src/${page}.ts`;
    return config;
  }, {}),

  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: 'src/assets/images',
        to: 'car-images'
      }]
    })
  ].concat(pages.map((page) => new HtmlWebpackPlugin({
    title: `${page}`,
    template: `./src/${page}.html`,
    filename: `${page}.html`,
    chunks: [page],
  }),)),

  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: [
        /node_modules/,
      ],
    }, {
      test: /\.html$/i,
      use: 'html-loader'
    }, {
      test: /\.css$/,
      type: 'asset/resource',
      generator: {
        filename: 'css/[name][ext]'
      }
    }, {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'car-images/[name][ext]'
      }
    }],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.svg', '.json'],
  },
  output: {
    filename: 'carconfig.js',
    library: 'carconfig-frontend',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, './dist/www/'),
    clean: true,
    globalObject: 'this',
    hashFunction: 'xxhash64',
  },
  experiments: {
    futureDefaults: true
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './dist/www/'),
    },
  },
}
