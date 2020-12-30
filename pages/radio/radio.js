import create from '../../utils/create'
import store from '../../store/index.js'

import Toast from '@vant/weapp/toast/toast';

import { fetchRecommendRadios, fetchRadioTypes } from '../../service/radio/radio.js'

create(store, {
  data: {
    recommendTitle: ''  //推荐电台标题
  },
  use: ['recommendRadios'],
  onLoad: function() {
    this._getData()
  },
  async _getData() {
    this.getRecommendRadios()
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
      Toast.fail('请求电台失败')
    }
  }
})