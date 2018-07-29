const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (function(options) {
  return {
    mode: "development",

    entry: {
      main: path.resolve("example/index.ts")
    },

    output: {
      path: __dirname + "/dist",
      filename: "bundle.js"
    },

    devtool: 'source-map',

    module: {
      rules: [
        { test: /\.ts$/, loader: "ts-loader" }
      ]
    },

    plugins: [ new HtmlWebpackPlugin() ],

    resolve: {
      extensions: ['.ts', '.js', '.json']
    }

  }
})();
