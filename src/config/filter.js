/**
 * 全局过滤器
 * date: 2017-04-17
 */

export default function filters (Vue) {

  /**
   * 格式化时间戳
   * 1461658688000 | formatTime "yyyy-MM-dd hh:mm:ss"
   */
  Vue.filter('formatTime', function (timeStamp, fmt) {
    if (!timeStamp) {
      return ''
    }
    var _timeStamp = parseInt(timeStamp)
    if (_timeStamp.toString().length === 10) {
      _timeStamp *= 1000
    }
    !fmt && (fmt = 'yyyy-MM-dd')

    var t = new Date(_timeStamp)

    var o = {
      'M+': t.getMonth() + 1, // 月份
      'd+': t.getDate(),      // 日
      'h+': t.getHours(),     // 小时
      'm+': t.getMinutes(),   // 分
      's+': t.getSeconds(),   // 秒
      'q+': Math.floor((t.getMonth() + 3) / 3), // 季度
      'S': t.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  })

  /**
   * 把日期格式化再加上星期判断
   */
  Vue.filter('dateTime', function (str) {
    let fmt = 'yyyyMMdd'
    var t = new Date()
    var o = {
      'M+': t.getMonth() + 1, // 月份
      'd+': t.getDate(),      // 日
      'h+': t.getHours(),     // 小时
      'm+': t.getMinutes(),   // 分
      's+': t.getSeconds(),   // 秒
      'q+': Math.floor((t.getMonth() + 3) / 3), // 季度
      'S': t.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    // 根据接口判断的时间
    let year = str.slice(0, 4)
    let month = str.slice(4, 6)
    let day = str.slice(6, 8)
    let dateArr = [year, month, day]
    let date = dateArr.join('/')
    let index = new Date(date).getDay()
    let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][index]

    // 判断后返回字段
    let dt = dateArr.join('')
    if (dt === fmt) {
      return '今日热闻'
    } else {
      return month + '月' + day + '日 ' + week
    }
  })
}