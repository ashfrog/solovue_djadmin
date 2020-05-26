import request from '@/utils/axio-request'
import qs from 'qs'

export function listitem(params) {
  return request({
    url: '/item/list',
    method: 'get',
    params
  })
}

