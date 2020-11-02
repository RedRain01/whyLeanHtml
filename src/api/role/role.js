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




export function queryRoleBypager(data){
    return request({
      url: '/mealManager/role/queryRoleBypager',
      method: 'post',
      data
    })
}

export function addRole(data){
  return request({
    url: '/mealManager/role/addRole',
    method: 'post',
    data
  })
}

export function updateRole(data){
  return request({
    url: '/mealManager/role/updateRole',
    method: 'post',
    data
  })
}

export function deleteRole(data){
  return request({
    url: '/mealManager/role/deleteRole',
    method: 'post',
    data
  })
}


export function loadRole(data){
  return request({
    url: '/mealManager/role/loadRole',
    method: 'post',
    data
  })
}


export function setIsDefault(data){
  return request({
    url: '/mealManager/role/setIsDefault',
    method: 'post',
    data
  })
}
