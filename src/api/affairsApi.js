import request from '@/utils/request'

// 获取公告信息
export function getAnnouncement() {
  return request({
    url: '/api/affairs/announcement/get',
    method: 'get'
  })
}

// 发布公告
export function addAnnouncement(data) {
  return request({
    url: '/api/affairs/announcement/add',
    method: 'post',
    data: data
  })
}

// 发布公告
export function deleteAnnouncement(id) {
  return request({
    url: '/api/affairs/announcement/delete',
    method: 'delete',
    params: id
  })
}

///////////////////////////// 宠物

// 获取所有宠物
export function getPet() {
  return request({
    url: '/api/affairs/pet/get',
    method: 'get'
  })
}


/////////////////////////// 访客

// 获取所有访客
export function getVisitor() {
  return request({
    url: '/api/affairs/visitor/get',
    method: 'get'
  })
}

// 删除访客
export function deleteVisitor(id) {
  return request({
    url: '/api/affairs/visitor/delete',
    method: 'delete',
    params: id
  })
}


//////////////// 健康

// 获取所有健康信息
export function getHealthy() {
  return request({
    url: '/api/affairs/healthy/get',
    method: 'get'
  })
}

// 删除健康信息
export function deleteHealthy(id) {
  return request({
    url: '/api/affairs/healthy/delete',
    method: 'delete',
    params: id
  })
}