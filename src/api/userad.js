import request from '@/utils/axio-request'
import qs from 'qs'

export function listbylogin() {
  return request({
    url: '/userad/listbylogin',
    method: 'post'
  })
}

/**
 * @param {Object} string machineid
 * @param {Object} string data
 * 保存广告配置列表到服务器
 */
export function saveuseradset(machineid, data) {
  return request({
    url: '/userad/saveuseradset',
    method: 'post',
    data: qs.stringify({
      machineid: machineid,
      data: data
    })
  })
}

export function sendadsets(machinecode) {
  return request({
    url: '/ad/sendadsets',
    method: 'get',
    params: {
      machinecode
    }
  })
}

export function getuseradset(machinecode) {
  return request({
    url: '/userad/getuseradset',
    method: 'post',
    data: qs.stringify({
      machinecode: machinecode
    })
  })
}

export function getusermediasetsbyuserid() {
  return request({
    url: '/userad/getusermediasetsbyuserid',
    method: 'post'
  })
}

export function deletemediabyid(id) {
  return request({
    url: '/userad/deletemediabyid',
    method: 'post',
    data: qs.stringify({
      id: id
    })
  })
}

export function updatename(id, moviename) {
  return request({
    url: '/userad/updatename',
    method: 'post',
    data: qs.stringify({
      id: id,
      moviename: moviename
    })
  })
}
