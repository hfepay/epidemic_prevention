import Vue from 'vue'
import store from '../store'

const permission = Vue.directive('permission', {
  inserted: (el, binding, vnode, oldVnode) => {
    // 权限控制到按钮级别 根据角色控制
    const roles = store.getters.roles
    const value = binding.value
    if (!value.includes(roles[0])) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
})

export default permission
