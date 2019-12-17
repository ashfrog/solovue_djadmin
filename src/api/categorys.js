import request from '@/utils/axio-request'

export function getCategorys(params) {
  return request({
    url: '/storeitem/listcategory',
    method: 'get',
    params
  })
}
