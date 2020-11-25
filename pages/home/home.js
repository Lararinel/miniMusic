// pages/home/home.js
import {
  getBannerData,
  getRecommendList,
  getAlbumData,
  getsongTags,
  getSongLists
} from "../../service/home/home.js"
Page({
  data: {
    banners: [], //轮播图
    recommends: [], //推荐列表
    albums: [], //专辑列表
    tags: [], //精品歌单分类tags
    songLists: [], //精品歌单
    showBackTop: false,  //返回顶部按钮
    windowHeight: '',   //可视区域高度
    scrollTop: 0,
    offsetTop: 0
  },
  onLoad() {
    this._getData();
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight  //屏幕高度
    })
  },
  onScroll(event) {
    console.log('----')
    wx.createSelectorQuery()
      .select('#scroller')
      .boundingClientRect((res) => {
        this.setData({
          scrollTop: event.detail.scrollTop,
          offsetTop: res.top,
        });
      })
      .exec();
  },

  onPageScroll(event) {
    // 显示返回顶部按钮
    this.setData({
      showBackTop: event.scrollTop > 1000
    })
  },

  handleBackTop(event) {
    this.setData({
      showBackTop: false
    })
    // 回到页面顶部
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  _getData() {
      this._getBannerData(),
      this._getRecommendList(),
      this._getAlbumData(),
      this._getsongTags(),
      this._getSongLists()
  },

  // ------获取网络请求相关方法--------
  _getBannerData() {
    getBannerData(4).then(res => {
      const banners = res.artists.map(item => {
        return item.img1v1Url;
      })
      this.setData({
        banners
      })
    })
  },
  _getRecommendList() {
    getRecommendList(4).then(res => {
      const recommends = res.artists;
      this.setData({
        recommends
      })
    })
  },
  _getAlbumData() {
    getAlbumData().then(res => {
      const albums = res.albums.splice(0, 5);
      this.setData({
        albums: albums
      })
    })
  },
  _getsongTags() {
    getsongTags().then(res => {
      const tags = res.tags.splice(0, 4);
      this.setData({
        tags
      })
    })
  },
  _getSongLists() {
    getSongLists("华语").then(res => {
      this.setData({
        songLists: res.playlists
      })
    })
  }
})