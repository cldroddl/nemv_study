// vue.config.js
// 처음에 생성되지 않는 파일이나 필요에 의해 작성
// vue-cli 3.x 버전부터 웹팩 설정은 webpack.config.js가 아닌 vue.config.js에 작성한다

const path = require('path')
// const webpack = require('webpack')

module.exports = {
  // backend에서 웹페이지를 보여줄 경우 여기에서 backend쪽으로 output을 맞춰줘도 되고
  // backend에서 app.use(express.static(path.join(__dirname, 'frontend', 'dist')))
  // 로 frontend 의 경로를 static 리소스 폴더로 지정해 줘도 된다.
  // 둘다 복사는 yarn build일때만 복사가 된다.
  outputDir: path.resolve(__dirname, '../backend/public'),
  devServer: {
    // 개발시 vue 와 spring 서버를 따로 돌릴때 필요하다.
    // proxy: 'http://localhost:8080', // location.href 로 할때는 제대로 안되네.
    port: process.env.VUE_APP_PORT || 8081
    // 위의 설정으론 cors 문제 없나?
    // proxy: {
    //     '/excel': {
    //         target: 'http://localhost:8080',
    //         ws: true,
    //         changeOrigin: true
    //     },
    //     '/api': {
    //         target: 'http://localhost:8080',
    //         ws: true,
    //         changeOrigin: true
    //     }
    // }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/'), // Default
        stylesPath: path.resolve(__dirname, 'src/assets/styles')
      }
    }
    // plugins: [
    //     new webpack.ProvidePlugin({
    //         $: 'jquery',
    //         jQuery: 'jquery',
    //        'window.jQuery': 'jquery',
    //        jQuery: 'jquery'
    //     })
    // ]
    // module 부분은 less 파일일 경우 설정이 필요한듯
    // less 파일의 경우 기본으로 설정되어 있으므로
    // yarn add less less-loader --dev
    // 로 설치만 해 주면 된다다
    // module: {
    //   rules: [
    //     {
    //       test: /\.less$/,
    //       use: [
    //         'less-loader'
    //       ]
    //     }
    //   ]
    // }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '마이 스터디'
        return args
      })
  }
}
