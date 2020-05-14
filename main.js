import Vue from 'vue'
import App from './App'
import {request} from './request/request.js'
import uniIcons from "@/components/uni-icons/uni-icons.vue"

Vue.prototype.$request = request

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
