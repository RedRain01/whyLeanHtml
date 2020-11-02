import request from '../request.js';


export function queryPaymentFBypager(data){
    return request({
      url: '/mealManager/payment/queryPaymentFBypager',
      method: 'post',
      data
    })
}


export function queryExamine(data){
  return request({
    url: '/mealManager/payment/queryExamine',
    method: 'post',
    data
  })
}


export function downloadExamine(data){
  return request({
    url: '/mealManager/payment/downloadExamine',
    method: 'post',
    data
  })
}
