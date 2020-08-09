var webpack = require('webpack');
var path = require('path');

module.exports = {
  mode: 'development',
  context: path.join(__dirname, "src"),

  entry: "./js/app.js",
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
};