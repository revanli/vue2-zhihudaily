<!-- section -->
<template>
  <div>
    <section-header :headerTitle="name"></section-header>

    <story-list :story-list-arr="stories" v-load-more="loaderMore"></story-list>
  </div>
</template>

<script>
  import sectionHeader from 'src/components/header/head'
  import storyList from 'src/components/common/storyList'
  import { sections, beforeSectionNews } from 'src/service/getData'
  export default {
    data () {
      return {
        stories: [],
        timestamp: '',
        name: '',
        sectionId: '',
        preventRepeatRequest: false
      }
    },
    components: {
      sectionHeader,
      storyList
      // storyList
    },
    mounted () {
      sections().then(res => {
        this.stories = res.stories
        this.timestamp = res.timestamp
        this.name = res.name
      })
    },
    methods: {
      loaderMore () {
        if (this.preventRepeatRequest) {
          return
        }
        this.preventRepeatRequest = true
        // 加载更多
        beforeSectionNews(this.timestamp).then(res => {
          this.stories = [...this.stories, ...res.stories]
          this.timestamp = res.timestamp
          this.preventRepeatRequest = false
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .list {
    margin-top: 50px;
    padding: 1px 5px 0 5px;
    background: #f2f2f2;
  }
</style>