// Explanation of each configuration item You can find it in https://cli.vuejs.org/config/

const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
// 打包去掉console
const TerserPlugin = require('terser-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, './', dir)
}
const projectName = '后台管理系统'
module.exports = {
  /**
   * You can set by yourself according to actual condition
   * You will need to set this if you plan to deploy your site under a sub path,
   * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then assetsPublicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail https://cli.vuejs.org/config/#baseurl
   */
  outputDir: 'dist',
  assetsDir: './foadmin/static',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'https://zhair.hfsmrz.cn/foadminserver/',
        // target: 'http://localhost:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  configureWebpack: config => {
    const options = {
      // We provide the app's title in Webpack's name field, so that
      // it can be accessed in index.html to inject the correct title.
      name: projectName,
      externals: {
        'vue': 'Vue',
        'element-ui': 'ELEMENT',
        'axios': 'axios',
        'echarts': 'echarts',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex'
      },
      resolve: {
        alias: {
          '@': resolve('src')
        }
      },
      plugins: [
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        }),
        new SkeletonWebpackPlugin({
          webpackConfig: {
            entry: {
              app: path.join(__dirname, './src/skeleton.js')
            }
          },
          minimize: true,
          quiet: true
        })
      ]
    }
    if (process.env.NODE_ENV === 'production') {
      // 打包自动生成zip包
      options.plugins.push(new FileManagerPlugin({
        onEnd: {
          archive: [
            { source: './dist', destination: './dist/' + process.env.NODE_ENV + '.zip' }
          ]
        }
      }))
      // 删除console
      options.optimization = {
        minimizer: [new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        })]
      }
    }
    return options
  },
  chainWebpack: config => {
    /* config
      .when(process.env.NODE_ENV !== 'development',
        config => config.plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
      ) */
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // 只打包初始时依赖的第三方
                },
                elementUI: {
                  name: 'chunk-elementUI', // 单独将 elementUI 拆包
                  priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                  test: /[\\/]node_modules[\\/]element-ui[\\/]/
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
