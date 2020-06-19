import request from '@/utils/axio-request'
// import qs from 'qs'

export function getocken(platform) {
  return request({
    url: '/wxapp/getocken',
    method: 'get',
    params: {
      platform: platform
    }
  })
}

export function listappinfo() {
  return request({
    url: '/wxapp/listappinfo',
    method: 'get'
  })
}

export function getwxacodeunlimit(scene, path, platform) {
  return request({
    url: '/wxapp/getwxlitcodeunlimit',
    method: 'get',
    params: {
      scene: scene,
      path: path,
      platform: platform
    }
  })
}
