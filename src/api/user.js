import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'get'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function adminlogin() {
  return request({
    url: '/user/adminlogin',
    method: 'post'
  })
}
