const { merge } = require('webpack-merge');
const path = require('path');

const config = require('./webpack.config');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge(config, {
  mode: 'development',

  devtool: 'inline-source-map',

  plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dev'] }
    })
  ],

  devServer: {
    writeToDisk: true,
    port: 8000
  },

  output: {
    path: path.resolve(__dirname, 'dev')
  }
});
