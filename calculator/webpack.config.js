const path = require('path');
//const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const HtmlWepackPlugin = require('html-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({ filename: 'main.css' });

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'raw-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /.scss$/,
        use: extractPlugin.extract({
          use: [ 'css-loader', 'sass-loader' ]
        })
      }
    ]
  },
  plugins: [
    extractPlugin,
    //new webpack.HotModuleReplacementPlugin(),
    //new HtmlWepackPlugin({ template: './dist/index.html' })
  ],
  devServer: {
    port: 5050
  }
}