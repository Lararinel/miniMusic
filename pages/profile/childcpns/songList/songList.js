// pages/profile/childcpns/songList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgSrc: {
      type: String,
      value: ''
    },
    name: {
      type: String,
      value: ''
    },
    playCount: {
      type: Number,
      value: null
    },
    trackCount: {
      type: Number,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getPlayCount(count) {
      if(count < 10000) {
        return count
      }
      if(count < 100000000) {
        return `${(count / 10000).toFixed(1)}万`
      }
      return `${(count / 100000000)}亿`
    }
  }
})
