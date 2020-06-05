import request from '@/utils/axio-request'
import qs from 'qs'
export function addBindOrder(telphone, count, orderno, itemid, bindcode) {
  return request({
    url: '/userbindorder/addBindOrder',
    method: 'post',
    data: qs.stringify({
      telphone: telphone,
      count: count,
      orderno: orderno,
      itemid: itemid,
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

export function deleteBindOrder(id) {
  return request({
    url: '/userbindorder/deleteBindOrder',
    method: 'post',
    data: qs.stringify({
      id: id
    })
  })
}

export function deleteBindMachine(id) {
  return request({
    url: '/userbindorder/deleteBindMachine',
    method: 'post',
    data: qs.stringify({
      id: id
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

export function listBindMachinebydealerid(pageStart, pageSize) {
  return request({
    url: '/userbindorder/listBindMachinebydealerid',
    method: 'post',
    data: qs.stringify({
      pageStart: pageStart,
      pageSize: pageSize
    })
  })
}

export function listBindMachinebyuserid(pageStart, pageSize, userid) {
  return request({
    url: '/userbindorder/listBindMachinebyuserid',
    method: 'post',
    data: qs.stringify({
      pageStart: pageStart,
      pageSize: pageSize,
      userid: userid
    })
  })
}

export function listauthoriseorder(pageStart, pageSize) {
  return request({
    url: '/userbindorder/listauthoriseorder',
    method: 'post',
    data: qs.stringify({
      pageStart: pageStart,
      pageSize: pageSize
    })
  })
}

export function listauthoriseorderlog(pageStart, pageSize) {
  return request({
    url: '/userbindorder/listauthoriseorderlog',
    method: 'post',
    data: qs.stringify({
      pageStart: pageStart,
      pageSize: pageSize
    })
  })
}
