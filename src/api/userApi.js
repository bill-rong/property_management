import request from '@/utils/request'

// 获取用户信息
export function getUser() {
    return request({
        url: '/api/user/getUser/',
        method: 'get',
    })
}


export function login(loginForm) {
    return request({
        url: '/api/user/login/',
        method: 'post',
        data: loginForm
    })
}