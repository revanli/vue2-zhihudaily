<template>
  
</template>

<script>
import scroll from './scroll'
import { mapMutations } from 'vuex'
export default {
  name: 'scroll-to-top',
  mixins: [scroll],
  methods: {
    ...mapMutations(['TOGGLE_TOP']),
    onScroll () {
      const scroller = this.scroller
      const isWindow = scroller === window
      const height = Math.ceil(window.screen.height / 2)
      const scrollTop = isWindow ? scroller.scrollY : scroller.scrollTop
      if (scrollTop > height) {
        this.TOGGLE_TOP(true) 
      } else {
        this.TOGGLE_TOP(false)
      }
    }
  }
}
</script>