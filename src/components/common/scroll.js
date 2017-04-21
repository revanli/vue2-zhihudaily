export default {
  props: {
    scroller: {
      type: [HTMLDocument, Element, Window],
      default () {
        return window
      }
    }
  },
  mounted () {
    this.bindScroll()
  },
  methods: {
    bindScroll () {
      if (!this.scroller) {
        return false
      }
      this.handleScroll = (e) => {
        if (this.onScroll) {
          this.onScroll()
        }
      }
      this.scroller.addEventListener('scroll', this.handleScroll)
    },
    unbindScroll (scroller) {
      scroller = scroller || this.scroller
      if (this.handleScroll) {
        scroller.removeEventListener('scroll', this.handleScroll)
      } 
    }
  },
  beforeDestroy () {
    this.unbindScroll()
  },
  watch: {
    scroller (scroller, oldScroller) {
      if (scroller === oldScroller) {
        return
      }
      this.unbindScroll(oldScroller)
      this.bindScroll(scroller)
    }
  }
}