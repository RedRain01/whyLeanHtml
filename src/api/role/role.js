import request from '../request.js';

export function addOrderDetil(data){
  return request({
    url: 'api/event/addOrderDetil',
    method: 'post',
    data
  })
}

export function findRedis(data){
  return request({
    url: 'api/event/findRedis',
    method: 'post',
    data
  })
}

export function cleanRedis(data){
  return request({
    url: 'api/event/cleanRedis',
    method: 'post',
    data
  })
}


export function countTop(data){
  return request({
    url: '/countTop',
    method: 'post',
    data
  })
}
