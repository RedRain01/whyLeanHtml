import request from '../request.js';


export function queryRefundOrderBypager(data){
    return request({
      url: '/mealManager/refundOrde/queryRefundOrderBypager',
      method: 'post',
      data
    })
}
// 查看详情
export function queryByRefundSn(data){
  return request({
    url: '/mealManager/refundOrde/queryByRefundSn',
    method: 'post',
    data
  })
}