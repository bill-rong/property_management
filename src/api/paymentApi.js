import request from '@/utils/request'

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

export function pay(data) {
  return request({
    url: '/api/payment/pay',
    method: 'post',
    data: data
  })
}