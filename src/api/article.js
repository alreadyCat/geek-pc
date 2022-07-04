import request from 'utils/request'
/**
 * 获取频道列表
 * @returns
 */
export const getChannelList = () => {
  return request({
    url: '/channels'
  })
}

/**
 * 获取文章列表
 * @param {*} params
 * @returns
 */
export const getArticleList = (params) => {
  return request({
    url: '/mp/articles',
    params
  })
}

/**
 * 删除文章
 * @param {*} params
 * @returns
 */
export const deleteArticle = (id) => {
  return request({
    url: `/mp/articles/${id}`,
    method: 'delete'
  })
}

/**
 * 添加文章
 * @param {*} data
 * @returns
 */
export const addArticle = (data, draft = true) => {
  return request({
    method: 'post',
    url: `/mp/articles?draft=${draft}`,
    data
  })
}

/**
 * 查询文章
 * @param {*} id
 * @returns
 */
export const findArticle = (id) => {
  return request({
    method: 'get',
    url: `/mp/articles/${id}`
  })
}

/**
 * 编辑文章
 * @param {*} data
 * @param {*} draft
 * @returns
 */
export const editArticle = (data, draft = false) => {
  return request({
    method: 'put',
    url: `/mp/articles/${data.id}?draft=${draft}`,
    data
  })
}
