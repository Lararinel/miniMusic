// pages/profile/profile.js
import {
  getUserRadio,
  getUserSongLists
} from '../../service/profile/profile.js'
import {
  computeAge
} from '../../utils/index.js'

Page({
  data: {
    userInfo: null, //用户信息
    age: '', //用户年龄（几零后）
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
    }
  },
  onLoad() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo
      })
    }
    console.log(userInfo);
    this._getData();
  },
  async _getData() {
    this.getAge();
    this.getRadio();
    this.getUserSongLists();
  },
  // 获取年龄：几零后
  getAge() {
    try {
      const {
        birthday
      } = this.data.userInfo.profile || {};
      const age = computeAge(birthday);
      this.setData({
        age
      })
    } catch (error) {
      console.log('未获取到用户信息')
    }
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
      const {id} = this.data.userInfo?.account ?? {};
      const result = await getUserSongLists(id, {
        limit: 30,
        offset: page
      });
      if(result.code !== 200) throw new Error(result.message);
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
        songListCategory
      })
      
    } catch (error) {

    }
  }

})