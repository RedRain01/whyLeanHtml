import request from '../request.js';

export function queryVacationList(data) {
    return request({
        url: '/mealManager/vacation/queryVacationList',
        method: 'post',
        data
    })
}

export function getCurrentDate(data) {
    return request({
        url: '/mealManager/vacation/getCurrentDate',
        method: 'post',
        data
    })
}

export function batchSetting(data) {
    return request({
        url: '/mealManager/vacation/batchSetting',
        method: 'post',
        data
    })
}