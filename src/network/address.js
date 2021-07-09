import {
  request
} from "./request";

export function addRess(params) {
  return request({
    url: '/api/address',
    method: 'post',
    params
  })
}

export function editRess(id, params) {
  return request({
    url: `/api/address/${id}`,
    method: 'put',
    params
  })
}

export function delAddress(id) {
  return request({
    url: `/api/address/${id}`,
    method: 'delete',
  })
}

export function getAddress() {
    return request({
      url: '/api/address',
    })
  }

export function getAddressDetail(id) {
  return request({
    url: `/api/address/${id}`,
  })
}
