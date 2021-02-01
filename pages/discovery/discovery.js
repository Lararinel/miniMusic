// pages/category/category.js
import Toast from '@vant/weapp/toast/toast';

import {
  fetchHome,
  fetchNavList,
  fetchSongList,
} from '../../service/discovery';

Page({
  data: {
    homeSource: {},   // 首页数据
    navList: [],      // 导航数据
    recommendedplaylist: [],  // 推荐歌单
    customizeData: {},  // 私人定制
  },
  onLoad: function () {
    this.getApiData(fetchHome, 'homeSource', 'data', ({ blocks }) => {
      const customizeFilter = blocks.filter(item => item?.uiElement?.mainTitle?.title === '私人定制')
      this.getCustomizeData(customizeFilter[0]);
    });
    this.getApiData(fetchNavList, 'navList');
    this.getApiData(fetchSongList, 'recommendedplaylist', 'result');
  },
  /**
   * 获取接口数据
   * @param {function} apiFunc 接口函数
   * @param {string} stateName state名字
   * @param {string} dataKey response取值key
   * @param {function} callback 回调
   */
  async getApiData(apiFunc, stateName, dataKey = 'data', callback) {
    try {
      const response = await apiFunc()
      if (response.code !== 200) throw new Error(response.message)
      const data = response[dataKey]
      this.setData({
        [stateName]: data,
      })
      typeof callback === 'function' && callback(data);
    } catch (error) {
      Toast.fail(error.message || '请求失败');
    }
  },
  // 获取私人定制
  getCustomizeData({ uiElement, creatives }) {
    const customizeData = {
      ...uiElement,
      list: creatives,
    }
    this.setData({ customizeData })
  }
})