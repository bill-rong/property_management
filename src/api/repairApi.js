import request from '@/utils/request'

// 报修上报
export function addRepair(data) {
  return request({
    url: '/api/repair/report',
    method: 'post',
    data: data
  })
}

// 处理维修
export function handleRepair(data) {
  return request({
    url: '/api/repair/handle',
    method: 'put',
    data: data
  })
}

// 获取未处理报修
export function getUnHandle() {
  return request({
    url: '/api/repair/get/unHandle',
    method: 'get'
  })
}

// 获取已处理报修
export function getHandle() {
  return request({
    url: '/api/repair/get/handle',
    method: 'get'
  })
}

// 获取住户报修
export function getReportsByTel(tel) {
  return request({
    url: '/api/repair/get/repair',
    method: 'get',
    params: tel
  })
}