<template>
  <header class="header">
    <div class="container">
      <div class="header-icon header-goback" v-if="flag" @click="back">
        <i class="iconfont icon-ic_back"></i>
      </div>
      <div class="header-icon" v-else @click="toggle">
        <i class="iconfont icon-ic_menu"></i>
      </div>
    </div>
  </header>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: ['flag'],
  methods: {
    ...mapActions(['toggleMenu', 'toggleDocked']),
    back () {
      window.history.back()
    },
    toggle () {
      this.toggleMenu()
      setTimeout(() => {
        this.toggleDocked()
      }, 100)
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
    height: 45px;
    z-index: 9;
    padding-left: 3%;
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