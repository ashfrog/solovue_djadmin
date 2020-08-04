import request from '@/utils/axio-request'
import qs from 'qs'

export function getList(params) {
  return request({
    url: '/storeitem/list',
    method: 'get',
    params
  })
}

export function selectCount() {
  return request({
    url: '/storeitem/selectCount',
    method: 'get'
  })
}

export function getListByPage(pageSize, pageStart, columnName, desc) {
  return request({
    url: '/storeitem/adminlistpage',
    method: 'post',
    data: qs.stringify({
      pageSize: pageSize,
      pageStart: pageStart,
      columnName: columnName,
      desc: desc
    })
  })
}

export function updateCategory(itemid, categoryid) {
  return request({
    url: '/storeitem/updateCategory',
    method: 'post',
    data: qs.stringify({
      iId: itemid,
      categoryid: categoryid
    })
  })
}

export function updatePrice(itemid, price) {
  return request({
    url: '/storeitem/updatePrice',
    method: 'post',
    data: qs.stringify({
      iId: itemid,
      price: price
    })
  })
}

export function updateName(itemid, name) {
  return request({
    url: '/storeitem/updateName',
    method: 'post',
    data: qs.stringify({
      iId: itemid,
      name: name
    })
  })
}

export function putAwayItem(itemid, putaway) {
  return request({
    url: '/storeitem/updatePutaway',
    method: 'post',
    data: qs.stringify({
      iId: itemid,
      putaway: putaway
    })
  })
}

export function deleteitem(itemid) {
  return request({
    url: '/storeitem/deleteitem',
    method: 'post',
    data: qs.stringify({
      id: itemid
    })
  })
}
