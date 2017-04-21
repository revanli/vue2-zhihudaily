/**
 * 注册全局自定义指令
 * date: 2017-04-17
 */
import { getStyle } from './utils'

export default function directive (Vue) {
  Vue.directive('load-more', {
    bind: function (el, binding) {
      // 只绑定一次，第一次绑定到元素时调用
      const windowHeight = window.screen.height
      let height
      let paddingBottom
      let marginBottom
      let requestFram
      let oldScrollTop
      let scrollEl
      let heightEl
      let scrollType = el.attributes.type && el.attributes.type.value
      let scrollReduce = 2

      if (scrollType === 2) {
        scrollEl = el
        heightEl = el.children[0]
      } else {
        scrollEl = document.body
        heightEl = el
      }

      el.addEventListener('touchstart', () => {
        height = heightEl.clientHeight  
        if (scrollType === 2) {
          height = height
        }
        // setTop = el.offsetTop
        paddingBottom = getStyle(el, 'paddingBottom')
        marginBottom = getStyle(el, 'marginBottom')
      }, false)

      el.addEventListener('touchmove', () => {
        loadMore()
      }, false)

      el.addEventListener('touchend', () => {
        oldScrollTop = scrollEl.scrollTop
        moveEnd()
      }, false)

      const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
          if (scrollEl.scrollTop != oldScrollTop) {
            oldScrollTop = scrollEl.scrollTop;
            moveEnd()
          } else {
            cancelAnimationFrame(requestFram);
            height = heightEl.clientHeight;
            loadMore();
          }
        })
      }

      const loadMore = () => {
        console.log(scrollEl.scrollTop, windowHeight, height, paddingBottom, marginBottom)
        if (scrollEl.scrollTop + windowHeight >= height + paddingBottom + marginBottom - scrollReduce) {
          binding.value();
        }
      }
    }
  })
}