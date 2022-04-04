import request from '../request.js';



export function querySysUser(data){
  return request({
    url: 'api/user/querySysUser',
    method: 'post',
    data
  })
}


export function addSysUser(data){
  return request({
    url: 'api/user/addSysUser',
    method: 'post',
    data
  })
}

