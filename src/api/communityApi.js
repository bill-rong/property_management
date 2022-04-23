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

// 添加楼层
export function addBuilding(data) {
  return request({
    url: '/api/community/add/building',
    method: 'post',
    data: data
  })
}

// 删除房信息
export function deleteBuilding(data) {
  return request({
    url: '/api/community/delete/building',
    method: 'delete',
    params: data
  })
}

// 获取房信息
export function getRoom() {
  return request({
    url: '/api/community/get/room',
    method: 'get'
  })
}

// 添加房信息
export function addRoom(data) {
  return request({
    url: '/api/community/add/room',
    method: 'post',
    data: data
  })
}

// 删除房信息
export function deleteRoom(data) {
  return request({
    url: '/api/community/delete/room',
    method: 'delete',
    params: data
  })
}

// 获取所有房名
export function getRoomName() {
  return request({
    url: '/api/community/get/room/name',
    method: 'get'
  })
}

// 获取已入住
export function getRoomLiving() {
  return request({
    url: '/api/community/get/room/living',
    method: 'get'
  })
}

// 获取所有停车位
export function getParking() {
  return request({
    url: '/api/community/get/parking',
    method: 'get'
  })
}

// 获取已绑定停车位
export function getParkingBind() {
  return request({
    url: '/api/community/get/parking/bind',
    method: 'get'
  })
}

// 添加停车位
export function addParking(data) {
  return request({
    url: '/api/community/add/parking',
    method: 'post',
    data: data
  })
}

// 绑定停车位
export function bindParking(data) {
  return request({
    url: '/api/community/bind/parking',
    method: 'post',
    data: data
  })
}

// 解绑停车位
export function unBindParking(data) {
  return request({
    url: '/api/community/unBing/parking',
    method: 'post',
    data: data
  })
}