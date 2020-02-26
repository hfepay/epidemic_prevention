// 自动扫描module文件夹下的路由文件
let allRouters = []
const data = require.context('./module', false, /\.router\.js$/)
data.keys().forEach(item => {
  allRouters = [...allRouters, ...data(item).default]
})

// 扁平化
const flatChildren = (arr) => {
  if ([].flatMap) {
    return arr.flatMap(item => item.children)
  } else {
    let result = []
    arr.forEach(item => {
      if (Array.isArray(item.children)) {
        result = result.concat(flatChildren(item.children))
      } else {
        result.push(item)
      }
    })
    return result
  }
}

// 特殊组件
const CommonComponent = {
  // 布局
  'Layout': {
    component: () => import('../views/layout'),
    meta: { title: '基本布局' }
  },
  // 外链
  'Link': {
    component: () => import('../views/layout'),
    meta: { title: '外链' }
  },
  // 空路由: 用于多级菜单
  'Blank': {
    component: () => import('../views/layout/blank-router-view'),
    meta: { title: '空路由' }
  }
}

const obj = {}
flatChildren(allRouters).forEach(item => {
  obj[item.name] = item
})

export const component = Object.assign({}, CommonComponent, obj)

export const pageOptions = Object.keys(component).map(key => {
  return {
    label: component[key].meta.title,
    value: key
  }
})
