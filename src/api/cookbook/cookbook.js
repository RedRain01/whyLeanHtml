import request from '../request.js';

export function queryCookbookByPager(data) {
    return request({
        url: '/mealManager/cookbook/queryCookbookByPager',
        method: 'post',
        data
    })
}

export function del(data) {
    return request({
        url: '/mealManager/cookbook/delete',
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: '/mealManager/cookbook/update',
        method: 'post',
        data
    })
}

export function add(data) {
    return request({
        url: '/mealManager/cookbook/add',
        method: 'post',
        data
    })
}
//1.查询服务器当前时间
export function getCurrentDate(data) {
    return request({
      url: '/mealManager/vacation/getCurrentDate',
      method: 'post',
      data
    })
  }