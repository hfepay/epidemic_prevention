const router = [{
  path: '/',
  component: () => import('../../views/layout'),
  redirect: '/dashboard',
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }
  ]
}]
export default router
