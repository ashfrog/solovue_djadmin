import request from '@/utils/axio-request'
// import qs from 'qs'

export function listposition(area_index, level) {
  return request({
    url: '/area/listposition',
    method: 'get',
    params: {
      area_index: area_index,
      level: level
    }
  })
}
