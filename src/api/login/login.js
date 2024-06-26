import request from '../request.js';

export function getInitRandom(data){
    return request({
      url: '/mealManager/common/getInitRandom',
      method: 'post',
      data
    })
}

export function getMcryptKey(data){
    return request({
      url: '/mealManager/common/getMcryptKey',
      method: 'post',
      data
    })
}
export function login(data){
    return request({
      url: 'auth/login',
      method: 'post',
      data
    })
}

export function register(data){
  return request({
    url: 'api/auth/register',
    method: 'post',
    data
  })
}
//退出登录
export function logout(data){
    return request({
      url: 'api/auth/logout',
      method: 'post',
      data
    })
}
//获取用户信息
export function getUserInfo(data){
  return request({
    url: '/mealManager/common/getUserInfo',
    method: 'post',
    data
  })
}