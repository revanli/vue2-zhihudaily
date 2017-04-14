<template>
  <header class="head">
    <div class="container">
      <div class="header-icon header-goback" v-if="goBack" @click="back">
        <i class="iconfont">&#xe603</i>
      </div>
      <div class="header-icon" v-if="isHome" @click="toggleMenu">
        <i class="iconfont">&#xe612</i>
      </div>
      <div class="header-title">
        <span>{{ headerTitle}}</span>
      </div>
      <div class="header-icon" v-if="isHome">
        <i class="iconfont">&#Xe610</i>
      </div>
      <div class="header-icon" v-if="isHome"> 
        <i class="iconfont">&#Xe619</i>
      </div>
      <slot name="header-detail"></slot>
      <slot name="header-comments"></slot>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['goBack', 'headerTitle', 'isHome'],
  methods: {
    ...mapActions(['toggleMenu']),
    back () {
      window.history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.head > .container {
  position: fixed;
  display: flex;
  flex-direction: row;
  transform: translateZ(0);
  top: 0;
  z-index: 4;
  height: 50px;
  width: 100%;
  background: #00A2EA;
  .header-icon {
    cursor: pointer;
    flex:1;
    text-align: center;
    > i {
      line-height: 53px;
    }
  }
  .header-title {
    flex: 6;
    padding-left: 10px;
    > span {
      line-height: 50px;
      color: #ffffff;
      font-size: 16px;
    }
  }
}
.iconfont {
  font-family: "iconfont";
  font-size: 19px;
  font-style: normal;
  color: #fff;
}
</style>