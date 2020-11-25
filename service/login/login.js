import request from "../network.js"

// 手机登录请求
export function loginByPhone (phone, password) {
  return request({
    url: '/login/cellphone',
    method: "POST",
    data: {
      phone, password
    }
  })
}

// 邮箱登录请求
export function loginByEmail (email, password) {
  return request({
    url: '/login',
    data: {
      email, password
    }
  })
}