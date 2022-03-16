import request from '@/utils/request'

// 获取用户信息
export function getUser() {
    return request({
        url: '/api/user/getUser/',
        method: 'get',
    })
}