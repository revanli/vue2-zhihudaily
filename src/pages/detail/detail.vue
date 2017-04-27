<!-- 详情页 -->
<template>
<div>
  <!-- loading -->
  <loading :story-list="detailContent"></loading>
  <!-- 详情页头部 -->
  <detail-header :flag="true"></detail-header>

  <section class="detail">
    <div class="container">
      <!-- 详情页图 -->
      <section class="detail-cover" v-if="image" :style="{ backgroundImage: 'url(' + image + ')'}">
        <div class="detail-cover-mask">
          <h1 class="detail-title">{{ title }}</h1>
          <p class="detail-image-source">{{ imageSource }}</p>
        </div>
      </section>

      <!-- 主体内容 -->
      <detail-content :content="detailContent"></detail-content>

      <!-- 回到顶部组件 -->
      <scroll-to-top :scroller="scroller"></scroll-to-top>

    </div>
  </section>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
import detailHeader from 'src/components/header/head'
import detailContent from './children/detailContent'
import { newContent, extraNews } from 'src/service/getData'
import loading from 'src/components/common/loading'
import scrollToTop from 'src/components/common/scrollToTop'

export default {
  data () {
    return {
      title: '',  // 新闻标题
      image: '', // 新闻图片
      imageSource: '', // 新闻图片来源
      detailContent: '',   // 消息实体
      extra: {},  // 新闻附加信息
      scroller: null
    }
  },
  components: {
    detailHeader,
    detailContent,
    loading,
    scrollToTop
  },
  mounted () {
    this.scroller = this.$el
  },
  methods: {
    initData () {
      const newId = this.$route.params.id
      // 保存进vuex
      this.SAVE_DETAILID(newId)
      newContent(newId).then(res => {
        this.detailContent = res.body
        this.image = res.image
        this.title = res.title
        this.imageSource = res.image_source
      })
    },
    ...mapMutations([
      'SAVE_DETAILID', 'SAVE_SECTIONID'
    ])
  },
  activated () {
    this.initData()
  },
  deactivated () {
    this.detailContent = ''
    this.image = ''
    this.title = ''
    this.imageSource = ''
  },
  watch: {},
  beforeRouteEnter (to, from, next) {
    // detect which page from
    next()
  }
}
</script>

<style lang="scss">
.detail-cover {
  position: relative;
  z-index: 0;
  height: 310px;
  width: 100%;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  .detail-cover-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 100%);
    background-image: linear-gradient(bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 100%);
  }
  .detail-title {
    position: absolute;
    bottom: 23px;
    line-height: 1.2;
    left: 0;
    padding: 0 18px;
    font-weight: 300;
    font-size: 21px;
    color: #ffffff;
  }
  .detail-image-source {
    position: absolute;
    bottom: 8px;
    right: 0;
    padding: 0 18px;
    font-weight: 300;
    font-size: 12px;
    color: #d3d3d3;
  }
}
</style>