/**
 * 全局mixin混合对象，后代所有创建的实例都会受到影响
 * date: 2017-04-17
 */

export default function mixin (Vue) {
  Vue.mixin({
    methods: {
      replaceImgUrl: function (imgSrc) {
        return imgSrc.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
      }
    }
  })
}