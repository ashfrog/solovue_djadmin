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

export function addBindOrder(telphone, count, bindcode) {
  return request({
    url: '/userbindorder/addBindOrder',
    method: 'post',
    data: qs.stringify({
      telphone: telphone,
      count: count,
      bindcode: bindcode
    })
  })
}

export function listBindOrder(pageStart, pageSize) {
  return request({
    url: '/userbindorder/listBindOrder',
    method: 'post',
    data: qs.stringify({
      pageStart: pageStart,
      pageSize: pageSize
    })
  })
}
export function listBindMachine(pageStart, pageSize) {
  return request({
    url: '/userbindorder/listBindMachine',
    method: 'post',
    data: qs.stringify({
      pageStart: pageStart,
      pageSize: pageSize
    })
  })
}
