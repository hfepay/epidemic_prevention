const getters = {
  theme: state => state.settings.theme,
  loading: state => state.app.loading,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  userInfo: state => state.user.userInfo,
  roles: state => state.user.roles,
  menu: state => state.permission.menu,
  permission: state => state.permission.permission,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  projectName: () => '贵州省机场集团“黔易订”管理系统'
}
export default getters
