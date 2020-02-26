const moduleName = '/setting'

const router = [{
  path: moduleName,
  component: () => import('../../views/layout'),
  meta: { title: '基本设置', icon: 'tree-table' },
  children: [
    {
      path: 'account',
      name: 'Account',
      component: () => import(`@/views${moduleName}/account`),
      meta: { title: '用户账号' }
    },
    {
      path: 'dictionary',
      name: 'Dictionary',
      component: () => import(`@/views${moduleName}/dictionary`),
      meta: { title: '字典管理' }
    },
    /* {
      path: 'resource',
      name: 'Resource',
      component: () => import(`@/views${moduleName}/resource`),
      meta: { title: '资源管理' }
    },*/
    {
      path: 'role',
      name: 'Role',
      component: () => import(`@/views${moduleName}/role`),
      meta: { title: '角色管理' }
    },
    {
      path: 'merchant',
      name: 'Merchant',
      component: () => import(`@/views${moduleName}/merchant`),
      meta: { title: '商户管理' }
    },
    {
      path: 'add-role',
      name: 'AddRole',
      hidden: true,
      component: () => import(`@/views${moduleName}/role/RoleEdit`),
      meta: { title: '新增角色', noCache: true, showTag: false, requireAuth: false }
    },
    {
      path: 'edit-role/*',
      name: 'EditRole',
      hidden: true,
      component: () => import(`@/views${moduleName}/role/RoleEdit`),
      meta: { title: '编辑角色', noCache: true, showTag: false, requireAuth: false }
    },
    {
      path: 'password',
      name: 'Password',
      component: () => import(`@/views${moduleName}/password`),
      meta: { title: '修改密码' }
    },
    {
      path: 'dept',
      name: 'Dept',
      component: () => import(`@/views${moduleName}/dept`),
      meta: { title: '部门管理' }
    },
    {
      path: 'menuConfig',
      name: 'MenuConfig',
      component: () => import(`@/views${moduleName}/menuConfig`),
      meta: { title: '页面菜单' }
    }
  ]
}]
export default router
