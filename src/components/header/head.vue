<template>
  <header class="header">
    <div class="container">
      <div class="header-icon header-goback" v-if="goBack" @click="back">
        <i class="iconfont icon-ic_back"></i>
      </div>
      <div class="header-icon" v-if="isHome" @click="toggleMenu">
        <i class="iconfont icon-ic_menu"></i>
      </div>
    </div>
  </header>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: ['goBack', 'isHome'],
  methods: {
    ...mapActions(['toggleMenu']),
    back () {
      window.history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  .container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 1.5rem;
    z-index: 9;
    padding-left: 5%;
    background-image: linear-gradient(0deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.51) 95%);
    .iconfont {
      position: relative;
      color: #fff;
      font-size: 0.8rem;
      top: 20%;
    }
  }
}
</style>