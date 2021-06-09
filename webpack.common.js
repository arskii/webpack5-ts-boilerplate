const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'src');
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
        dirPublic
      ],
      extensions: ['.tsx', '.ts', '.js']
    },

    module: {
      rules: [
        {
          test: /\.(ts|js)x$/i,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
                presets: [["@babel/preset-env", { targets: { node: "8" } }]]
              }
            },
            "ts-loader"
          ],
          exclude: /node_modules/
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
                  includePaths: [dirApp]
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
      new HtmlWebpackPlugin({ template: './public/index.html' }),
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