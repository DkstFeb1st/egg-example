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
        <div class="detail-rate">
          <i class="iconfont">&#xe79a;</i>
          <span>{{ study.rate }}</span>
        </div>
      </section>
      <article v-html="study.fhtml">
        <div>{{ study.fhtml }}</div>
      </article>
      <div class="detail-comment-wrapper">
        <section v-for="( item, index ) in study.comments" class="detail-comment-item" @click="goCommentList(item.id)">
          <div>
            <img v-bind:src="item.avator" alt="" class="headerimg">
          </div>
          <!--评论列表-->
          <div class="detail-comment">
            <p class="detail-comment-name">{{item.name}}

              <Top
                :top_num="item.top_num"
                v-on:goTop="goTop(item.id,index)"
                :active="tops.includes(item.id)"
              >
              </Top>
            </p>
            <p class="detail-comment-content">
              <template v-for="(obj,index) in item.content ">
                  <span v-if="obj.node === 'text'">
                    {{obj.text}}
                  </span>
                <emotion :isGif="true" v-else>{{obj.text}}</emotion>
              </template>
            </p>
            <p class="detail-comment-time">{{item.createdAt | datetimeNormal}} · {{item.comment_num}}回复</p>
          </div>
        </section>
      </div>
    </div>
    <footer>
      <section @click="goComment"><i class="iconfont">&#xe6e5;</i>写评论</section>
      <div class="icon-group">
        <i class="iconfont">&#xe70c;
          <Badge v-bind:text="study.comments ? study.comments.length : 0 "></Badge>
        </i>
        <i class="iconfont" @click="goRate">&#xe6ea;</i>
        <i class="iconfont" @click="goLove">&#xe707;</i>
      </div>
    </footer>
  </div>

</template>
<script>
  /*实现阅读 评分 留言功能*/
  import lifeMonitor from 'mixins/lifeMonitor'
  import {getSpDetailListApi, addTopApi} from 'apis/studyapi'
  import * as filters  from 'filters'
  import {WechatEmotion as Emotion, Badge} from 'vux'
  import Top from "components/detail/topComponent.vue";

  export default {
    name: "detail",
    mixins: [lifeMonitor],
    beforeMount: function () {
      this.$vux.loading.show({
        text: '疯狂加载中...'
      })

      getSpDetailListApi(this.$route.params.id)
        .then(response => {
          console.log(response)
          this.$vux.loading.hide()
          if (response.status === 200 && response.data.status === 200) {
            console.log(response.data.spdetail)
            for (let _i = 0; _i < response.data.spdetail.comments.length; _i++) {
              response.data.spdetail.comments[_i].content = filters.emoji(response.data.spdetail.comments[_i].content)
            }
            this.study = response.data.spdetail
            this.tops = response.data.tops//我的点赞评论id数组
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: response.data.msg
            })
          }
        })
        .catch(error => {
          this.$vux.loading.hide()
          alert('访问出错')
        })
    },
    components: {
      Emotion,
      Badge,
      Top
    },
    data () {
      return {
        study: {},
        tops: []
      }
    },
    methods: {
      goTop: function (_id, index) {
        addTopApi(_id)
          .then(response => {
            if (response.status === 200 && response.data.status === 200) {
              this.study.comments[index].top_num = this.study.comments[index].top_num + 1
              this.tops.push(_id)
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: response.data.msg
              })
            }
          })
          .catch(error => {
            this.$vux.loading.hide()
            alert('访问出错')
          })
      },
      goComment: function () {
        this.$router.push({path: `/detail/commentform/${this.$route.params.id}?root=true`})
      },
      goRate: function () {
        this.$router.push({path: `/detail/rateform/${this.$route.params.id}`})
      },
      goCommentList: function (_id) {
        this.$router.push({path: `/detail/commentlist/${_id}?sp_id=${this.$route.params.id}`})
      },
      goLove: function () {
        this.$vux.alert.show({
          title: '提示',
          content: '收藏功能还在开发中'
        })
      }
    }
  }
</script>
<style lang="less">
  @import "../../css/default.less";

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
        padding: 0 12px 12px 12px;
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
          color: @primarycolor;
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
          line-height: 2;
          padding: 0 12px;
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
      }
    }
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: -webkit-box;
    -webkit-box-pack: justify;
    height: 48px;
    padding: 6px 10px;
    background-color: #fff;
    border-top: 1px solid #eee;
    section {
      background-color: #eeeeee;
      width: 60%;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 14px;
      line-height: 24px;
      i {
        color: #666;
        margin-right: 6px;
      }
    }
    .icon-group {
      width: 40%;
      display: -webkit-box;
      -webkit-box-orient: horizontal;
      -webkit-box-align: center;
      i {
        position: relative;
        font-size: 26px;
        display: block;
        -webkit-box-flex: 1;
        color: #666;
        text-align: center;
        .vux-badge {
          position: absolute;
          right: 0;
          top: -5px
        }
      }

    }
  }

  .headerimg {
    width: 36px;
    height: 36px;
    margin-right: 12px;
    border-radius: 50%;
  }
</style>
