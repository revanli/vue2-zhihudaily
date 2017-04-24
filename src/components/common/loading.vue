<template>
  <div class="loading" v-if="!storyList.length || !storyList">
    <span class="left"></span>
    <span class="middle"></span>
    <span class="right"></span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // refreshing: false
      }
    },
    props: ['storyList']
  }
</script>

<style lang="scss">
// @#FFD300: #FFD300;
// @blue: #5B7492;
// #acb9c8: #acb9c8;
.loading {
  width: 25%;
  height: 0.4rem;
  margin: 25% auto 0;
  position: relative;
  span {
    display: block;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    position: absolute;
    background: #5B7492;
    transform: translate(-50%,0);
  }
  .left {
    background: #FFD300;
    animation: lMove 2.5s ease infinite;
  }
  .middle {
    left: 50%;
    animation: mMove 2.5s ease infinite;
  }
  .right {
    left: 100%;
    background: #acb9c8;
    animation: rMove 2.5s ease infinite;
  }
}
@keyframes lMove {
  0% {
    left: 0;
  }
  25% {
    left: 50%;
    background: #acb9c8;
  }
  50% {
    left: 100%;
    background: #5B7492;
  }
  75% {
    left: 50%;
    background: #acb9c8;
  }
  100% {
    left: 0;
  }
}
@keyframes mMove {
  0% {}
  25% {
    background: #5B7492;
  }
  50% {
    background: #acb9c8;
  }
  75% {
    background: #5B7492;
  }
  100% {}
}
@keyframes rMove {
  0% {
    left: 100%;
  }
  25% {
    left: 50%;
  }
  50% {
    left: 0;
    background: #acb9c8;
  }
  75% {
    left: 50%;
    background: #acb9c8;
  }
  100% {
    left: 100%;
  }
}
</style>
