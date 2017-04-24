<template>
<div id="wrapper">
  <!-- header & slider common components -->
  <!-- <head-top :is-home="true" :header-title="'首页'" :go-back="false"></head-top> -->
  <sliderMenu></sliderMenu>

  <!-- back to top -->
  <div v-if="circle" class="circle" @click="top()">
    <i class="iconfont icon-ic_top"></i>
  </div>

  <transition name="router-fade" mode="out-in">
    <keep-alive>
      <router-view class="app-view"></router-view>
    </keep-alive>
  </transition>
</div>
</template>

<script>
// import headTop from 'src/components/header/head'
import { mapState, mapMutations } from 'vuex'
import sliderMenu from 'src/pages/menu/menu'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      circle: state => state.circleFlag
    })
  },
  components: {
    sliderMenu
  },
  methods: {
    ...mapMutations(['TOGGLE_TOP']),
    top() {
      let dom = document.querySelector('.app-view')
      let height = dom.scrollTop
      let scrollTop = parseInt(height / 50)
      let time = setInterval(function() {
        height -= scrollTop;
        if (height <= 0) {
          dom.scrollTop = 0
          // this.TOGGLE_TOP(false)
          clearInterval(time)
        } else {
          dom.scrollTop = height
        }
      }, 1)
    }
  }
}
</script>

<style lang="scss">
@import './style/reset';
@import './style/common';
.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
  opacity: 0;
}
.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.80);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
  right: 5%;
  bottom: 5vw;
  position: fixed;
  z-index: 10;
  i {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 0.6rem;
    color: #ACB9C9;
    transform: translate(-50%, -50%);
  }
}
.app-view {
  z-index: 1;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  position: absolute;
  transition: transform 0.3s ease;
  -webkit-overflow-scrolling: touch;
}    
</style>
