import { message } from 'antd'
import axios from 'axios'
import { getToken, hasToken, removeToken } from './storage'
import history from './history'
const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000,
})

request.interceptors.request.use((config) => {
  if (hasToken()) {
    config.headers.Authorization = 'Bearer ' + getToken()
  }
  return config
})

request.interceptors.response.use(
  (data) => {
    return data.data
  },
  (err) => {
    if (err && err.response.status === 401) {
      removeToken()
      message.warn('用户信息过期，请重新登录')
      history.push('/login')
    }
    console.log(err.response)

    return Promise.reject(err)
  }
)
export default request
