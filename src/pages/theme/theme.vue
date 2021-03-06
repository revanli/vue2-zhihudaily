<!-- 主题日报列表 -->
<template>
<div>
  <!-- 详情页头部 -->
  <theme-header :flag="false"></theme-header>

  <!-- loading -->
  <loading :storyList="stories"></loading>

  <div class="theme">
    <div class="container">

      <!-- 封面 -->
      <section class="theme-cover" :style="{ backgroundImage: 'url(' + bgImg + ')' }">
        <h1 class="theme-description">{{ description }}</h1>
        <p class="theme-image-source">{{ imageSource }}</p>
      </section>

      <!-- 主编 -->
      <section class="theme-editor" v-if="editors.length > 0">
        <p>主编</p>
        <router-link :to="{path: '/'}" v-for="item in editors" :key="item.id">
          <div class="editors-item">
            <img :src="item.avatar" alt="">
          </div>
        </router-link>
      </section>

      <!-- 列表 -->
      <section class="theme-list">
        <div class="storylist">
          <div class="container">
            <ul>
              <router-link :to="'/detail/' + item.id" v-for="item in stories" tag="li" :key="item.id" class="list-detail">
                <section class="list-content">
                  <hgroup class="list-title">
                    <p>{{ item.title }}</p>
                    <p class="time" v-if="item.display_date">{{ item.display_date }}</p>
                  </hgroup>
                  <figure class="list-img" v-if="item.images">
                    <img :src="item.images[0]">
                    <figcaption v-if="item.multipic" class="tip"><i class="iconfont">&#xe61c</i>多图</figcaption>
                  </figure>
                </section>
              </router-link>
            </ul>
          </div>
        </div>
      </section>

      <!-- 滑动加载更多组件 -->
      <infinite-scroll :scroller="scroller" :loading="showLoading" @load="loaderMore"></infinite-scroll>
      <!-- 回到顶部组件 -->
      <scroll-to-top :scroller="scroller"></scroll-to-top>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import themeHeader from 'src/components/header/head'
import { themeConent, themeConentBefore } from 'src/service/getData'
import infiniteScroll from 'src/components/common/infiniteScroll'
import scrollToTop from 'src/components/common/scrollToTop'
import loading from 'src/components/common/loading'

export default {
  components: {
    themeHeader,
    infiniteScroll,
    scrollToTop,
    loading
  },
  data () {
    return {
      editors: [],
      stories: [],
      bgImg: '',
      description: '',
      imageSource: '',
      storyId: '',   // 主题ID
      scroller: null,
      preventRepeatRequest: false,
      showLoading: false
    }
  },
  computed: {
    ...mapState(['isShowMenu'])
  },
  mounted () {
    this.scroller = this.$el
  },
  watch: {},
  methods: {
    ...mapActions(['toggleMenu']),
    initData () {
      let themeId = this.$route.params.id
      if (themeId && themeId < 100) {
        themeConent(themeId).then(res => {
          this.editors = res.editors
          this.stories = res.stories
          this.bgImg = res.background
          this.description = res.description
          this.imageSource = res.image_source
          this.storyId = this.stories[this.stories.length - 1].id
        })
      }
    },
    loaderMore () {
      if (this.preventRepeatRequest || this.storyId === '') {
        return
      }
      let themeId = this.$route.params.id
      this.showLoading = true
      this.preventRepeatRequest = true
      // 加载更多
      themeConentBefore(themeId, this.storyId).then(res => {
        this.showLoading = false
        this.stories = [...this.stories, ...res.stories]
        this.storyId = res.stories[res.stories.length - 1].id
        this.preventRepeatRequest = false
      })
    },
    clearData () {
      this.editors = []
      this.stories = []
      this.bgImg = ''
      this.description = ''
      this.imageSource = ''
      this.storyId = ''
    }
  },
  activated () {
    this.initData()
  },
  deactivated () {
    this.editors = []
    this.stories = []
    this.bgImg = ''
    this.description = ''
    this.imageSource = ''
    this.storyId = ''
  },
  watch: {
    '$route': 'initData'
  }
}
</script>

<style lang="scss" scoped>
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
.theme-cover {
  position: relative;
  z-index: 0;
  height: 310px;
  width: 100%;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  .theme-cover-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 100%);
    background-image: linear-gradient(bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 100%);
  }
  .theme-description {
    position: absolute;
    bottom: 23px;
    line-height: 1.2;
    left: 0;
    padding: 0 18px;
    font-weight: 300;
    font-size: 21px;
    color: #ffffff;
  }
  .theme-image-source {
    position: absolute;
    bottom: 8px;
    right: 0;
    padding: 0 18px;
    font-weight: 300;
    font-size: 12px;
    color: #d3d3d3;
  }
}
.theme-list {
  padding: 1px 5px 0 5px;
  background: #f2f2f2;
}
.theme-editor {
  background: #efefef;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 50px;
  p {
    position: absolute;
    top: 13px;
    left: 15px;
    font-size: 13px;
    font-weight: bold;
  }
  .editors-item {
    height: 30px;
    width: 30px;
    margin: 7px 7px 0 7px;
    > img {
      height: 30px;
      width: 30px;
      border-radius: 50%;
    }
  }
}

// story-list
.iconfont {
  font-family:"iconfont";
  font-size: 10px;
  font-style:normal;
  color: #ffffff;
  margin-right: 3px;
}
.list-detail {
  position: relative;
  min-height: 63px;  
  width: 97%;
  margin: 8px auto 0 auto;
  background: #ffffff;
  padding: 13px;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  border-bottom: 1px solid #d0d0d0;
  cursor: pointer;
  .list-content {
    display: flex;
    flex-direction: row;
    .list-title {
      margin-right: 10px;
      flex: 1;
      p {
        font-size: 17px;
        line-height: 1.2;
      }
      .time {
        position: absolute;
        bottom: 10px;
        left: 13px;
        font-size: 13px;
        color: #b0b0b0;
      }
    }
  }
  .list-img {  
    position: relative;
    width: 75px;
    height: 70px;
    > img {
      width: 75px;
      height: 70px;
    }
    .tip {
      color: #ffffff;
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: 10px;
      padding: 2px 4px;
      background: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>

