const moduleName = '/devices'

const router = [{
  path: moduleName,
  component: () => import('../../views/layout'),
  meta: { title: '设备管理', icon: 'tree-table' },
  children: [
    {
      path: 'cameras',
      name: 'Cameras',
      component: () => import(`@/views${moduleName}/cameras`),
      meta: { title: '摄像头管理' }
    },
    {
      path: 'systems',
      name: 'Systems',
      component: () => import(`@/views${moduleName}/systems`),
      meta: { title: '系统设备管理' }
    }
  ]
}]
export default router
