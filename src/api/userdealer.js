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

export function register(telphone, password, smscode) {
  return request({
    url: '/userdealer/register',
    method: 'post',
    data: qs.stringify({
      telphone: telphone,
      password: password,
      smscode: smscode
    })
  })
}

export function requestsmscode(telphone) {
  return request({
    url: '/userdealer/requestsmscode',
    method: 'get',
    params: {
      telphone: telphone
    }
  })
}

export function findpassword(telphone, password, smscode) {
  return request({
    url: '/userdealer/findpassword',
    method: 'post',
    data: qs.stringify({
      telphone: telphone,
      password: password,
      smscode: smscode
    })
  })
}
