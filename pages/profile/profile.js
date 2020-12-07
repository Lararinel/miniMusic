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
    createSongLists: [],   //用户创建的歌单
    collectSongLists: [],  //用户收藏的歌单
    createListsLoves: 0, //创建的歌单被收藏次数
    collectListsLoves: 0, //收藏的歌单被收藏次数
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
    this.computeLoves(this.data.createSongLists, this.data.collectSongLists);
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
      const {
        account
      } = this.data.userInfo || {};
      const {
        id
      } = account || {};
      const userSongLists = await getUserSongLists(id, {
        limit: 30,
        offset: page,
      });
      // 假设coverImgId_str字段存在则表示为收藏的歌单,不存在则为用户创建的歌单
      const collectSongLists = [];
      const createSongLists = [];
      userSongLists.playlist.forEach((list)=> {
        if(list.coverImgId_str) {
          collectSongLists.push(list);
        } else {
          createSongLists.push(list);
        }
      })
      this.setData({
        collectSongLists,
        createSongLists
      })
      console.log(createSongLists)
    } catch (error) {

    }
  },
  // 计算收藏次数
  computeLoves(array1, array2) {
    let newArray1 = [];
    let newArray2 = [];
    array1.forEach((list)=> {
      if(list[subscribedCount]) {   //subscribedCount为每个歌单对象的收藏次数
        newArray1.push(list[subscribedCount]);
      }
    })
    array2.forEach((list)=> {
      if(list[subscribedCount]) {
        newArray2.push(list[subscribedCount]);
      }
    })
    const createListsLoves = newArray1.reduce(function(prev, cur) {return prev + cur}, 0);
    const collectListsLoves = newArray2.reduce(function(prev, cur) {return prev + cur}, 0);
    this.setData({
      createListsLoves,
      collectListsLoves
    })
    console.log(createListsLoves, collectListsLoves)
  }

})