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

// 获取所有宠物
export function getPet() {
  return request({
    url: '/api/affairs/pet/get',
    method: 'get'
  })
}