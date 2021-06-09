const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'src');
const dirStyles = path.join(__dirname, 'styles');
const dirPublic = path.join(__dirname, 'public');

module.exports = env => {

  const IS_DEV = !!env.dev;

  return {
    entry: {
      main: path.join(dirApp, 'index')
    },

    resolve: {
      modules: [
        dirNode,
        dirApp,
        dirStyles,
        dirPublic
      ]
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              compact: true
            }
          }
        },

        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: IS_DEV
              }
            },
          ]
        },

        {
          test: /\.scss/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: IS_DEV
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: IS_DEV,
                sassOptions: {
                  includePaths: [dirPublic]
                }
              }
            }
          ]
        },

        {
          test: /\.(png|jpe?g|gif|ico)$/i,
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        },

        {
          test: /\.svg$/,
          use: [
            'raw-loader'
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({ IS_DEV }),
      new HtmlWebpackPlugin({ 
        template: './public/index.html',
        filename: 'index.html',
      }),
      new ImageMinimizerPlugin({
        minimizerOptions: {
          plugins: [
            [
              'imagemin-svgo',
              {
                plugins: [
                  {
                    removeViewBox: false,
                    removeXMLNS: true
                  }
                ]
              }
            ]
          ]
        }
      }),
    ],

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
      }
    }
  }
}