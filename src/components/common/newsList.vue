<template>
  <div class="storylist">
    <div class="container">
      <ul>
        <router-link :to="'/detail/' + item.id" v-for="item in storyListArr" tag="li" :key="item.id" class="list-detail">
          <section class="list-content">
            <hgroup class="list-title">
              <p>{{ item.title }}</p>
              <p class="time" v-if="item.display_date">{{ item.display_date }}</p>
            </hgroup>
            <figure class="list-img" v-if="item.images">
              <!-- <img :src="replaceImgUrl(item.images[0])" alt=""> -->
              <img :src="item.images[0]" alt="">
              <figcaption v-if="item.multipic" class="tip"><i class="iconfont">&#xe61c</i>多图</figcaption>
            </figure>
          </section>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  // name: 'storylist',
  props: ['storyListArr'],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
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