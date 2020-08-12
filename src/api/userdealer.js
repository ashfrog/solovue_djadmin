import request from '@/utils/axio-request'
import jsonrequest from '@/utils/axio-jsonrequest'
import qs from 'qs'
export function login(telphone, password, rememberme) {
  return request({
    url: '/userdealer/login',
    method: 'post',
    data: qs.stringify({
      username: telphone,
      password: password,
      'remember-me': rememberme
    })
  })
}

export function logout() {
  return request({
    url: '/userdealer/logout',
    method: 'get'
  })
}

export function getInfo() {
  return request({
    url: '/userdealer/info',
    method: 'get'
  })
}

export function gettoken() {
  return request({
    url: '/userdealer/gettoken'
  })
}

export function listdealer() {
  return request({
    url: '/userdealer/listdealer',
    method: 'get'
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

export function setrights(dealerid, rights) {
  return request({
    url: '/userdealer/setrights',
    method: 'post',
    data: qs.stringify({
      dealerid: dealerid,
      rights: rights
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

export function requestdealer(userdealer) {
  return jsonrequest({
    url: '/userdealer/requestdealer',
    method: 'post',
    data: {
      userDealer: userdealer
    }
  })
}

export function getdealerinvoice() {
  return request({
    url: '/userdealer/getdealerinvoice',
    method: 'get'
  })
}
