/*
 * @Descripttion: 
 * @version: 
 * @Author: 
 * @Date: 2019-11-07 17:03:29
 * @LastEditors  : wpp
 * @LastEditTime : 2020-01-10 14:50:58
 */
const ip = 'http://192.168.5.133'; // 8009
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/microStatic/' : '/',
    runtimeCompiler: true,
    devServer: {
      proxy: {
        '/socket-server/': { // 不走网关了 pad不可以用
          target: 'ws://192.168.5.133',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            '^/socket-server': '',
          }
        },
        '/api/common-server/': {
          target: ip,
          ws: false,
          changeOrigin: true,
          pathRewrite: {
            // '^/api/common-server/': '',
          }
        },
        '/thing/image': {
          target: ip,
          ws: false,
          changeOrigin: true,
          pathRewrite: {
            '^/thing/image': '/thing/image',
          }
        },
        '/api/auth-server': {
          target: ip,
          ws: false,
          changeOrigin: true,
          pathRewrite: {
            '^/api/': '',
          }
        },
        '/api/': {
          target: ip,
          ws: false,
          changeOrigin: true,
          pathRewrite: {
            // '^/api/': '',
          }
        },
      }
    },
    css: {
      loaderOptions: {
        less: {
          modifyVars: {
            'primary-color': '#1DA57A',
            'link-color': '#1DA57A',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true
        },
        postcss: {
          plugins: [
            require('postcss-pxtorem')({
              rootValue: 16, 
              propList: ['*']
            }),
            require('autoprefixer')()
          ]
        }
      }
    }
  }