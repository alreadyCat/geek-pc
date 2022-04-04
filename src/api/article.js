import request from 'utils/request'
/**
 * 获取频道列表
 * @returns
 */
export const getChannelList = () => {
  return request({
    url: '/channels',
  })
}

/**
 * 获取文章
 * @param {*} params
 * @returns
 */
export const getArticleList = (params) => {
  return request({
    url: '/mp/articles',
    params,
  })
}
