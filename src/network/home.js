import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/api/index'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/api/index?'+type+'=1&page='+page,
  })
}
