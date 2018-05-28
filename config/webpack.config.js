const path = require('path')
const merge = require('webpack-merge')
const packagejson = require('../package.json')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const parts = require('./webpack.parts.config')

let main = packagejson.main
main = main.replace(/^.*[\\/]/, '')

const libraryName = main.substring(0, main.lastIndexOf('.'))

const paths = {
  base: path.resolve('src'),
  app: path.resolve('src/index.ts'),
  dist: path.resolve('lib'),
}

const libConfig = merge([
  {
    target: 'web',
    context: paths.base,
    entry: {
      app: paths.app,
    },
    output: {
      library: libraryName,
      filename: libraryName + '.js',
      libraryExport: 'default',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      path: paths.dist,
    },
    externals: {
      phaser: 'phaser',
    },
    resolve: {
      modules: [path.resolve('./node_modules'), path.resolve('./src')],
      extensions: ['.json', '.js', '.ts'],
    },
    plugins: [new CaseSensitivePathsPlugin()],
  },

  parts.loadJs({}),

  parts.sourceMaps('source-map'),

  parts.cleanup([paths.dist]),

  parts.attachRevision(),
])

module.exports = env => {
  const config = merge(libConfig)

  return config
}
