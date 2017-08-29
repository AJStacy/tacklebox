var webpack = require('webpack');
var path = require('path');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/TackleBox.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader','ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: 'tacklebox.js',
    path: path.resolve(__dirname, './dist'),
    library: 'TackleBox',
    libraryTarget: 'commonjs'
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
  ]
};

// Check if the node environment is set to production
if (process.env.NODE_ENV === 'production') {
  module.exports.output['libraryTarget'] = 'var';
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}
