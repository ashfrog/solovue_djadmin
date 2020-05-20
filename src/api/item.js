import request from '@/utils/axio-request'
import qs from 'qs'

export function listitem(params) {
  return request({
    url: '/item/list',
    method: 'get',
    params
  })
}

export function addshopcar(id, count) {
  return request({
    url: '/item/createitemorder',
    method: 'post',
    data: qs.stringify({
      id: id,
      count: count
    })
  })
}

export function additemorder(shopcar) {
  return request({
    url: '/item/createitemorder',
    method: 'post',
    data: JSON.stringify({
      shopcar: shopcar
    })
  })
}
