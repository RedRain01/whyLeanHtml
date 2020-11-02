import request from '../request.js';









export function queryMealOrderBypager(data){
    return request({
      url: '/mealManager/mealOrder/queryMealOrderBypager',
      method: 'post',
      data
    })
}
