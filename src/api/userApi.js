import request from '@/utils/request'

// 获取用户信息
export function getUser(tel) {
    return request({
        url: '/api/user/get/user?tel=' + tel,
        method: 'get'
    })
}

// 判断用户是否存在
export function userIsExist(tel) {
  return request({
      url: '/api/user/exist',
      method: 'get',
      params: tel
  })
}

// 添加用户
export function addUser(data) {
  return request({
      url: '/api/user/add',
      method: 'post',
      data: data
  })
}

// 获取所有用户信息
export function getAllUser() {
  return request({
      url: '/api/user/get/all/user',
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

// 重置密码
export function resetPassword(data) {
  return request({
    url: '/api/user/reset/password',
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

// 删除用户
export function deleteUser(data) {
  return request({
    url: '/api/user/delete',
    method: 'delete',
    params: data
  })
}

// 添加家庭成员
export function addFamily(data) {
  return request({
    url: '/api/user/add/family',
    method: 'post',
    data: data
  })
}

// 获取家庭成员
export function getFamilyByTel(tel) {
  return request({
    url: '/api/user/get/family',
    method: 'get',
    params: tel
  })
}

// 获取家庭成员
export function getFamilyAll() {
  return request({
    url: '/api/user/get/all/family',
    method: 'get'
  })
}

// 添加家庭成员
export function updateFamily(data) {
  return request({
    url: '/api/user/update/family',
    method: 'put',
    data: data
  })
}

// 获取家庭成员
export function deleteFamily(id) {
  return request({
    url: '/api/user/delete/family',
    method: 'delete',
    params: id
  })
}