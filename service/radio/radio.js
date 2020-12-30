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
