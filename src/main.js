import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
// 去掉警告用的
import passive from 'default-passive-events'
// 导入全局样式表
import '@/assets/css/global.css'
// 导入全局过滤器
import '@/filters/index.js'
// 导入api
import api from '@/api/index.js'

// 全局共享文件和方法，暂时不用
// import global from './common.vue'
// Vue.prototype.$common = global
// 配置请求的根路径
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.withCredentials = true
// axios.interceptors.request.use(config => {
//   if (localStorage.getItem('token')) {
//     config.headers.xhrFields = { withCredentials: true }
//     config.headers.Authorization = '0e69715f0db04d007ad77e5f0190548f6ccaffa1ab55b9564f4a5eca150e950a993166e004087dd3e8b227a9b82b774db39b76da38ae7af4f60b9709866c058cba61b578459204fca89fe7c55eac81f3'
//   }
//   return config
// },
// error => {
//   return Promise.reject(error)
// })

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$api = api

new Vue({

  router,
  store,
  passive,
  render: h => h(App)
}).$mount('#app')
