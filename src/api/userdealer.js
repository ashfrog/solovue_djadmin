import request from '@/utils/axio-request'
import qs from 'qs'

export function login(telphone, password) {
  return request({
    url: '/userdealer/login',
    method: 'post',
    data: qs.stringify({
      telphone: telphone,
      password: password
    })
  })
}

export function getInfo(token) {
  return request({
    url: '/userdealer/info',
    method: 'get',
    params: { token }
  })
}

export function gettoken() {
  return request({
    url: '/userdealer/gettoken'
  })
}

export function listdealer(token) {
  return request({
    url: '/userdealer/listdealer',
    method: 'get',
    params: { token }
  })
}

export function register(telphone, password, smscode, page) {
  return request({
    url: '/userdealer/register',
    method: 'post',
    data: qs.stringify({
      telphone: telphone,
      password: password,
      smscode: smscode,
      page: page
    })
  })
}

export function requestsmscode(telphone, page) {
  return request({
    url: '/userdealer/requestsmscode',
    method: 'get',
    params: {
      telphone: telphone,
      page: page
    }
  })
}

export function findpassword(telphone, password, smscode, page) {
  return request({
    url: '/userdealer/findpassword',
    method: 'post',
    data: qs.stringify({
      telphone: telphone,
      password: password,
      smscode: smscode,
      page: page
    })
  })
}
