import request from '@/utils/request'

// 修改密码
export function updatePassword(data) {
  return request({
    url: '/api/admin/update/password',
    method: 'put',
    data: data
  })
}
