import request from '../request.js';


export function queryCorporateInformation(data){
    return request({
      url: '/mealManager/corporateInformation/queryCorporateInformation',
      method: 'post',
      data
    })
}

export function updateCorporate(data){
  return request({
    url: '/mealManager/corporateInformation/updateCorporate',
    method: 'post',
    data
  })
}



