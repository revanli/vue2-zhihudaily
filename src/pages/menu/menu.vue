<template>
  <div class="menu" :class="{'show-menu': isShowMenu}">
    <div class="container">
      <header class="menu-header">
        <div class="user">
          <router-link to="/author" class="link-author">
            <figure class="avatar" @click="toggleMenu">
              <img src="https://avatars2.githubusercontent.com/u/12527604?v=3&s=40" alt="">
            </figure>
            <figcaption class="username">revan</figcaption>
          </router-link>
        </div>
        <div class="user-setting">
          <div>
            <i class="iconfont">&#xe614</i>
            <p>我的收藏</p>
          </div>
          <div>
            <i class="iconfont">&#xe60f</i>
            <p>离线下载</p>
          </div>
        </div>
      </header>
      <section class="themes-list">
        <router-link :to="{path: '/'}" class="link-home">
          <p @click="toggleMenu"><i class="iconfont">&#xe61b</i>首页</p>
        </router-link>
        <ul>
          <router-link :to="'/theme/' + item.id" v-for="item in themeList" tag="li" :key="item.id" class="theme">
            <p @click="toggleMenu">{{ item.name }}</p>
            <i>+</i>
          </router-link>
        </ul>
      </section>
    </div>
  </div>
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
      'isShowMenu'
    ])
  },
  methods: {
    initData () {
      themes().then(res => {
        this.themeList = [...res.others]
      })
    },
    ...mapActions([
      'toggleMenu'
    ]),
    hideMenu () {
      this.toggleMenu()
    }
  },
  route: {
  }
}
</script>

<style lang="scss">
.iconfont {
  font-family: "iconfont";
  font-size: 14px;
  font-style: normal;
  color: #ffffff;
}
.show-menu {
  transform: translateX(290px);
}
.menu {
  position: fixed;
  transform: translateZ(0);
  height: 100%;
  overflow: auto;
  width: 290px;
  left: -290px;
  z-index: 99;
  top: 0;
  bottom: 0;
  transition: all .3s ease;
  &.show-menu {
    transform: translateX(290px);
  }
  .container {
    font-size: 15px;
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}

.menu {
  .menu-header {
    padding: 15px;
    background: #00A2EA;
    .user {
      display: flex;
      flex-direction: row;
      .link-author {
        display: flex;
        flex-direction: row;
      }
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 30px;
          height: 30px;
        }
      }
      .username {
        margin-left: 20px;
        line-height: 30px;
        flex: 1;
        font-size: 18px;
        font-weight: 300;
        color: #ffffff;
      }
    }
  }
  .user-setting {
    margin-top: 25px;
    display: flex;
    flex-direction: row;
    color: #ffffff;
    > div {
      position: relative;
      padding-left: 52px;
      flex: 1;
      font-size: 13px;
      font-weight: 300;
      > p {
        color: #fff;
      }
      > i {
        position: absolute;
        top: 0;
        left: 20px;
      }
    }
  }
}

.themes-list {
  padding-bottom: 20px;
  background: #f9f9f9;
  .link-home p {
    position: relative;
    background: #f9f9f9;
    color: #00A2EA;
    height: 47px;
    line-height: 47px;
    font-size: 15px;
    padding-left: 55px;
    cursor: pointer;
    > i {
      color: #00A2EA;
      font-size: 20px;
      position: absolute;
      top: 0px;
      left: 20px;
    }
  }
  .theme {
    height: 47px;
    line-height: 47px;
    display: flex;
    flex-direction: row;
    padding: 0 15px;
    cursor: pointer;
    > p {
      flex: 1;
    }
    > div {
      padding-right: 40px;
      font-size: 25px;
      font-weight: 200;
      color: #868686;
    }
  }
}
</style>