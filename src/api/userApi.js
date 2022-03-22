import request from '@/utils/request'

// 获取用户信息
export function getUser() {
    return request({
        url: '/api/user/getUser/',
        method: 'get',
    })
}

// 登录
export function login(loginForm, ident) {
  let url = '';
  if (ident == '1') {
    url = '/api/user/login/';
  } else if (ident == '2') {
    url = '/api/admin/login/';
  }
    return request({
        url: url,
        method: 'post',
        data: loginForm
    })
}
