<template>
<div id="wrapper">
  <!-- header & slider common components -->
  <!-- <head-top :is-home="true" :header-title="'首页'" :go-back="false"></head-top> -->
  <sliderMenu></sliderMenu>

  <transition name="router-fade" mode="out-in">
    <keep-alive>
      <router-view class="app-view"></router-view>
    </keep-alive>
  </transition>
</div>
</template>

<script>
// import headTop from 'src/components/header/head'
import sliderMenu from 'src/pages/menu/menu'

export default {
  data () {
    return {
    }
  },
  components: {
    // headTop,
    sliderMenu
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
