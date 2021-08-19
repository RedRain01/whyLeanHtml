import request from '../request.js';

export function addOrderDetil(data){
  return request({
    url: '/addOrderDetil',
    method: 'post',
    data
  })
}


export function findRedis(data){
  return request({
    url: '/findRedis',
    method: 'post',
    data
  })
}

export function cleanRedis(data){
  return request({
    url: '/cleanRedis',
    method: 'post',
    data
  })
}

