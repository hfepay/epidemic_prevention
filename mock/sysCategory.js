// api.js
import Mock from 'mockjs'
import Responce from './Responce'
import UrlUtils from './UrlUtils'
const BASEURL = process.env.VUE_APP_MOCK_URL + '/setting/sysCategory'
const { pageUrl, addUrl, updateUrl, delAndGetUrl, listUrl } = UrlUtils.getUrl(BASEURL)
const item = {
  'id|1-999999': 999,
  'companyId|1-999999': 999,
  'categoryCode|1-999999': 999,
  'categoryValue|1-999999': 999,
  'categoryName': '@cword(5)',
  'account': '@word(6,15)',
  'describle': '@cword(6,15)',
  'hasChildren': true,
  'name': '@cname',
  'mobileNo': '18888888888',
  'email': '@email',
  'birthday': '@date("yyyy-MM-dd")',
  'sex|1-3': 2,
  'deptId|1-999999': 999,
  'deptName': '@cword(5)',
  'status': 'birthday',
  'lastLoginTime': '@date("yyyy-MM-dd HH:mm:ss")',
  'createBy': '@date("yyyy-MM-dd HH:mm:ss")'
}
Mock.mock(pageUrl, 'get',
  Responce.SUCCESS(
    { 'total': '10', 'size': 10, 'pages': '10', 'current': 1, 'records|10': [
      item
    ] }
  )
)
Mock.mock(listUrl, 'get',
  Responce.SUCCESS(
    [
      item
    ]
  )
)

// 详情
Mock.mock(delAndGetUrl, 'get',
  Responce.SUCCESS(
    item
  )
)
// 新增
Mock.mock(addUrl, 'post',
  Responce.SUCCESS()
)
// 修改
Mock.mock(updateUrl, 'put',
  Responce.SUCCESS()
)
// // 删除
Mock.mock(delAndGetUrl, 'delete',
  Responce.SUCCESS()
)

