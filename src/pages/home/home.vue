<template>
<div id="wrapper">
  <head-top></head-top>
  <slider></slider>
  <story-list></story-list>
</div>
</template>

<script>
import headTop from 'src/components/header/head'
import slider from './children/slider'
import storyList from 'src/components/common/storylist'
import { latestNews } from 'src/service/getData'

export default {
  components: {
    headTop,
    slider,
    storyList
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