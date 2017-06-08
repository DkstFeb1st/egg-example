<template>
  <div class="detail-container">
    <div class="detail-wrapper">
      <header class="detail-title">
        {{ study.title }}
      </header>
      <section class="detail-author">
        <div>
          <img v-bind:src="study.authoravator" alt="" class="headerimg">
          <div class="detail-author-info">
            <p class="detail-authorname">{{study.authorname}}</p>
            <p class="detail-addtime">{{study.createdAt | datetimeNormal}}</p>
          </div>
        </div>
        <div class="detail-rate" v-if="study.type === '2'">
          <i class="iconfont">&#xe79a;</i>
          <span>{{ study.rate }}</span>
        </div>
      </section>
      <article v-html="study.fhtml">
        <div>{{ study.fhtml }}</div>
      </article>
      <div class="sptop-wrapper" v-if="study.type === '2'">
        <div class="sptop" :class="{active : sptoped}">
          <Top
            :top_num="study.topnum"
            v-on:goTop="createTop(study)"
            :active="sptoped > 0"
          >
          </Top>
        </div>
      </div>
      <CommentList
        :commentList="spCommentList"
        :tops="tops"
        v-on:doOrderActionsheetMenu="doOrderActionsheetMenu"
        v-on:goTop="goTop"
        v-on:goCommentList="goCommentList"
        v-if="study.type === '2'"
        :single="true"
      >

      </CommentList>
    </div>
    <CommentBar
      :commentNum="spCommentList && spCommentList.length"
      :study="study"
      :loved="sploved"
      v-if="study.type === '2'"
    >
    </CommentBar>
  </div>
</template>
<script>
  /*实现阅读 评分 留言功能*/
  import lifeMonitor from 'mixins/lifeMonitor'
  import {getSpDetailListApi, addTopApi, createTopApi, getCommentListApi} from 'apis/studyapi'
  import * as filters  from 'filters'
  import  CommentList  from "components/comment/comment.vue";
  import Top from "components/detail/topComponent.vue";
  import CommentBar from "components/comment/commentbar.vue";

  export default {
    name: "detail",
    mixins: [lifeMonitor],
    beforeMount: function () {
      this.$vux.loading.show({
        text: '疯狂加载中...'
      })
      let params = {
        id: this.$route.params.id,
        type: this.$route.query.courseType,
        sp_id: this.$route.query.sp_id
      }
      this.$store.dispatch('getSpDetailListAction', params)
        .then(response => {
          this.$vux.loading.hide()
          if (response.status === 200 && response.data.status === 200) {
            if (this.$route.query.courseType == '2') {
              for (let _i = 0; _i < response.data.spCommentList.length; _i++) {
                response.data.spCommentList[_i].content = filters.emoji(response.data.spCommentList[_i].content)
              }
            }
            this.study = response.data.spdetail
            this.spCommentList = response.data.spCommentList
            this.tops = response.data.tops//我的点赞评论id数组
            this.sploved = response.data.sploved
            this.sptoped = response.data.sptoped
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: response.data.msg
            })
          }
        })
    },
    components: {
      Top,
      CommentList,
      CommentBar
    },
    data () {
      return {
        study: {},
        tops: [],
        spCommentList: [],
        sptoped: false,
        sploved: false
      }
    },
    methods: {
      doOrderActionsheetMenu: function (key) {
        this.$vux.loading.show({
          text: '疯狂加载中...'
        })
        if (key === 'hot') {
          this.order = 'hot'
          var params = {
            sp_id: this.$route.params.id,
            order: 'hot'
          }
        } else {
          this.order = 'new'
          var params = {
            sp_id: this.$route.params.id,
            order: 'new'
          }
        }
        this.$store.dispatch('getCommentListAction', params)
          .then(response => {
            this.$vux.loading.hide()
            if (response.status === 200 && response.data.status === 200) {
              for (let _i = 0; _i < response.data.commentList.length; _i++) {
                response.data.commentList[_i].content = filters.emoji(response.data.commentList[_i].content)
              }
              this.spCommentList = response.data.commentList
              //this.tops = response.data.tops//我的点赞评论id数组
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: response.data.msg
              })
            }
          })
      },
      createTop: function (_study) {
        this.$store.dispatch('createTopAction', {sp_id: _study.id, userid: _study.authorcustno})
          .then(response => {
            if (response.status === 200 && response.data.status === 200) {
              //this.study.comments[index].top_num = this.study.comments[index].top_num + 1
              //this.tops.push(_id)
              this.sptoped = true
              this.study.topnum = this.study.topnum + 1
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: response.data.msg
              })
            }
          })
      },
      goTop: function (_param) {
        let {comment, index} = _param
        this.$store.dispatch('addTopAction', {c_id: comment.id, userid: comment.custno})
          .then(response => {
            if (response.status === 200 && response.data.status === 200) {
              this.spCommentList[index].top_num = this.spCommentList[index].top_num + 1
              this.tops.push(comment.id)
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: response.data.msg
              })
            }
          })
      },
      goCommentList: function (item) {
        this.$router.push({path: `/detail/commentlist/${item.id}?sp_id=${this.$route.params.id}&custno=${item.userid}`})
      },
    }
  }
</script>
<style lang="less">
  @import "../../css/constant.less";

  .detail-container {
    background-color: #f5f5f5;
    margin-bottom: 60px;
    .detail-wrapper {
      .detail-title {
        font-size: 20px;
        line-height: 1.6;
        letter-spacing: 1px;
        color: #000;
        background-color: #fff;
        padding: 12px 12px 0 12px;
      }
      iframe {
        width: 300px !important;
        height: 200px !important;
      }
      article {
        padding: 0 12px 0px 12px;
        background-color: #fff;
        overflow-x: hidden;
        img {
          max-width: 100%;
        }
        video {
          max-width: 100%
        }
        span {
          word-wrap: break-word !important;
        }
        .document-info {
          margin-bottom: 12px;
          .document-item-a {
            width: 300px;
            height: 60px;
            padding: 12px;
            img {
              width: 36px;
              margin-right: 12px;
            }
            .document-msg {
              display: inline-block;
              width: 213px;
              p {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                color: #333;
              }
            }
          }
        }
      }
      .detail-author, .detail-comment-item {
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-align: start;
        -webkit-box-pack: justify;
        width: 100%;
        padding: 12px;
        background-color: #fff;
        .detail-author-info {
          display: inline-block;

          .detail-authorname, .detail-addtime {
            margin-bottom: 6px;
            font-size: 12px;
            color: #999;
          }
          .detail-authorname {
            color: #333;
            font-size: 14px;
          }
        }
        .detail-rate {
          color: @secondcolor;
          span {
            font-size: 20px;
            font-style: italic;
            font-weight: 500;
          }
          i {
            margin-right: 6px;
            font-size: 20px;
          }
        }
      }
      .detail-comment-wrapper {
        background-color: #fff;
        header {
          .detail-comment-edit {
            float: right;
            font-size: 14px;
            color: @primarycolor;
          }
          .detail-comment-edit.active {
            color: @secondcolor
          }
          .detail-comment-rate {
            margin-left: 12px;
            float: right;
            font-size: 14px;
            color: @primarycolor;
          }
          .detail-comment-rate.active {
            color: @secondcolor
          }
        }
        .detail-comment-item:active {
          background-color: #f5f5f5;
        }
        .detail-comment-item {
          .detail-comment {
            -webkit-box-flex: 1;
            flex: 1;
            .detail-comment-time {
              margin-bottom: 4px;
              font-size: 12px;
              color: #999;

            }
            .detail-comment-content, .detail-comment-name {
              font-size: 14px;
              line-height: 1.6;
              margin-bottom: 4px;
              i {
                float: right;
                color: #333;
              }
            }
            .detail-comment-name {
              color: #0e77ca;

            }
            .detail-comment-callback {
              padding-left: 8px;
              background-color: #f5f5f5;
              line-height: 1.6;
              font-size: 12px;
              color: #6F9FB5;
            }
          }
        }
        .detail-comment-empty {
          margin-top: 30px;
          height: 80px;
          color: #666;
          background-color: #f5f5f5;
          text-align: center;

        }
      }
    }
  }
  .sptop-wrapper {
    padding: 12px 0;
    background-color: #fff;
    .sptop {
      display: -webkit-box;
      -webkit-box-pack: center;
      -webkit-box-align: center;
      width: 90px;
      height: 32px;
      margin: 0 auto;
      border: 1px solid #ddd;
      border-radius: 20px;
    }
    .sptop.active {
      border: 1px solid @thirdcolor;
    }
  }

  .headerimg {
    width: 36px;
    height: 36px;
    margin-right: 12px;
    border-radius: 50%;
  }
</style>
