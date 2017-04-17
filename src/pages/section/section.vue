<!-- section -->
<template>
  <div>
    <section-header :headerTitle="name" :go-back="true"></section-header>

    <section-list :story-list-arr="stories" v-load-more="loaderMore"></section-list>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import sectionHeader from 'src/components/header/head'
  import sectionList from 'src/components/common/storyList'
  import { sections, beforeSectionNews } from 'src/service/getData'

  export default {
    data () {
      return {
        stories: [],
        timestamp: '',
        name: '',
        preventRepeatRequest: false
      }
    },
    components: {
      sectionHeader,
      sectionList
      // storyList
    },
    mounted () {
      sections(this.sectionId).then(res => {
        this.stories = res.stories
        this.timestamp = res.timestamp
        this.name = res.name
      })
    },
    computed: {
      ...mapState([
        'sectionId'
      ])
    },
    methods: {
      loaderMore () {
        if (this.preventRepeatRequest) {
          return
        }
        this.preventRepeatRequest = true
        // 加载更多
        beforeSectionNews(this.sectionId, this.timestamp).then(res => {
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