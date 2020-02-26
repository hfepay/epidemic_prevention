import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { permissionRouter, commonRouter } from './router'
import { component } from './router/all.router'

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login', '/401', '/404'] // 不重定向白名单

// 判断刷新标志
let freshFlag = true

function generatorRouters() {
  const routers = getRouter(store.getters.permission)
  router.addRoutes(routers)
}

setTimeout(_ => {
  // 防止页面点击返回死循环
  freshFlag = false
}, 0)

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.getters.token) {
    // // todo 出现卡死情况，注释掉先
    // if (freshFlag) {
    //   // 如果是刷新
    //   generatorRouters()
    // }
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else if (freshFlag && to.redirectedFrom) {
      freshFlag = false
      next({ path: to.redirectedFrom, replace: true })
    } else if (whiteList.indexOf(to.path) >= -1) {
      next()
    } else {
      if (!store.getters.userInfo) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || '获取用户信息失败，请重新登录！')
            next({ path: '/' })
          })
        })
      } else {
        /**
         * 判断当前用户是否有进入此页面的权限
         * 没有权限跳转401
         */if (!hasPermission(to)) {
          next({ path: '/401' })
        }
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

// 根据name判断是否有权限进入
const hasPermission = (router) => {
  if (process.env.VUE_APP_NO_AUTH === 'Y') {
    return true
  }
  const menu = store.getters.menu
  const name = router.name
  const requireAuth = router.meta.requireAuth
  const arr = Object.is(false, requireAuth) || [...commonRouter, ...menu].map(item => item.children ? item.children : item)
  let data = []
  if (arr === true) {
    return true
  }
  if (arr.flat) {
    data = arr.flat()
  } else {
    arr.forEach(item => {
      Array.isArray(item) ? data = [...data, ...item] : data.push(item)
    })
  }
  return data.map(item => item.name).includes(name)
}
// 动态添加路由
export const getRouter = (routers) => {
  const result = []
  const btnPermission = []
  routers.forEach(router => {
    const com = component[router.name]
    if (router.isMenu != '0') {
      const ch = {
        ...Object.assign({}, com, router),
        meta: { ...Object.assign({}, com?.meta, router) }
      }
      if (Array.isArray(router.children) && router.children.length > 0) {
        ch.children = getRouter(router.children)
      } else {
        delete ch.children
      }
      result.push(
        ch
      )
    } else {
      btnPermission.push(router)
    }
  })
  return result
}

// 根据登录用户动态匹配菜单
export const getUserMenu = (data, options = {
  backEndUrlKey: 'url', // 后端url键名
  frontEndUrlKey: 'path', // 前端url键名
  backEndChildrenKey: 'child', // 后端子节点键名
  frontEndChildrenKey: 'children'// 前端子节点键名
}) => {
  const menu = []
  // var1 一级菜单， var2 二级菜单， var3 按钮
  data.forEach(var1 => {
    const var1_result = permissionRouter.find(item => item[options.frontEndUrlKey] === var1[options.backEndUrlKey])
    // 首页做特殊处理
    if (var1[options.backEndUrlKey] === '/dashboard' && var1_result) {
      menu.push(var1_result)
      return
    }
    let children = []
    if (var1_result) {
      // 赋值title
      var1_result.meta.title = var1.name
      const commonRouter = var1_result[options.frontEndChildrenKey].filter(item => Object.is(false, item.meta.requireAuth))
      const permissionRouter = var1_result[options.frontEndChildrenKey].filter(item => !Object.is(false, item.meta.requireAuth))

      children = [...children, ...commonRouter]
      var1[options.backEndChildrenKey].forEach(var2 => {
        const var2_result = permissionRouter.find(item => new RegExp(`^/?${item[options.frontEndUrlKey]}$`).test(var2[options.backEndUrlKey]))
        if (var2_result) {
          var2_result.meta.title = var2.name
          children.push(var2_result)
        }
      })
      var1_result.children = children
      menu.push(var1_result)
    }
  })
  return [...commonRouter, ...menu]
}
