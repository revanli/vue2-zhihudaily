<template>
  <nav class="swiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" 
             v-for="(item, index) in topStories" :key="index" 
             :style="{ backgroundImage: 'url(' + item.image + ')'}">
          <router-link :to="'/detail/' + item.id" :key="item.id">
            <div class="swiper-mask"></div>
            <h1 class="swiper-title">{{ item.title }}</h1>
          </router-link>
        </div>
      </div>
      <!-- Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </nav>
</template>

<script>
import Swiper from 'swiper'
import { latestNews } from 'src/service/getData'

export default {
  data () {
    return {
      topStories: {}
    }
  },
  mounted () {
    // 获取最新的stories
    latestNews().then(res => {
      this.topStories = res.top_stories
    }).then(() => {
      new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: 4000,
        autoplayDisableOnInteraction: false,
        observer: true,
        lazyLoading: true,
        resistanceRatio: 0
      })
    })
  }
}
</script>

<style lang="scss">
@import '../../../style/swiper.min.css';
.swiper-container {
  height: 310px;
}
.swiper-slide {
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  .swiper-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 100%);
    background-image: linear-gradient(bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 100%);
  }
  .swiper-title {
    position: absolute;
    bottom: 23px;
    line-height: 1.2;
    left: 0;
    padding: 0 18px;
    font-weight: 300;
    font-size: 21px;
    color: #ffffff;
  }
}
.swiper-pagination-bullet {
  width: 6px;
  height: 6px;
  display: inline-block;
  border-radius: 100%;
  background: #5a5a5a;
  opacity: .8;
}
.swiper-pagination-bullet-active {
  opacity: 1;
  background: #f4f5ff;
}
</style>