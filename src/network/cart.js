import {request} from "./request";

export function getCart() {
  return request({
    url: '/api/goods'
  })
}

export function getCartGoods(order = 'sales', cid = 0, page = 1) {
  return request({
    url: '/api/goods?category_id='+cid+'&page='+page+'&'+order+'=1',
  })
}