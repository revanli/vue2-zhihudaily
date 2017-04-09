<template>
<div>
  <head-top></head-top>
  <slider></slider>
</div>
</template>

<script>
import headTop from '../../components/header/head'
import slider from './children/slider'
import { latestNews } from '../../service/getData'

export default {
  components: {
    headTop,
    slider
  },
  data () {
    return {
      // topStories: {}
    }
  },
  mounted () {
    // 获取最新的消息
    // latestNews().then(res => {
    //   this.topStories = res.top_stories
    // })
  }
}
</script>