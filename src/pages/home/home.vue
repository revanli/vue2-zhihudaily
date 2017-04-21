<template>
  <div class="home">
    <!-- header & slider common components -->
    <head-top :is-home="true" :header-title="headerTitle" :go-back="false"></head-top>
    <swiper></swiper>
    <section class="section-stories" :class="'story-' + item.date" v-for="item in allStories">
      <h2 class="time-title">{{item.date | dateTime}}</h2>
      <news-list :story-list-arr="item.stories" type="2"></news-list>
    </section>
    <!-- 遮罩层 -->
    <div class="menu-mask" v-if="isShowMenu" @click="toggleMenu"></div>
    <!-- 滑动加载更多组件 -->
    <infinite-scroll :scroller="scroller" :loading="showLoading" @load="loaderMore" />
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
import { latestNews, beforeNews } from 'src/service/getData'

export default {
  name: 'home',
  data () {
    return {
      headerTitle: '首页',
      date: '', // 每一批加载9个story
      allStories: [], // 所有新闻
      storyListArr: [], // 新闻列表数据
      preventRepeatRequest: false, // 到达底部加载数据，防止重复加载
      showLoading: false, // 显示加载动画
      scroller: null
    }
  },
  components: {
    headTop,
    swiper,
    newsList,
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