import Vue from 'vue'
import App from './App'
import 'common/stylus/index.styl'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/home/main', 'pages/index/main'],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#266e0a',
      navigationBarTitleText: '忆杭网',
      navigationBarTextStyle: '#fff',
      backgroundColor: '#f2f2f2'
    },
    tabBar: {
      list: [{
        selectedIconPath: 'static/images/footer-nav/nav1c@3x.png',
        iconPath: 'static/images/footer-nav/nav1@3x.png',
        pagePath: 'pages/home/main',
        text: '首页'
      },
      {
        selectedIconPath: 'static/images/footer-nav/nav2c@3x.png',
        iconPath: 'static/images/footer-nav/nav2@2x.png',
        pagePath: 'pages/index/main',
        text: '分类'
      },
      {
        selectedIconPath: 'static/images/footer-nav/nav3c@3x.png',
        iconPath: 'static/images/footer-nav/nav3@3x.png',
        pagePath: 'pages/index/main',
        text: '购物车'
      },
      {
        selectedIconPath: 'static/images/footer-nav/nav4c@3x.png',
        iconPath: 'static/images/footer-nav/nav4@2x.png',
        pagePath: 'pages/index/main',
        text: '我的'
      }]
    }
  }
}
