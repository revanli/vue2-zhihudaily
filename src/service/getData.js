import fetch from '../config/fetch'

/**
 * setPromise
 */
// const setPromise = data => {
//   return new Promise((resolve, reject) => {
//     resolve(data)
//   })
// }

/**
 * 启动界面图像获取
 */
const startImg = () => fetch('GET', '/4/start-image/1080*1776', {})

/**
 * 最新消息
 */
const latestNews = () => fetch('GET', '/4/news/latest', {})

/**
 * 消息内容获取
 */
const newContent = id => fetch('GET', '/4/news/' + id, {})

/**
 * 过往消息
 * @param {string} [date] [YYYYMMDD]
 */
const beforeNews = date => fetch('GET', '/4/news/before/' + date, {})

/**
 * 新闻额外信息
 * @param {number} [id] [新闻ID]
 * @returns { long_comments, popularity, short_comments, comments } [长评论总数, 点赞, 短评论, 评论总数]
 */
const extraNews = id => fetch('GET', '/4/story-extra/' + id, {})

/**
 * 新闻对应长评论查看
 * @param {number} [id] [新闻ID]
 * @returns {JSON}
 */
const newLongComments = id => fetch('GET', '/4/story/' + id + '/long-comments', {})

/**
 * 新闻对应短评论查看
 * @param {number} [id] [新闻ID]
 * @returns {JSON}
 */
const newShortComments = id => fetch('GET', '/4/story/' + id + '/short-comments', {})

/**
 * 新闻对应短评论查看
 * @param {number} [id] [新闻ID]
 * @returns {JSON}
 */
const newShortCommentsBefore = (detail_id, new_id) => fetch('GET', '/4/story/' + detail_id + '/short-comments/before/' + new_id, {})

/**
 * 主题日报列表
 */
const themes = () => fetch('GET', '/4/themes', {})

/**
 * 主题日报内容
 * @param {number} [id] [主题日报ID]
 */
const themeConent = id => fetch('GET', '/4/theme/' + id, {})

/**
 * 过往主题日报内容
 * @param {number} [themeId] [主题日报ID]
 * @param {number} [storyId] [新闻ID]
 */
const themeConentBefore = (themeId, storyId) => fetch('GET', '/4/theme/' + themeId + '/before/' + storyId, {})

/**
 * 新闻推荐者
 * @param {number} [id] [新闻ID]
 */
const recommenders = id => fetch('GET', '/4/story/' + id + '/recommenders', {})

/**
 * 合集列表
 * @param {number} [id] [新闻ID]
 */
const sections = id => fetch('GET', '/3/section/' + id, {})

/**
 * 某个专栏之前的新闻
 * @param {number} [sectionId] [专栏ID]
 * @param {timestamp} [timestamp] [description]
 */
const beforeSectionNews = (sectionId, timestamp) => fetch('GET', '/4/section/' + sectionId + '/before/' + timestamp, {})

export {
  startImg,
  latestNews,
  newContent,
  beforeNews,
  extraNews,
  newLongComments,
  newShortComments,
  newShortCommentsBefore,
  themes,
  themeConent,
  themeConentBefore,
  recommenders,
  sections,
  beforeSectionNews
}
