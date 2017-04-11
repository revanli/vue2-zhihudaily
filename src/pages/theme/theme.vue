<!-- 主题日报列表 -->
<template>

  

  <div class="theme">
    <div class="container">

      <!-- 详情页头部 -->
      <theme-header></theme-header>
      
      <!-- 封面 -->
      <section class="theme-cover" :style="{ backgroundImage: 'url(' + replaceImgUrl(bgImg) + ')' }">
        <h1 class="theme-description">{{ description }}</h1>
        <p class="theme-image-source">{{ imageSource }}</p>
      </section>

      <!-- 主编 -->
      <section class="theme-editor" v-if="editors.length > 0">
        <router-link :to="{path: '/'}">
          <p>主编</p>
          <div class="editors-item" v-for="item in editors">
            <img :src="replaceImgUrl(item.avatar)" alt="">
          </div>
        </router-link>
      </section>

      <!-- 列表 -->
      <section class="theme-list">
        <!-- <story-list v-for="item in stories" :item="item"></story-list> -->
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
                    <img :src="replaceImgUrl(item.images[0])" alt="">
                    <figcaption v-if="item.multipic" class="tip"><i class="iconfont">&#xe61c</i>多图</figcaption>
                  </figure>
                </section>
              </router-link>
            </ul>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import themeHeader from 'src/components/header/head'
import { themeConent, themeConentBefore } from 'src/service/getData'
import { replaceImgUrl } from 'src/components/common/mixin'

export default {
  components: {
    themeHeader
  },
  data () {
    return {
      editors: [],
      stories: [],
      bgImg: '',
      description: '',
      imageSource: '',
      storyId: '',   // 主题ID
      preventRepeatRequest: false
    }
  },
  mounted () {
    this.initData()
    window.addEventListener('scroll', this.loaderMore, false)
  },
  methods: {
    initData () {
      let themeId = this.$route.params.id
      themeConent(themeId).then(res => {
        this.editors = res.editors
        this.stories = res.stories
        this.bgImg = res.background
        this.description = res.description
        this.imageSource = res.image_source
        this.storyId = this.stories[this.stories.length - 1].id
      })
    },
    getThemeBefore () {
      let themeId = this.$route.params.id
      themeConentBefore(themeId, this.storyId).then(res => {
        this.stories = this.stories.concat(res.stories)
        this.storyId = this.stories[this.stories.length - 1].id
      })
    },
    loaderMore () {
      let offsetHeight = window.document.body.offsetHeight
      let scrollTop = window.document.body.scrollTop
      let scrollHeight = window.document.body.scrollHeight
      if (offsetHeight + scrollTop + 100 > scrollHeight && !this.preventRepeatRequest) {
        this.showLoading = true
        this.preventRepeatRequest = true

        // 加载更多
        this.getThemeBefore()
        this.preventRepeatRequest = false
      }
    }
  },
  mixins: [replaceImgUrl]
}
</script>

<style lang="scss">
.theme {
  margin-top: 50px;
}
.theme-cover {
  position: relative;
  z-index: 0;
  height: 230px;
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
