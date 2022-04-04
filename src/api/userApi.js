import request from '@/utils/request'

// 获取用户信息
export function getUser(tel) {
    return request({
        url: '/api/user/get/user?tel=' + tel,
        method: 'get'
    })
}

// 登录
export function login(loginForm, ident) {
  let url = ident == '1' ? '/api/user/login/' : ident == '2' ? '/api/admin/login/' : '';
    return request({
        url: url,
        method: 'post',
        data: loginForm
    })
}

// 修改密码
export function updatePassword(data) {
  console.log("1111s");
  return request({
    url: '/api/user/update/password',
    method: 'post',
    data: data
  })
}
