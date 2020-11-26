// pages/login/login.js
import {
  loginByPhone,
  loginByEmail
} from '../../service/login/login';
import Toast from '@vant/weapp/toast/toast';

const emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; //邮箱格式
const defaultData = {
  loginWay: true,  //登录方式
  phone: '',
  password: '',
  email: ''
}

Page({
  data: Object.assign({}, defaultData),
  handlePhone() {
    this.setData({
      ...defaultData,
      loginWay: true
    })
  },
  handleEmail() {
    this.setData({
      ...defaultData,
      loginWay: false
    })
  },
  async login({detail}) {
    try {
      const {loginWay} = this.data;
      const {phone, password, email} = detail.value;
      const loginParams = {password};
      if(loginWay) {
        if(!phone) throw new Error('手机号不能为空');
        if(!/^1\d{10}$/.test(phone)) throw new Error('请输入正确的手机号');
        loginParams.account = phone;
      } else {
        if(!email) throw new Error('邮箱不能为空');
        if(!emailReg.test(email)) throw new Error('请输入正确的邮箱格式');
        loginParams.account = email;
      }
      if(!password) throw new Error('密码不能为空');
      const loginRequest = loginWay ? loginByPhone : loginByEmail;
      const res = await loginRequest(loginParams.account, loginParams.password);
      if(res.code === 501 || res.code === 502) {
        throw new Error(res.message);
      }
      wx.setStorageSync('userInfo', res);
      wx.switchTab({
        url: '/pages/profile/profile',
      })
    } catch (error) {
      Toast({
        message: error.message || '请求失败',
        forbidClick: true
      })
    }
  }



})

  

