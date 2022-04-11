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