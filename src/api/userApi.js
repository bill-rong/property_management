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
  let url = ident == '1' ? '/api/user/login/' : ident == '2' ? '/api/admin/login/' : '';
    return request({
        url: url,
        method: 'post',
        data: loginForm
    })
}
