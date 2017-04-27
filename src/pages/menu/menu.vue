<template>
  <aside class="menu" :class="{'show-menu': isShowMenu, 'docked': isDocked}">
    <ul>
      <router-link :to="{path: '/'}" class="link-home" tag="li">
        <span @click="toggle">首页</span>
        <i class="iconfont icon-ic_star"></i>
      </router-link>
      <router-link :to="'/theme/' + item.id" v-for="item in themeList" tag="li" :key="item.id" class="theme">
        <span @click="toggle">{{ item.name }}</span>
        <i class="iconfont icon-ic_star_black"></i>
      </router-link>
    </ul>
    <div class="cover" @click="toggle"></div>
  </aside>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { themes } from 'src/service/getData'

export default {
  data () {
    return {
      themeList: []   // 主题列表
    }
  },
  mounted () {
    this.initData()
  },
  computed: {
    ...mapState([
      'isShowMenu',
      'isDocked'
    ])
  },
  methods: {
    initData () {
      themes().then(res => {
        this.themeList = [...res.others]
      })
    },
    ...mapActions([
      'toggleMenu',
      'toggleDocked'
    ]),
    // hideMenu () {
    //   this.toggleMenu()
    // },
    toggle () {
      this.toggleMenu()
      setTimeout(() => {
        this.toggleDocked()
      }, 300)
    }
  },
  route: {
  }
}
</script>

<style lang="less">
.menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  visibility: hidden;
  z-index: 99;
  &::-webkit-scrollbar {
    display: none!important;
    width: 0!important;
    height: 0!important;
    -webkit-appearance: none;
    opacity: 0!important;
  }
  ul {
    margin: 0;
    float: left;
    width: 60%;
    height: 100%;
    padding: 1.3rem 0.5rem 0.5rem;
    overflow: auto;
    background: rgba(91,116,146,0.75);
    transform: translate(-100%, 0);
    transition: transform 0.8s ease;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none!important;
      width: 0!important;
      height: 0!important;
      -webkit-appearance: none;
      opacity: 0!important;
    }
  }
  li {
    cursor: pointer;
    font-size: 0.43rem;
    list-style: none;
    color: #fff;
    margin-top: 20px;
    .iconfont {
      float: right;
      font-size: 0.5rem;
      color: #fff;
    }
    span {
      color: #fff;
    }
  }
  .cover {
    width: 100%;
    height: 100%;
    opacity: 0;
    display: none;
    background: rgba(172, 185, 201, 0.40);
    transition: opacity 0.3s ease;
  }
  &.show-menu {
    ul {
      transform: translate(0);
    }
    .cover {
      opacity: 1;
    }
  }
  &.docked {
    visibility: visible;
    .cover {
      display: block;
    }
  }
}
</style>