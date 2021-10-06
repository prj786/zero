const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const IS_DEVELOPMENT = process.env.MODE === 'dev';

const dirViews = path.join(__dirname, 'src/views/pages');
const dirScripts = path.join(__dirname, 'src/scripts');
const dirStyles = path.join(__dirname, 'src/styles');
const dirPublic = path.join(__dirname, 'public');
const dirNode = 'node_modules';

// const folders = [
//   'index.html',
//   'about/index.html'
// ];

// const mapFolders = folders.map(filename => {
//   return new HtmlWebpackPlugin({
//     filename,
//     template: path.join(dirViews, 'base.pug')
//   });
// });

module.exports = {
  entry: [
    path.join(dirScripts, 'app.js'),
    path.join(dirStyles, 'app.scss')
  ],

  output: {
    filename: 'app.[contenthash].js'
  },

  resolve: {
    modules: [
      dirViews,
      dirScripts,
      dirStyles,
      dirPublic,
      dirNode
    ]
  },

  plugins: [

    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.join(dirViews, '/home.pug')
    }),

    new webpack.DefinePlugin({
      IS_DEVELOPMENT
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public',
          to: ''
        },
        {
          from: './fonts',
          to: ''
        }
      ]
    }),

    new MiniCssExtractPlugin({
      filename: 'app.[hash].css',
      chunkFilename: '[id].css'
    }),

    new CleanWebpackPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },

      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },

      {
        test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
        loader: 'file-loader',
        options: {
          name (file) {
            return '[name].[ext]';
          }
        }
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/
      }
    ]
  }
};
