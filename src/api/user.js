import request from '@/utils/axio-request'
import qs from 'qs'

export function login(telphone, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: qs.stringify({
      telphone: telphone,
      password: password
    })
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
