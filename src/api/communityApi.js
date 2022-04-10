import request from '@/utils/request'

// 获取小区信息
export function getCommunity() {
  return request({
    url: '/api/community/get/community',
    method: 'get'
  })
}

// 更新小区信息
export function updateCommunity(data) {
  return request({
    url: '/api/community/update/community',
    method: 'put',
    data: data
  })
}

// 获取楼信息
export function getBuilding() {
  return request({
    url: '/api/community/get/building',
    method: 'get'
  })
}

// 获取房信息
export function getRoom() {
  return request({
    url: '/api/community/get/room',
    method: 'get'
  })
}

export function getRoomName() {
  return request({
    url: '/api/community/get/room/name',
    method: 'get'
  })
}
