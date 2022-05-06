import request from '@/utils/request'

// 未支付记录
export function getUnPay() {
  return request({
    url: '/api/payment/get/unPay',
    method: 'get'
  })
}

export function getUnPayByRoom(data) {
  return request({
    url: '/api/payment/get/unPay/byRoom?room=' + data,
    method: 'get'
  })
}

// 已支付记录
export function getPay() {
  return request({
    url: '/api/payment/get/pay',
    method: 'get'
  })
}

export function getPayByRoom(data) {
  return request({
    url: '/api/payment/get/pay/byRoom?room=' + data,
    method: 'get'
  })
}

// 支付
export function pay(data) {
  return request({
    url: '/api/payment/pay',
    method: 'post',
    data: data
  })
}

// 收取
export function toll(data) {
  return request({
    url: '/api/payment/toll',
    method: 'post',
    data: data
  })
}

// 删除
export function deletePayment(data) {
  return request({
    url: '/api/payment/delete',
    method: 'delete',
    params: data
  })
}