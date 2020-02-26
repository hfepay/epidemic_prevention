import { permissionRouter as asyncRoutes, commonRouter as constantRoutes } from '@/router'
import { getUserMenu, getRouter } from '../../permission'
import router from '../../router'
import { component } from '../../router/all.router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

// 权限列表转菜单列表
function permissionsToMenus(permissions) {
  return permissions.map(permissionToMenu)
}

// 单个权限转菜单
function permissionToMenu(permission) {
  const per = {
    ...permission,
    meta: { ...component[permission.name]?.meta, ...permission }
  }
  if (permission.isMenu == '1') {
    if (Array.isArray(permission.children)) {
      per.children = permission.children.map(permissionToMenu)
    }
  } else {
    delete per.children
  }
  return per
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  menu: [],
  permission: []
}

const mutations = {
  SET_MENU: (state, menu) => {
    state.menu = menu
  },
  SET_PERMISSION: (state, data) => {
    state.permission = data
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  addRoutes({ commit }, data) {
    return new Promise((resolve, reject) => {
      const routers = getRouter(data)
      try {
        router.addRoutes(routers)
      } catch (e) {
        console.warn(e)
      }
      commit('SET_PERMISSION', data)
      const menus = permissionsToMenus(routers)
      commit('SET_MENU', menus)
      resolve(routers)
    })
  },
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
