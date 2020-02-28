const router = [{
  path: '/',
  component: () => import('../../views/layout'),
  redirect: '/dashboard',
  meta: { title: '首页', icon: 'dashboard', affix: true },
  children: [
    {
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/masksAndTemp'),
      meta: { title: '口罩与体温', icon: 'dashboard', affix: true }
    },
    {
      path: 'masks',
      name: 'Masks',
      component: () => import('@/views/dashboard/masks'),
      meta: { title: '口罩', icon: 'dashboard', affix: true }
    },
    {
      path: 'temp',
      name: 'Temp',
      component: () => import('@/views/dashboard/temp'),
      meta: { title: '体温', icon: 'dashboard', affix: true }
    }
  ]
}]
export default router
