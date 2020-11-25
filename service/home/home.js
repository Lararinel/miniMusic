import request from "../network.js"

// 轮播图请求
export function getBannerData(limit) {
  return request({
    url: "/artist/list",
    data: {
      limit
    }
  })
}
// 推荐列表
export function getRecommendList(limit) {
  return request({
    url: '/top/artists',
    data: {
      limit
    }
  })
}
// 获取最新专辑列表
export function getAlbumData() {
  return request({
    url: '/album/newest'
  })
}

// 获取精品歌单分类tags
export function getsongTags() {
  return request({
    url: '/playlist/highquality/tags'
  })
}
// 获取精品歌单
// 接口文档明明写的可以传tag参数去获取不同tag的歌单，但这里传了tag没起作用，postman测试时也没起作用
export function getSongLists(tag) {
  return request({
    url: '/top/playlist/highquality',
    data: {
      tag
    }
  })
}



