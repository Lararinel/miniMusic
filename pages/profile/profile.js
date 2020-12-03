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
    this.getUserSongLists(2);
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
  async getUserSongLists(page=1) {
    try {
      const {account} = this.data.userInfo || {};
      const {id} = account || {};
      const userSongLists = await getUserSongLists(id, {
        limit:15,
        offset:page,
      }); 
      

      console.log(userSongLists);
    } catch(error) {

    }
  }

})