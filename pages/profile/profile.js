// pages/profile/profile.js
const app = getApp();

Page({
  data: {
    userInfo: null, //用户信息
  },
  onLoad() {
    const userInfo = wx.getStorageSync('userInfo');
    if(userInfo) {
      this.setData({
        userInfo
      })
    }
    console.log(userInfo);
  }
})