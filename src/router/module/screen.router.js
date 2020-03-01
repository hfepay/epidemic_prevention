const moduleName = '/screen'

const router = [{
  path: moduleName,
  component: () => import('../../views/layout'),
  meta: { title: '疫情筛查', icon: 'tree-table' },
  children: [
    {
      path: 'record',
      name: 'Record',
      component: () => import(`@/views${moduleName}/record`),
      meta: { title: '筛查记录' }
    }
  ]
}]
export default router
