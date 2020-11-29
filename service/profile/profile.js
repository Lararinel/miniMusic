import request from "../network.js"

export function getUserRadio (id) {
  return request({
    url: `/user/audio?uid=${id}`
  })
}