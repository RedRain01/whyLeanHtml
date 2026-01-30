import request from '../request.js';



export function addEvent(data){
  return request({
    url: 'api/event/addEvent',
    method: 'post',
    data
  })
}


export function queryEventByUserCode(data){
  return request({
    url: 'api/event/queryEventByUserCode',
    method: 'post',
    data
  })
}


export function queryParentMap(data){
  return request({
    url: 'api/event/queryParentMap',
    method: 'post',
    data
  })
}


export function queryEventOrder(data){
  return request({
    url: 'api/event/queryEventOrder',
    method: 'post',
    data
  })
}

export function deleteEventOrder(data){
  return request({
    url: 'api/event/deleteEventOrder',
    method: 'post',
    data
  })
}


export function startEvenTask(data){
  return request({
    url: 'api/event/startEvenTask',
    method: 'post',
    data
  })
}


export function endEvenTask(data){
  return request({
    url: 'api/event/endEvenTask',
    method: 'post',
    data
  })
}


export function updateTaskSplit(data){
  return request({
    url: 'api/event/updateTaskSplit',
    method: 'post',
    data
  })
}


export function delEventRecurse(data){
  return request({
    url: 'api/event/delEventRecurse',
    method: 'post',
    data
  })
}



export function countToday(data){
  return request({
    url: 'api/event/countToday',
    method: 'post',
    data
  })
}




export function returnStatistical(data){
  return request({
    url: 'api/event/returnStatistical',
    method: 'post',
    data
  })
}



export function updateEvent(data){
  return request({
    url: 'api/event/updateEvent',
    method: 'post',
    data
  })
}

export function startTaskOrder(data){
  return request({
    url: '/api/event/startTaskOrder',
    method: 'post',
    data
  })
}

export function distincEventOrderDate(data){
  return request({
    url: '/api/event/distincEventOrderDate',
    method: 'get',
    data
  })
}


export function statistics24h(params){
  return request({
    url: '/api/event/statistics24h',
    method: 'get',
    params
  })
}

export function countScore15day(params){
  return request({
    url: '/api/event/countScore15day',
    method: 'get',
    params
  })
}


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




