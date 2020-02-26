import request from '@/utils/request'
import Constants from '../constants'
import MD5Utils from '../utils/security/MD5Utils'

function getEncryptPassword(password) {
  const salt = '1a2b3c4d'
  return MD5Utils.encrypt(MD5Utils.encrypt(password + salt) + salt)
}

class LoginApi {
  login(data) {
    data = {
      ...data,
      grant_type: Constants.loginConstant.grant_type,
      scope: Constants.loginConstant.scope,
      client_id: Constants.loginConstant.client_id,
      client_secret: Constants.loginConstant.client_secret,
      password: getEncryptPassword(data.password)
    }
    // return request.post('/oauth/token', {}, { headers: { 'content-type': 'application/x-www-form-urlencoded' }, params: data })
    return Promise.resolve({ data: {
      'access_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzQzMzU0NjAsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsi6LaF57qn566h55CG5ZGYIl0sImp0aSI6ImM1N2E3MDgwLWVmNTUtNDU2NS1iM2NmLTBiNWJmOThkZWUwZiIsImNsaWVudF9pZCI6ImFwcCIsInNjb3BlIjpbImFwcCJdfQ.OWahz8yZJAJZAByKJQBb1Y0vP4BUhnXhsEdbhkdHF3Q',
      'token_type': 'bearer',
      'refresh_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImFwcCJdLCJhdGkiOiJjNTdhNzA4MC1lZjU1LTQ1NjUtYjNjZi0wYjViZjk4ZGVlMGYiLCJleHAiOjE1NzU2MzE0NjAsImF1dGhvcml0aWVzIjpbIui2hee6p-euoeeQhuWRmCJdLCJqdGkiOiJlN2I3OTRjMS00YjM1LTQwYTItOTU0My0wNmY4MjUyODIzZDYiLCJjbGllbnRfaWQiOiJhcHAifQ.fIu2n6DTQVCJkqAvc9vonW6d-lTVXiICEnJ53c5OJ8w',
      'expires_in': 1240455,
      'scope': 'app',
      'jti': 'c57a7080-ef55-4565-b3cf-0b5bf98dee0f'
    }})
  }

  logout() {
    return request.delete('/user/logout')
  }

  getInfo() {
    // return request.get('/airAccount/backstageAccount/getCurUser')
    return Promise.resolve({
      'code': 1,
      'message': '操作成功',
      'data': {
        'id': '1',
        'acorpId': null,
        'phone': '13444444444',
        'departmentId': null,
        'nickname': '111',
        'loginName': null,
        'avatar': null,
        'realName': '超级管理员',
        'username': 'admin',
        'password': '54031e1496475e772e64dd9067afcd5f',
        'roles': ['超级管理员']
      }
    })
  }
}

export default new LoginApi()

