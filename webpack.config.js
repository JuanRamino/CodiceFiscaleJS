const path = require('path')
const webpack = require('webpack')
const createVariants = require('parallel-webpack').createVariants
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function createConfig (options) {
  return {
    entry: {
      'codice.fiscale': './src/codice-fiscale.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'codice.fiscale.' + options.target + '.js',
      library: 'CodiceFiscale',
      libraryTarget: options.target
    },
    module: {
      rules: [
        {
          test: /\.json$/,
          loader: 'json-loader'
        }, {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env']
            }
          }
        }
      ]
    },
    optimization: {
      minimizer: [new UglifyJsPlugin()],
    }
  }
}

module.exports = createVariants({
  target: [
    'var',
    'commonjs2',
    'umd',
    'amd'
  ]
}, createConfig)
