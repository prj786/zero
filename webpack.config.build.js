require('dotenv').config();
process.env.MODE = 'production';

const path = require('path');

const { merge } = require('webpack-merge');
const config = require('./webpack.config');
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(config, {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'dist')
  },

  // module: {
  //   rules: [
  //     {
  //       test: /\.(jpe?g|png|gif|svg)$/i,
  //       type: 'asset',
  //       use: [
  //         {
  //           loader: ImageMinimizerPlugin.loader
  //         }
  //       ]
  //     }
  //   ]
  // },
  // plugins: [
  //   new ImageMinimizerPlugin({
  //     minimizerOptions: {
  //       // Lossless optimization with custom option
  //       // Feel free to experiment with options for better result for you
  //       plugins: [
  //         ['gifsicle', { interlaced: true }],
  //         ['jpegtran', { progressive: true }],
  //         ['optipng', { optimizationLevel: 8 }]
  //       ]
  //     }
  //   })
  // ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin()
    ]
  }

});
