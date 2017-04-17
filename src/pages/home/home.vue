<template>
  <div class="home">
    <!-- header & slider common components -->
    <!-- <head-top :is-home="true" :header-title="headerTitle" :go-back="false"></head-top> -->
    <!-- <sliderMenu></sliderMenu> -->
    <slider></slider>
    <story-list :story-list-arr="storyListArr" v-load-more="loaderMore" type="2"></story-list>
    <!-- 遮罩层 -->
    <div class="menu-mask" v-if="isShowMenu" @click="toggleMenu"></div>
    <!-- 页面子路由 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import headTop from 'src/components/header/head'
import slider from './children/slider'
import storyList from 'src/components/common/storylist'
// import sliderMenu from 'src/pages/menu/menu'
import { latestNews, beforeNews } from 'src/service/getData'

export default {
  name: 'home',
  data () {
    return {
      headerTitle: '首页',
      date: '', // 每一批加载9个story
      storyListArr: [], // 新闻列表数据
      preventRepeatRequest: false, // 到达底部加载数据，防止重复加载
      showLoading: true // 显示加载动画
    }
  },
  components: {
    // headTop,
    slider,
    storyList
    // sliderMenu
  },
  computed: {
    ...mapState(['isShowMenu'])
  },
  methods: {
    ...mapActions(['toggleMenu']),
    initData () {
      // 获取数据
      latestNews().then(res => {
        this.storyListArr = res.stories
        this.date = res.date
      })
    },
    loaderMore () {
      if (this.preventRepeatRequest) {
        return
      }
      this.preventRepeatRequest = true
      // 加载更多
      beforeNews(this.date).then(res => {
        this.storyListArr = [...this.storyListArr, ...res.stories]
        this.date = res.date
        this.preventRepeatRequest = false
      })
    }
  },
  mounted () {
    this.initData()
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