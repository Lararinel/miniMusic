import {
  baseURL,
  timeout
} from './config.js'

function request(options) {
  wx.showLoading({
    title: '数据加载中ling',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      timeout: timeout,
      method: options.method || 'GET',
      data: options.data || {},
      success: res => resolve(res.data),
      fail: err => reject(err),
      complete: res => {
        wx.hideLoading()
      }
    })
  })
}
export default request;