import request from '@/utils/axio-request'
import qs from 'qs'

export function listpage(pageStart, pageSize) {
  return request({
    url: '/djplate/listpage',
    method: 'get',
    params: {
      pageStart,
      pageSize
    }
  })
}
export function listmbpage(pageStart, pageSize) {
  return request({
    url: '/djplate/listmbpage',
    method: 'get',
    params: {
      pageStart,
      pageSize
    }
  })
}
export function deleteplatebyid(id) {
  return request({
    url: '/djplate/deleteplatebyid',
    method: 'post',
    data: qs.stringify({
      id
    })
  })
}
