import request from '@/utils/axio-request'
import jsonrequest from '@/utils/axio-jsonrequest'
import qs from 'qs'

import { post } from '../utils/http'

// export const createfiling = p => post('/itemorder/createfiling', p, true)

export function createfiling(shopCar, itemOrderDetail, userDealer) {
  return request({
    url: '/itemorder/createfiling',
    method: 'post',
    data: qs.stringify({
      shopcar: JSON.stringify(shopCar),
      itemorderdetail: JSON.stringify(itemOrderDetail),
      userdealer: JSON.stringify(userDealer)
    })
  })
}

export function additemorder(shopcar, itemorderdetail, userdealer) {
  return request({
    url: '/itemorder/createitemorder',
    method: 'post',
    data: JSON.stringify({
      shopcar: shopcar,
      itemorderdetail: itemorderdetail,
      userdealer: userdealer
    })
  })
}

export function updateitemorder(itemorder) {
  return jsonrequest({
    url: '/itemorder/updateitemorder',
    method: 'post',
    data: {
      itemOrder: itemorder
    }
  })
}

export function listitemorderbydealer() {
  return request({
    url: '/itemorder/listitemorderbydealer',
    method: 'get'
  })
}

export function listauthoriseorderbydealer() {
  return request({
    url: '/itemorder/listauthoriseorderbydealer',
    method: 'get'
  })
}

export function getitemorderbyorderno(orderno) {
  return request({
    url: '/itemorder/getitemorderbyorderno',
    method: 'get',
    params: {
      orderno: orderno
    }
  })
}

export function listitemorder(pageStart, pageSize) {
  return request({
    url: '/itemorder/listitemorder',
    method: 'post',
    data: qs.stringify({
      pageStart: pageStart,
      pageSize: pageSize
    })
  })
}

export function deleteitemorder(orderno) {
  return request({
    url: '/itemorder/deleteitemorder',
    method: 'post',
    data: qs.stringify({
      orderno: orderno
    })
  })
}

export function updateExpressNumberbyOrderno(orderno, itemid, expressnumber) {
  return request({
    url: '/itemorder/updateExpressNumberbyOrderno',
    method: 'post',
    data: qs.stringify({
      orderno: orderno,
      itemid: itemid,
      expressnumber: expressnumber
    })
  })
}

export function updateStatebyOrderno(orderno, itemid, state) {
  return request({
    url: '/itemorder/updateStatebyOrderno',
    method: 'post',
    data: qs.stringify({
      orderno: orderno,
      itemid: itemid,
      state: state
    })
  })
}
