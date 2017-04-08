<template>
  <nav class="slider">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <!-- <div v-for="item in top_stories" class="swiper-slide" :style="{ backgroundImage: 'url(' + replace(item.image) + ')' }" v-link="{name: 'detail', params: { id: item.id }}"> -->
          <div class="swiper-mask"></div>
          <h1 class="slider-title"></h1>
        </div>
      </div>
      <!-- Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </nav>
</template>

<script>
import 'src/plugins/swiper.min.js'
export default {
  props: ['top_stories'],
  data () {
    return {
    }
  },
  mounted () {

  },
  methods: {
    replaceImageUrl () {
      return str.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
    }
  }
}
</script>

<style lang='scss'>
@import 'src/style/swiper.min.css';
  
</style>