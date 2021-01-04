import create from '../../utils/create'
import store from '../../store/index.js'

import Toast from '@vant/weapp/toast/toast';

import { fetchRecommendRadios, fetchOptimRadios, fetchPaygiftRadios } from '../../service/radio/radio.js'

create(store, {
  data: {
    recommendTitle: ''  //推荐电台标题
  },
  use: ['recommendRadios', 'optimRadios', 'paygiftRadios'],
  onLoad: function() {
    this._getData()
  },
  async _getData() {
    this.getRecommendRadios()
    this.getOptimRadios()
    this.getPaygiftRadios()
  },

  // ---------数据请求--------------
  async getRecommendRadios() {
    const result = await fetchRecommendRadios()
    if(result.code === 200) {
      this.store.data.recommendRadios = result.djRadios
      const radioTitle = result.name
      this.setData({
        recommendTitle: radioTitle
      })
    } else {
      Toast.fail('请求精选电台失败')
    }
  },
  async getOptimRadios() {
    const result = await fetchOptimRadios()
    if(result.code === 200) {
      this.store.data.optimRadios = result.data
    } else {
      Toast.fail('请求今日优选失败')
    }
  },
  async getPaygiftRadios(page = 1) {
    const result = await fetchPaygiftRadios({
      limit: 30,
      offset: page
    })
    if(result.code === 200) {
      this.store.data.paygiftRadios = result.data.list
    } else {
      Toast.fail('请求付费精选失败')
    }
  }

})