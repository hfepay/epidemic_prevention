import Vue from 'vue'

import moment from 'dayjs'
import ElementUI from 'element-ui'

import '@/styles/index.scss' // global css
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import Utils from './utils/common'
import './utils/error-handle'
/* 全局常量*/
import GlobalConstants from './constants'
// 自定义指令
import '@/directive'
// 图片预览插件
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview, {
  index: 9999
})
// mock
// import '../mock'

// 全局过滤器
import Filters from '@/filter'
for (const condition in Filters) {
  Vue.filter(condition, Filters[condition])
}
/* 引入公共组件*/
import * as CommonComponents from '@/components'
const components = CommonComponents.default || CommonComponents
Object.keys(components).forEach(component => {
  Vue.component(component, components[component])
})
import Print from '@/utils/print' // 引入附件的js文件
Vue.use(Print) // 注册
Vue.use(ElementUI, { size: 'mini' })
Vue.config.productionTip = process.env.NODE_ENV === 'development'
Vue.prototype.$utils = Utils
Vue.prototype.$Contants = GlobalConstants
Vue.prototype.$moment = moment

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
