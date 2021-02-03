import Vue from 'vue'
import App from './App'
import {http} from '@/static/js/request.js'; // 全局挂载引入

Vue.config.productionTip = false
Vue.prototype.$http = http
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
