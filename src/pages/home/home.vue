<template>
  <div class="home">
    <!-- header & slider common components -->
    <head-top :is-home="true" :go-back="false"></head-top>
    <swiper></swiper>

    <section class="section-stories" :class="'story-' + item.date" v-for="item in allStories">
      <h2 class="time-title">{{item.date | dateTime}}</h2>
      <news-list :story-list-arr="item.stories" type="2"></news-list>
    </section>

    <!-- loading -->
    <loading :storyList="allStories"></loading>
    <!-- 遮罩层 -->
    <!-- 滑动加载更多组件 -->
    <infinite-scroll :scroller="scroller" :loading="showLoading" @load="loaderMore"></infinite-scroll>
    <!-- 回到顶部组件 -->
    <scroll-to-top :scroller="scroller"></scroll-to-top>
    <!-- 页面子路由 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import headTop from 'src/components/header/head'
import swiper from './children/slider'
import newsList from 'src/components/common/newsList'
import infiniteScroll from 'src/components/common/infiniteScroll'
import scrollToTop from 'src/components/common/scrollToTop'
import loading from 'src/components/common/loading'
import { latestNews, beforeNews } from 'src/service/getData'

export default {
  name: 'home',
  data () {
    return {
      headerTitle: '首页',
      date: '',
      allStories: [],
      storyListArr: [],
      preventRepeatRequest: false,
      showLoading: false,
      scroller: null
    }
  },
  components: {
    headTop,
    swiper,
    newsList,
    loading,
    scrollToTop,
    infiniteScroll
  },
  computed: {
    ...mapState(['isShowMenu'])
  },
  methods: {
    ...mapActions(['toggleMenu']),
    initData () {
      // 获取数据
      latestNews().then(res => {
        this.allStories = this.allStories.concat(res)
        this.storyListArr = res.stories
        this.date = res.date
      })
    },
    loaderMore () {
      if (this.preventRepeatRequest) {
        return
      }
      this.showLoading = true
      this.preventRepeatRequest = true
      // 加载更多
      beforeNews(this.date).then(res => {
        this.allStories = this.allStories.concat(res)
        this.storyListArr = [...this.storyListArr, ...res.stories]
        this.date = res.date
        this.preventRepeatRequest = false
        this.showLoading = false
      })
    }
  },
  mounted () {
    this.initData()
    this.scroller = this.$el
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
.time-title {
  color: #76787e;
  margin-left: 15px;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 500;
}
.section-stories {
  padding: 10px 5px 0 5px;
  background: #f2f2f2;
}
</style>