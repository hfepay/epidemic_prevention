const moduleName = '/maskWearing'

const router = [{
  path: moduleName,
  component: () => import('../../views/layout'),
  meta: { title: '口罩佩戴管理', icon: 'tree-table' },
  children: [
    {
      path: 'snapShot',
      name: 'SnapShot',
      component: () => import(`@/views${moduleName}/snapShot`),
      meta: { title: '抓拍记录' }
    },
    {
      path: 'realTime',
      name: 'RealTime',
      component: () => import(`@/views${moduleName}/realTime`),
      meta: { title: '实时监控 ' }
    }
  ]
}]
export default router
