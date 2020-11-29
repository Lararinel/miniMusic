// pages/profile/profile.js
import {getUserRadio} from '../../service/profile/profile.js'
import {computeAge} from '../../utils/index.js'

Page({
  data: {
    userInfo: null, //用户信息
    age: '',  //用户年龄（几零后）
  },
  onLoad() {
    const userInfo = wx.getStorageSync('userInfo');
    if(userInfo) {
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
  },
  // 获取年龄：几零后
  getAge() {
    const birthday = this.data.userInfo.profile.birthday;
    const age = computeAge(birthday);
    this.setData({
      age
    })
  },
  // ----------网络请求----------------
  async getRadio() {
    const uid = this.data.userInfo.account.id;
    const userRadio = await getUserRadio(uid);   //这里应该返回用户创建的电台信息，但实际返回的数据没有页面所需数据
    // console.log(userRadio);
  }

})