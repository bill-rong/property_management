import request from '@/utils/request'

export function addRepair(data) {
  return request({
    url: '/api/complaint/report',
    method: 'post',
    data: data
  })
}

export function getComplaintUnHandle() {
  return request({
    url: '/api/complaint/get/unHandle',
    method: 'get'
  })
}

export function getComplaintHandle() {
  return request({
    url: '/api/complaint/get/handle',
    method: 'get'
  })
}

export function complaintHandle(data) {
  return request({
    url: '/api/complaint/handle',
    method: 'put',
    data: data
  })
}

// 获取住户投诉
export function getComplaintByTel(tel) {
  return request({
    url: '/api/complaint/get/complaint',
    method: 'get',
    params: tel
  })
}