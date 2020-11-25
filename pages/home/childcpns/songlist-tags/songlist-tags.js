// pages/home/childcpns/songlist-tags/songlist-tags.js
import {getSongLists} from "../../../../service/home/home.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tags: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,  //初始tag为0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeTag(event) {
      const index = event.currentTarget.dataset.index
      this.setData({
        currentIndex: index
      })
      // 获取分类歌单请求
      const tag = this.properties.tags[index].name;
      getSongLists(tag);
    }
  }
})
