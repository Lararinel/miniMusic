import request from "../network.js"

// 获取用户创建的电台
export function getUserRadio (id) {
  return request({
    url: `/user/audio?uid=${id}`
  })
}

/**
 * 获取用户歌单
 * @param {string} id uid
 * @param {*} params limit,offset
 */
export function getUserSongLists(id, params) {
  return request({
    url: `/user/playlist?uid=${id}`,
    data: params
  })
}