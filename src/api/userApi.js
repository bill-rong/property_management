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
  return request({
    url: '/api/user/update/password',
    method: 'post',
    data: data
  })
}

// 修改个人信息
export function updateInfo(data) {
  return request({
    url: '/api/user/update/info',
    method: 'post',
    data: data
  })
}
