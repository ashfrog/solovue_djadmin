import request from '@/utils/axio-request'
import qs from 'qs'

export function getList(params) {
  return request({
    url: '/storeitem/list',
    method: 'get',
    params
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

export function getFilenameBymd5(md5) {
  return request({
    url: '/upload/getItemMD5?md5=' + md5,
    method: 'get'
  })
}
