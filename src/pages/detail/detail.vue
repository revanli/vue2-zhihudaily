<!-- 详情页 -->
<template>
<div>
  <!-- 详情页头部 -->
  <detail-header :is-home="false" :header-title="headerTitle" :go-back="true">
    <div slot="header-detail" class="header-detail">
      <div class="header-icon">
        <i class="iconfont">&#xe61f</i>
      </div>
      <div class="header-icon">
        <i class="iconfont">&#xe604</i>
      </div>
      <div class="header-icon">
        <router-link to="/comments" class="link-icon">
          <i class="iconfont">&#xe606</i>
          <span>{{ extra.comments }}</span>
        </router-link>
      </div>
      <div class="header-icon">
        <i class="iconfont">&#xe611</i>
        <span>{{ extra.popularity }}</span>
      </div>
    </div>
  </detail-header>

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
        <router-link to="/recommenders">
          <p>推荐者</p>
          <div class="recomentders-item" v-for="item in recommenders">
            <figure>
              <img :src="replaceImgUrl(item.avatar)">
            </figure>
          </div>
        </router-link>
      </section>

      <!-- 主体内容 -->
      <detail-content :content="detailContent"></detail-content>

      <!-- 合集 -->
      <section v-if="section.name" class="section">
        <router-link to="/section" class="section-link">
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
// import { replaceImgUrl } from 'src/components/common/mixin'
import { newContent, extraNews } from 'src/service/getData'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      headerTitle: '', // 导航栏标题
      title: '',  // 新闻标题
      image: '', // 新闻图片
      imageSource: '', // 新闻图片来源
      thumbnail: '',  // 合集缩略图
      section: {}, // 合集
      recommenders: [],  // 推荐人
      detailContent: '',   // 消息实体
      extra: {}  // 新闻附加信息
    }
  },
  components: {
    detailHeader,
    detailContent
  },
  mounted () {
    this.initData()
  },
  created () {
    this.getExtraData()
  },
  watch: {
    '$route': 'getExtraData'
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
        this.recommenders = res.recommenders ? res.recommenders : []
        if (res.section) {
          this.section = res.section
          this.thumbnail = res.section.thumbnail
        }
      })
    },
    getExtraData () {
      const newId = this.$route.params.id
      extraNews(newId).then(res => {
        this.extra = res
        this.SAVE_EXTRA(res)
      })
    },
    ...mapMutations([
      'SAVE_DETAILID', 'SAVE_EXTRA'
    ])
  }
}
</script>

<style lang="scss">
.header-detail {
  display: flex;
  flex-direction: row;
  width: 50%;
  .header-icon {
    cursor: pointer;
    flex: 1;
    text-align: center;
    i {
      line-height: 53px;
    }
    .link-icon {
      font-size: 18px;
    }
  }
}
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