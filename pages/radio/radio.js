import create from '../../utils/create'
import store from '../../store/index.js'

import Toast from '@vant/weapp/toast/toast';

import { 
  fetchRecommendRadios, 
  fetchOptimRadios, 
  fetchPaygiftRadios, 
  fetchHourPlays, 
  fetchPopularDj,
  fetchRadioToplists
 } from '../../service/radio/radio.js'

create(store, {
  data: {
    recommendTitle: ''  //推荐电台标题
  },
  use: ['recommendRadios', 'optimRadios', 'paygiftRadios', 'hourPlays', 'popularDj', 'radioToplists'],
  onLoad: function() {
    this._getData()
  },
  async _getData() {
    this.getRecommendRadios()
    this.getOptimRadios()
    this.getPaygiftRadios()
    this.getHourPlays()
    this.getPopularDj()
    this.getRadioToplists()
  },

  // ---------数据请求--------------
  async getRecommendRadios() {
    const result = await fetchRecommendRadios()
    if(result.code === 200) {
      this.store.set(this.store.data, 'recommendRadios', result.djRadios)
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
      this.store.set(this.store.data, 'optimRadios', result.data)
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
      this.store.set(this.store.data, 'paygiftRadios', result.data.list)
    } else {
      Toast.fail('请求付费精选失败')
    }
  },
  async getHourPlays() {
    const result = await fetchHourPlays()
    if(result.code === 200) {
      //this.store.data.hourPlays = result.data.list
      this.store.set(this.store.data, 'hourPlays', result.data.list)
    } else {
      Toast.fail('请求24小时节目榜失败')
    }
  },
  async getPopularDj() {
    const result = await fetchPopularDj()
    if(result.code === 200) {
      this.store.set(this.store.data, 'popularDj', result.data.list)
    } else {
      Toast.fail('请求最热主播榜失败')
    }
  },
  async getRadioToplists(type = 'hot', page = 1) {
    const result = await fetchRadioToplists({
      limit: 100,
      offset: page,
      type: type
    })
    if(result.code === 200) {
      this.store.set(this.store.data, 'radioToplists', result.toplist)
    } else {
      Toast.fail('请求热门电台失败')
    }
  }
})