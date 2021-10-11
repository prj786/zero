const { merge } = require('webpack-merge');
const path = require('path');

const config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    writeToDisk: true,
    port: 8000
  },

  output: {
    path: path.resolve(__dirname, 'dev')
  }
});
