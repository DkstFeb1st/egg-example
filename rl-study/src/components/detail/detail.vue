<template>
  <div class="detail-container">
    <div class="detail-wrapper">
      <header class="detail-title">
        {{ study.title }}

      </header>
      <section class="detail-author">
        <div>
          <img v-bind:src="study.avator" alt="" class="headerimg">
          <div class="detail-author-info">
            <p class="detail-authorname">{{study.authorname}}</p>
            <p class="detail-addtime">{{study.createdAt | datetimeNormal}}</p>
          </div>
        </div>
        <div class="detail-rate">
          <i>{{ study.rate }}</i>分

        </div>
      </section>
      <article v-html="study.vhtml">
        <div>{{ study.vhtml }}</div>
      </article>
      <div class="detail-comment-wrapper">
        <header>
          <label>全部评论</label>
          <label class="detail-comment-edit" @click="goComment">写评论<i class="iconfont">&#xe69e;</i></label>
        </header>
        <section v-for="( item, index ) in study.comments" class="detail-comment-item">
          <div>
            <img v-bind:src="item.avator" alt="" class="headerimg">
          </div>
          <!--评论列表-->
          <div class="detail-comment">
            <p class="detail-comment-name">{{item.name}}</p>
            <p class="detail-comment-time">{{item.createdAt | datetimeNormal}}</p>
            <p class="detail-comment-content">
              <template v-for="(obj,index) in item.content ">
                  <span v-if="obj.node === 'text'">
                    {{obj.text}}
                  </span>
                <emotion :isGif="true" v-else>{{obj.text}}</emotion>
              </template>
            </p>
            <div class="detail-comment-callback" v-on:click="goCommentList(item.id)">
              共{{item.comment_num}}条回复 >

            </div>
          </div>
        </section>
      </div>
    </div>

  </div>

</template>
<script>
  /*实现阅读 评分 留言功能*/
  import lifeMonitor from 'mixins/lifeMonitor'
  import {getSpDetailListApi} from 'apis/studyapi'
  import * as filters  from 'filters'
  import {WechatEmotion as Emotion} from 'vux'

  export default {
    name: "detail",
    mixins: [lifeMonitor],
    beforeMount: function () {
      this.$vux.loading.show({
        text: '疯狂加载中...'
      })

      getSpDetailListApi(this.$route.params.id, '8581234')
        .then(response => {
          console.log(response)
          this.$vux.loading.hide()
          if (response.status === 200 && response.data.status === 200) {
            console.log(response.data.spdetail)
            for (let _i = 0; _i < response.data.spdetail.comments.length; _i++) {
              response.data.spdetail.comments[_i].content = filters.emoji(response.data.spdetail.comments[_i].content)
            }
            this.study = response.data.spdetail
          } else {
            this.$vux.alert.show({
              text: response.data.msg
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
    },
    data () {
      return {
        study: {}
      }
    },
    methods: {
      goComment: function () {
        this.$router.push({path: `/detail/commentform/${this.$route.params.id}?root=true`})
      },
      goCommentList: function (_id) {
        this.$router.push({path: `/detail/commentlist/${_id}?sp_id=${this.$route.params.id}`})
      }
    }
  }
</script>
<style lang="less">
  @import "../../css/default.less";

  .detail-container {
    background-color: #f5f5f5;
    .detail-wrapper {
      .detail-title {
        font-size: 20px;
        line-height: 1.6;
        color: #333;
        background-color: #fff;
        padding: 12px 12px 0 12px;
      }
      article {
        padding: 0 12px 12px 12px;
        margin-bottom: 12px;
        background-color: #fff;
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
            coloe: #666;

          }
          .detail-authorname {
            font-size: 14px;
          }
        }

        .detail-rate {
          font-size: 14px;
          i {
            font-size: 20px;
            margin-right: 8px;
            color: red;
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
        }
        .detail-comment-item {
          .detail-comment {
            -webkit-box-flex: 1;
            flex: 1;
            border-bottom: 1px solid #eee;
            .detail-comment-time {
              margin-bottom: 4px;
              font-size: 12px;
              color: #666;
            }
            .detail-comment-content, .detail-comment-name {
              font-size: 14px;
              line-height: 1.6;
              margin-bottom: 4px;
              i {
                float: right;
                color: #666;
              }
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

  .headerimg {
    width: 36px;
    height: 36px;
    margin-right: 12px;
    border-radius: 50%;
  }
</style>
