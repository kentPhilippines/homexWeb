import Vue from 'vue'
import App from './App'
import {router} from './router/index';
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import httpRequest from '@/utils/httpRequest'
import '@/mock'
import axios from 'axios'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import Mixin from '@/common/mixins'
import VueBus from 'vue-bus';
process.env.MOCK && require("./mock/index.js")

Vue.prototype.$axios = axios
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Antd)
Vue.use(VueClipboard)
Vue.use(VueBus)

Vue.mixin(Mixin); //注册全局混入

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
