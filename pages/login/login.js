// pages/login/login.js
import {
  loginByPhone,
  loginByEmail
} from '../../service/login/login';

const app = getApp();

import Toast from '@vant/weapp/toast/toast';
Page({
  data: {
    loginWay: true, //默认为手机登录
    phone: '',
    password: '',
    email: ''
  },
  // 切换登录方式导航
  handlePhone() {
    this.setData({
      loginWay: true,
      phone: '',
      password: ''
    })
  },
  handleEmail() {
    this.setData({
      loginWay: false,
      email: '',
      password: ''
    })
  },

  login(e) {
    if (this.data.loginWay) { // 手机登录
      let phone = e.detail.value.phone;
      let password = e.detail.value.password;
      if (!phone) { //手机号为空
        Toast({
          message: "手机号不能为空",
          forbidClick: true
        });
      } else if (!password) { //密码为空
        Toast({
          message: "密码不能为空",
          forbidClick: true
        })
      } else if (!/^1\d{10}$/.test(phone)) { //手机号应为11位
        Toast({
          message: "请输入正确的手机号",
          forbidClick: true
        })
      } else { //手机登录请求
        loginByPhone(phone, password)
          //code 502:密码错误  501：账号不存在  200:登录成功
          .then((res) => {
            if (res.code === 501) {
              Toast({
                message: res.msg,
                forbidClick: true
              })
            } else if (res.code === 502) {
              Toast({
                message: res.msg,
                forbidClick: true
              })
            } else {
              console.log(res);
              app.globalData.userInfo = res;
              wx.switchTab({
                url: '/pages/profile/profile',
              })
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
    } else { //邮箱登录
      let email = e.detail.value.email;
      let password = e.detail.value.password;
      const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; //邮箱格式
      if (!email) { //邮箱为空
        Toast({
          message: "邮箱不能为空",
          forbidClick: true
        });
      } else if (!password) { //密码为空
        Toast({
          message: "密码不能为空",
          forbidClick: true
        })
      } else if (!reg.test(email)) { //邮箱格式验证
        Toast({
          message: "请输入正确的邮箱格式",
          forbidClick: true
        })
      } else { //邮箱登录请求
        loginByEmail(email, password)
          .then((res) => {
            if (res.code === 501) {
              Toast({
                message: res.msg,
                forbidClick: true
              })
            } else if (res.code === 502) {
              Toast({
                message: res.msg,
                forbidClick: true
              })
            } else {
              app.globalData.userInfo = res;
              wx.switchTab({
                url: '/pages/profile/profile',
              })
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  }
})