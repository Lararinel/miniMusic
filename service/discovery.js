import request from "./network.js"

// 首页
export function fetchHome() {
  return request({
    url: "/homepage/block/page",
  })
}


// 导航图标
export function fetchNavList() {
  return request({
    url: "/homepage/dragon/ball",
  })
}

// 推荐歌单
export function fetchSongList(params) {
  return request({
    url: "/personalized",
    data: params
  })
}

