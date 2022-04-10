import request from '@/utils/request'

// 获取小区信息
export function getAnnouncement() {
  return request({
    url: '/api/affairs/announcement/get',
    method: 'get'
  })
}