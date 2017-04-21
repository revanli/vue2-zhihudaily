<template>
<div>
  <recommend-header :headerTitle="'推荐者'"></recommend-header>

  <!-- 推荐者 -->
  <section>
    <ul>
      <p v-if="recommenders" class="title">本文推荐者</p>
      <li v-for="item in recommenders">
        <a :href="'http://www.zhihu.com/people/' + item.zhihu_url_token">
          <div class="img-box">
            <img :src="item.avatar" alt="">
          </div>
          <div class="info">
            <p class="name">{{ item.name }}</p>
            <p class="bio">{{ item.bio }}</p>
          </div>
        </a>
      </li>
      <li v-for="item in editors">
        <a :href="'http://www.zhihu.com/people/' + item.zhihu_url_token">
          <div class="img-box">
            <img :src="item.avatar" alt="">
          </div>
          <div class="info">
            <p class="name">{{ item.name }} <span class="zhubian">主编</span> </p>
            <p class="bio">{{ item.bio }}</p>
          </div>
        </a>
      </li>
    </ul>
  </section>
</div>
</template>

<script>
import { mapState } from 'vuex'
import recommendHeader from 'src/components/header/head'
import { recommenders } from 'src/service/getData'

export default {
  data () {
    return {
      recommenders: [],
      editors: []
    }
  },
  computed: {
    ...mapState([
      'detailId'
    ])
  },
  created () {
    this.getRecommend()
  },
  route: {
    destroyed (transition) {
      this.recommenders = []
      this.editors = []
      transition.next()
    }
  },
  methods: {
    getRecommend () {
      recommenders(this.detailId).then(res => {
        this.recommenders = res.items[0].recommenders
        if (res.editors) {
          this.editors = res.editors
        }
      })
    }
  }
}
</script>


<style scoped lang="scss">
  ul {
    padding: 15px;
    margin-top: 50px;
    .title {
      color: #8c8c8c;
      margin-bottom: 15px;
      font-size: 13px;
    }
    li {
      padding: 10px 0;
      border-top: 1px solid #d1d1d1;
      a {
        display: flex;
        flex-direction: row;
        overflow: hidden;
        .img-box {
          height: 40px;
          width: 40px;
          img{
            height: 40px;
            width: 40px;
            border-radius: 50%;
          }
        }
        .info {
          margin-left: 10px;
          .name {
            font-size: 15px;
            font-weight: bold;
            color: #000;
            .zhubian {
              display: inline-block;
              width: 40px;
              height: 20px;
              background: #4ed1ad;
              border-radius: 5px;
              color: #ffffff;
              font-size: 13px;
              line-height: 20px;
              text-align: center;
              margin-left: 10px;
            }
          }
          .bio {
            color: #8c8c8c;
            font-size: 12px;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>