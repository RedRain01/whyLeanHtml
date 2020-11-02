import request from '../request.js';


export function queryWorkerBypager(data){
    return request({
      url: '/mealManager/woker/queryWorkerBypager',
      method: 'post',
      data
    })
}        
export function updateWorkerBysn(data){
    return request({
      url: '/mealManager/woker/updateWorkerBysn',
      method: 'post',
      data
    })
}

export function addWorker(data){
  return request({
    url: '/mealManager/woker/addWorker',
    method: 'post',
    data
  })
}

export function deleteWorker(data){
  return request({
    url: '/mealManager/woker/deleteWorker',
    method: 'post',
    data
  })
}

export function downModel(data){
  return request({
    url: '/mealManager/woker/downModel',
    method: 'post',
    data
  })
}


