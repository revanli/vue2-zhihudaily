<!-- 评论页 -->
<template>
<div>
  <comments-header :is-home="false" :header-title="extra.comments + '条点评'" :go-back="true" class="comments-header">
    <div slot="header-comments">
      <div class="header-icon">
        <i class="iconfont">&#xe627</i>
      </div>
    </div>
  </comments-header>

  <!-- 长评 -->
  <section class="long-comments">
    <ul>
      <li class="long-comments-nav">
        <span>{{ extra.long_comments }}条长评</span>
      </li>
      <div v-if="extra.long_comments === 0" class="no-comments">
        <div class="no-comments-icon">
          <i class="iconfont">&#xe62a</i>
          <p>深度长评虚位以待</p>
        </div>
      </div>
      <comment-list @click="show" v-for="item in longComments" :item="item"></comment-list>
    </ul>
  </section>

  <!-- 短评 -->
  <section class="short-comments">
    <ul id="short-comments-top">
      <li class="short-comments-nav" @click="getShortComments">
        <span>{{ extra.short_comments }}条短评</span>
        <i class="iconfont down">&#xe628</i>
      </li>
      <comment-list @click="show" v-for="item in shortComments" :item="item" :key="item.key"></comment-list>
    </ul>
  </section>

  <!-- 评论操作框 -->
  <div v-if="showReply" class="mask" @click="hidden">
    <div class="reply-wrap" @click.stop>
      <p>赞同</p>
      <p>举报</p>
      <p>复制</p>
      <p>回复</p>
    </div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
import commentsHeader from 'src/components/header/head'
import commentList from './children/comment-list'
import { newLongComments, newShortComments, newShortCommentsBefore } from 'src/service/getData'

export default {
  components: {
    commentsHeader,
    commentList
  },
  data () {
    return {
      longComments: [],
      shortComments: [],
      showReply: false,
      id: ''
    }
  },
  computed: {
    ...mapState([
      'detailId','extra'
    ])
  },
  route: {
    beforeRouterEnter (transition) {
      this.getLongComments()
      window.addEventListener('scroll', this.getShortCommentsBefore, false)
      transition.next()
    },
    destroyed (transition) {
      this.shortComments = []
      this.longComments = []
      window.removeEventListener('scroll', this.getShortCommentsBefore, false)
      transition.next()
    }
  },
  methods: {
    getLongComments () {
      newLongComments(this.detailId).then(res => {
        console.log(res)
        this.longComments = res.comments
      })
    },
    getShortComments () {
      newShortComments(this.detailId).then(res => {
        this.shortComments = res.comments
        this.id = this.shortComments[this.shortComments.length - 1].id
      })
    },
    getShortCommentsBefore () {
      newShortCommentsBefore(this.detailId, this.id).then(res => {
        this.shortComments = this.shortComments.concat(res.comments)
        this.id = this.shortComments[this.shortComments.length - 1].id
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .iconfont {
    font-family:"iconfont";
    font-size: 19px;
    font-style:normal;
    color: #ffffff;
    cursor: pointer;
  }
  .comments-header {
    position: fixed;
    transform: translateZ(0);
    top: 0;
    z-index: 4;
    height: 50px;
    width: 100%;
    background: #00A2EA;
    display: flex;
    flex-direction: row;
    .header-icon {
      flex:1;
      text-align: center;
      > i {
        line-height: 53px;
      }
      > span {
        color: #ffffff;
        font-size: 14px;
        margin-left: 3px;
      }
      .collection {
        color: #FFCE00;
      }
    }
    // .header-cont {
    //   flex: 6;
    //   padding-left: 10px;
    //   >p{
    //     line-height: 50px;
    //     color: #ffffff;
    //     font-size:16px;
    //     span{
    //       font-size: 18px;
    //     }
    //   }
    // }
  }
  .long-comments {
    margin-top:  50px;
    .long-comments-nav {
      padding: 10px 10px 10px 15px;
      font-size: 13px;
      span{
        font-size: 15px;
      }
    }
    .no-comments {
      border-top: 1px solid #c3c3c3;
      height: 530px;
      .no-comments-icon {
        width: 150px;
        height: 170px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #b0b0b0;
        text-align: center;
        > i {
          font-size: 85px;
          color: #b0b0b0;
        }
        > p {
          font-size: 15px;
        }
      }
    }
  }
  .short-comments-nav {
    border-top: 1px solid #c3c3c3;
    padding: 10px 10px 10px 15px;
    font-size: 13px;
    position: relative;
    span {
      font-size: 15px;
    }
    .down {
      position: absolute;
      font-size: 15px;
      top: 10px;
      right: 15px;
      color: #b0b0b0;
      cursor: pointer;
    }
  }

  .mask {
    position: fixed;
    transform: translateZ(0);
    top: 0;
    left: 0;
    width: 375px;
    height: 667px;
    background: rgba(0,0,0,0.7);
    z-index: 5;
    .reply-wrap {
      width: 320px;
      border-radius: 3px;
      padding: 5px 20px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: #f2f2f2;
      > p {
        font-size: 15px;
        padding: 5px 0;
      }
    }
  }
</style>

