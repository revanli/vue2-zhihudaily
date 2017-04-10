<template>
  <div id="wrapper">
    <head-top></head-top>
    <slider></slider>
    <story-list></story-list>
    <sliderMenu></sliderMenu>
    <!-- 遮罩栏 -->
    <div class="menu-mask" v-if="isShowMenu" @click="toggleMenu"></div>
  </div>
</template>

<script>
import headTop from 'src/components/header/head'
import slider from './children/slider'
import storyList from 'src/components/common/storylist'
import sliderMenu from 'src/pages/menu/menu'
import { latestNews } from 'src/service/getData'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      // topStories: {}
    }
  },
  components: {
    headTop,
    slider,
    storyList,
    sliderMenu
  },
  computed: {
    ...mapState(['isShowMenu'])
  },
  methods: {
    ...mapActions(['toggleMenu'])
  },
  mounted () {
    // 获取最新的消息
    // latestNews().then(res => {
    //   this.topStories = res.top_stories
    // })
  }
}
</script>

<style lang="scss">
.menu-mask {
  position: fixed;
  transform: translateZ(0);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  background: rgba(0, 0, 0, 0.7);
}
</style>