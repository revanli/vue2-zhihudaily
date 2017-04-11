<!-- 详情页 -->
<template>
<div>
  <!-- 详情页头部 -->
  <detail-header></detail-header>

  <section class="detail">
    <div class="container">
      <!-- 详情页图 -->
      <section class="detail-cover" v-if="image" :style="{ backgroundImage: 'url(' + replaceImgUrl(image) + ')'}">
        <div class="detail-cover-mask">
          <h1 class="detail-title">{{ title }}</h1>
          <p class="detail-image-source">{{ imageSource }}</p>
        </div>
      </section>

      <!-- 推荐者 -->
      <section class="recommenders" v-if="recommenders.length > 0">
        <!-- <router-link :to="/recommenders"> -->
          <p>推荐者</p>
          <div class="recomentders-item" v-for="item in recommenders">
            <figure>
              <img :src="replaceImgUrl(item.avatar)">
            </figure>
          </div>
        <!-- </router-link> -->
      </section>

      <!-- 主体内容 -->
      <detail-content :content="detailContent"></detail-content>

      <!-- 合集 -->
      <section v-if="section.name" class="section">
        <router-link :to="{path: '/section'}" class="section-link">
          <img :src="replaceImgUrl(thumbnail)">
          <p>本文来自: {{ section.name }} • 合集</p>
          <div class="arrow"></div>
        </router-link>
      </section>

    </div>
  </section>
</div>
</template>

<script>
import detailHeader from 'src/components/header/head'
import detailContent from './children/detailContent'
import { replaceImgUrl } from 'src/components/common/mixin'
import { newContent } from 'src/service/getData'

export default {
  data () {
    return {
      title: '',  // 新闻标题
      image: '', // 新闻图片
      imageSource: '', // 新闻图片来源
      thumbnail: '',  // 合集缩略图
      section: {}, // 合集
      recommenders: [],  // 推荐人
      detailContent: ''   // 消息实体
    }
  },
  components: {
    detailHeader,
    detailContent
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      let newId = this.$route.params.id
      newContent(newId).then(res => {
        this.detailContent = res.body
        this.image = res.image
        this.title = res.title
        this.imageSource = res.image_source
        this.recommenders = res.recommenders ? res.recommenders : []
        if (res.section) {
          this.section = res.section
          this.thumbnail = res.section.thumbnail
        }
      })
    }
  },
  mixins: [replaceImgUrl]
}
</script>

<style lang="scss">
.detail {
  margin-top: 50px;
}
.detail-cover {
  position: relative;
  z-index: 0;
  height: 200px;
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