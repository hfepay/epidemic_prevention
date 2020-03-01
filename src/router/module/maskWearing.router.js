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
    }
  ]
}]
export default router
