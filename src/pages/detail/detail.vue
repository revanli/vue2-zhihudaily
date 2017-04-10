<!-- 详情页 -->
<template>
<div>
  <!-- 详情页头部 -->
  <detail-header></detail-header>

  <section class="detail">
    <div class="container">
      <!-- 详情页图 -->
      <section class="detail-thumbnail" v-if="thumbnail" :style="{ backgroundImage: 'url(' + replaceImgUrl(thumbnail) + ')'}">
        <div class="detail-thumbnail-mask">
          <h1 class="detail-title">{{ title }}</h1>
          <p class="detail-image-source">{{ imageSource }}</p>
        </div>
      </section>

      <!-- 推荐者 -->
      <section class="recommenders">
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