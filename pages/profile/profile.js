// pages/profile/profile.js
import {
  getUserRadio,
  getUserSongLists
} from '../../service/profile/profile.js'


const computedBehavior = require('miniprogram-computed')

Page({
  data: {
    userInfo: null, //用户信息
    songListCategory: { //歌单分类
      creator: {
        list: [],
        total: 0,
        subscribedCount: 0 //歌单收藏次数
      },
      collect: {
        list: [],
        total: 0,
        subscribedCount: 0
      }
    },

  },
  behaviors: [computedBehavior],
  computed: {
    age({userInfo}) {
      try {
      const {birthday} = userInfo.profile
      const date = new Date(birthday).getFullYear();
      if (2010 <= date && date < 2020) {
        return '10后'
      }
      if (2000 <= date && date < 2010) {
        return '00后'
      }
      if (1990 <= date && date < 2000) {
        return '90后'
      }
      if (1980 <= date && date < 1990) {
        return '80后'
      }
      if (1970 <= date && date < 1980) {
        return '70后'
      }
      if (1960 <= date && date < 1970) {
        return '60后'
      }
      return '60前'
      } catch(e) {
        return '未知'
      }
    },
    gender({
      userInfo
    }) {
      try {
        return userInfo.profile.gender === 2 ? 'female' : 'male'
      } catch (error) {
        return 'male'
      }
    }
  },
  onLoad() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo
      })
    }
    // console.log(userInfo);
    this._getData();
  },
  async _getData() {
    this.getRadio();
    this.getUserSongLists();
  },
  
  // ----------网络请求----------------
  async getRadio() {
    try {
      const {
        id: uid
      } = this.data.userInfo.account || {};
      const userRadio = await getUserRadio(uid); //这里返回用户创建的电台信息，但实际返回的数据中没有页面所需数据
      // console.log(userRadio);
    } catch (error) {
      console.log('未获取到用户信息');
    }
  },
  async getUserSongLists(page = 1) {
    try {
      const {
        id
      } = this.data.userInfo?.account ?? {};
      const result = await getUserSongLists(id, {
        limit: 30,
        offset: page
      });
      if (result.code !== 200) throw new Error(result.message);
      const {
        songListCategory
      } = this.data;
      result.playlist.forEach(item => {
        const categoryKey = item.userId === id ? 'creator' : 'collect';
        songListCategory[categoryKey].list.push(item);
        songListCategory[categoryKey].total += 1;
        songListCategory[categoryKey].subscribedCount += item.subscribedCount;
      })

      this.setData({
        songListCategory,
      })

    } catch (error) {

    }
  },
  

})