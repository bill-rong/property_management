import request from '@/utils/request'

// 获取小区信息
export function addRepair(data) {
  return request({
    url: '/api/repair/report',
    method: 'post',
    data: data
  })
}