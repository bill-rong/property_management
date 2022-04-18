import request from '@/utils/request'

// 修改密码
export function updatePassword(data) {
  return request({
    url: '/api/admin/update/password',
    method: 'put',
    data: data
  })
}

// 获取管理员信息
export function getInfo(data) {
  return request({
    url: '/api/admin/get/info?tel=' + data,
    method: 'get'
  })
}

// 修改个人信息
export function updateInfo(data) {
  return request({
    url: '/api/admin/update/info',
    method: 'post',
    data: data
  })
}

// 修改密码
export function updatePwd(data) {
  return request({
    url: '/api/admin/update/password',
    method: 'post',
    data: data
  })
}
