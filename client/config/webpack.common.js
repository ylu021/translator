var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    compress: true,
    port: 9000,
    watchContentBase: true
  },
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },
  resolve: {
    extensions: ['.ts', '.js'] // look for ts or js for import
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: path.resolve(__dirname, '../src/tsconfig.json')
            }
          },
          { loader: 'angular2-template-loader' }
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, '../src/app'),
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
        // extract css into separate file
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, '../src/app'),
        use: 'raw-loader'
        // import files as strings
      }
    ]
  },
  plugins: [
    // restrict module usage to only inside the src
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, '../src'),
      {} // a map of routes
    ),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }), // generate an html in dist folder

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    })
  ]
};
