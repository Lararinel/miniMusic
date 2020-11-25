// pages/profile/profile.js
const app = getApp();

Page({
  data: {
    userInfo: {}, //用户信息
  },
  onLoad() {
    if(app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    console.log(userInfo)
  }
})