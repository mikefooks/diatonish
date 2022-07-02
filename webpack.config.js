const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  // devtool: "eval-cheap-source-map",
  mode: "production",
  module: {
    rules: [{
    	test: /\.(js|jsx)$/,
	    exclude: /node_modules/,
	    use: {
	      loader: 'babel-loader'
	    }
    },/*
    {
    	test: /\.mp3$/,
	    exclude: /node_modules/,
	    loader: 'file-loader',
      options: {
        outputPath: 'sounds',
        name: '[name].[ext]'
      }
    },*/
    {
	    test: /\.html$/,
	    exclude: /node_modules/,
	    loader: 'html-loader',
      options: {
        sources: false
      }
    },
    {
      test: /\.s[ac]ss$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }
  ]
  },
  plugins:
  [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
