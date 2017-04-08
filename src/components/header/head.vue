<template>
  <header class="head">
    <div class="container">
      <div class="header-icon"><i class="iconfont">&#xe612</i></div>
      <div class="header-title"><p>首页</p></div>
      <div class="header-icon"><i class="iconfont">&#Xe610</i></div>
      <div class="header-icon"><i class="iconfont">&#Xe619</i></div>
      <!-- <div class="head-icon" @click="showBar"><i class="iconfont">&#xe612</i></div> -->
    </div>
  </header>
</template>

<script>
  export default {

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
  .header-icon{
    cursor: pointer;
    flex:1;
    text-align: center;
    >i {
      line-height: 53px;
    }
  }
  .header-title {
    flex: 6;
    padding-left: 10px;
    >p {
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