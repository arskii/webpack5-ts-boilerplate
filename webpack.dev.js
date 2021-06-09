const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = env => {
  return merge(common(env), {
    mode: 'development',
    devtool: 'eval-cheap-source-map',
    
    output: {
      pathinfo: true,
      publicPath: '/',
      filename: '[name].bundle.js'
    },
    
    devServer: {
      compress: true,
      historyApiFallback: true,
      port: 3000,
      open: true,
      watchContentBase: true,
      hot: true,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  })
}