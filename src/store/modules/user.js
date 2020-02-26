import SysUserApi from '../../api/module/account/AccountSysUserApi'

const user = {
  state: {
    token: '',
    userInfo: {},
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERINFO: (state, data) => {
      state.userInfo = data
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        const { account, password } = userInfo
        SysUserApi.login({ account, password }).then(response => {
          const { token } = response.data
          const data = response.data
          commit('SET_TOKEN', token)
          commit('SET_USERINFO', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        SysUserApi.info().then(response => {
          const data = response.data
          commit('SET_USERINFO', data)
          /* if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }*/
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        SysUserApi.logout().then(() => {
          dispatch('FedLogOut')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        localStorage && localStorage.clear()
        sessionStorage && sessionStorage.clear()
        resolve()
      })
    },
    // 获取用户菜单
    GetMenu({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        SysUserApi.getMenu().then(async(res) => {
        // 根据返回菜单进行路由匹配
          await dispatch('permission/addRoutes', res.data)
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default user
