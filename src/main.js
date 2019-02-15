import Vue from 'vue'
import App from './App'
import router from './router'

//  引入全局css样式
import './assets/css/global.css'

// 引入element-ui
import ElementUI from 'element-ui'

// 引入‘图标库’css样式文件
import './assets/fonts/iconfont.css'

// 引入axios
import axios from 'axios'
// 给axios配置（访问根地址、vue之$http成员）
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
// 拦截器，给axios设置Authorization的token信息
axios.interceptors.request.use(
  config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
Vue.prototype.$http = axios
// 给element-ui注册事件和方法
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
