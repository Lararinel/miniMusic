import request from "../network.js"

//获取推荐电台
export function fetchRecommendRadios() {
    return request({
        url: '/dj/recommend'
    })
}

//获取电台类型
export function fetchRadioTypes() {
    return request({
        url: '/dj/catelist'
    })
}

// 获取今日优选电台
export function fetchOptimRadios() {
    return request({
        url: '/dj/today/perfered'
    })
}
/**
 * 获取付费精选电台
 * @param {*} params limit, offset
 */
export function fetchPaygiftRadios(params) {
    return request({
        url: '/dj/paygift',
        data: params
    })
}
/**
 * 
 * @param {*} params limit
 */
export function fetchHourPlays(params) {
    return request({
        url: '/dj/program/toplist/hours',
        data: params
    })
}


