import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg组件

// regist globally
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
const all = requireAll(req)
export const allIcons = all.map(item => item.default.id)
