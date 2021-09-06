const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: "eval-cheap-source-map",
  mode: "development",
  module: {
    rules: [{
    	test: /\.(js|jsx)$/,
	    exclude: /node_modules/,
	    use: {
	      loader: 'babel-loader'
	    }
    },
    {
	    test: /\.html$/,
	    exclude: /node_modules/,
	    use: {
	      loader: 'html-loader'
	    }
      },
      {
	      test: /\.css$/,
	      exclude: /node_modules/,
	      use: [
	        'style-loader',
	        'css-loader',
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