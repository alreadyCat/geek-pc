import request from 'utils/request'
/**
 * 登录
 * @param {Object} data 手机号和验证码
 * @returns Promise
 */
export const login = (data) => {
  return request({
    url: '/authorizations',
    method: 'post',
    data,
  })
}

/**
 * 获取用户信息
 * @returns
 *
 */
export const getUserProfile = () => {
  return request({
    url: '/user/profile',
    method: 'get',
  })
}
