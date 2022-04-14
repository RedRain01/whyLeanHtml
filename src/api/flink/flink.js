import request from '../request.js';

export function addOrderDetil(data){
  return request({
    url: 'api/flink/addOrderDetil',
    method: 'post',
    data
  })
}

export function findRedis(data){
  return request({
    url: 'api/flink/findRedis',
    method: 'post',
    data
  })
}

export function cleanRedis(data){
  return request({
    url: 'api/flink/cleanRedis',
    method: 'post',
    data
  })
}


export function countTop(data){
  return request({
    url: 'api/flink//countTop',
    method: 'post',
    data
  })
}
