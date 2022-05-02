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

// 获取所有管理员信息
export function getAll() {
  return request({
    url: '/api/admin/get/all',
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

// 修改密码
export function addAdmin(data) {
  return request({
    url: '/api/admin/add',
    method: 'post',
    data: data
  })
}

// 修改权限
export function updatePermission(data) {
  return request({
    url: '/api/admin/update/permission',
    method: 'put',
    data: data
  })
}

// 删除管理员
export function deleteAdmin(tel) {
  return request({
    url: '/api/admin/delete?tel=' + tel,
    method: 'delete'
  })
}
