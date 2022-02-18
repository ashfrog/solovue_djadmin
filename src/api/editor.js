import request from '@/utils/axio-request'
import qs from 'qs'

import { post } from '../utils/http'

export const updateeditor = p => post('/itemdatastorage/updateeditordata', p)
export const deleteeditor = p => post('/itemdatastorage/delete', p)
export const createeditor = p => post('/itemdatastorage/create', p)
export const updateeditordata = p =>
  post('/itemdatastorage/updateeditordata', p)
export function save(id, wallitemdata) {
  return request({
    url: '/itemdatastorage/save',
    method: 'post',
    data: qs.stringify({
      id: id,
      wallitemdatastr: JSON.stringify(wallitemdata)
    })
  })
}

export function list(pageStart, pageSize) {
  return request({
    url: '/itemdatastorage/list',
    method: 'get',
    params: {
      pageStart: pageStart,
      pageSize: pageSize
    }
  })
}

export function listself(pageStart, pageSize) {
  return request({
    url: '/itemdatastorage/listself',
    method: 'get',
    params: {
      pageStart: pageStart,
      pageSize: pageSize
    }
  })
}

export function getwallitemdata(id) {
  return request({
    url: '/itemdatastorage/getwallitemdata',
    method: 'get',
    params: {
      id
    }
  })
}
