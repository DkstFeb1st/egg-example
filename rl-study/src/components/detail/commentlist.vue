<!--二级评论页面-->
<template>
  <div>
    <header class="detail-comment-item">
      <div>
        <img v-bind:src="commentList.avator" alt="" class="headerimg">
      </div>
      <!--评论列表-->
      <div class="detail-comment">
        <p class="detail-comment-name">{{commentList.name}}</p>
        <p class="detail-comment-time">{{commentList.createdAt | datetimeNormal}}</p>
        <p class="detail-comment-content">
          <template v-for="(obj,index) in commentList.content ">
                  <span v-if="obj.node === 'text'">
                    {{obj.text}}
                  </span>
            <emotion :isGif="true" v-else>{{obj.text}}</emotion>
          </template>
        </p>
      </div>
    </header>
    <div class="detail-comment-wrapper">
      <header>
        <label>全部评论</label>
        <label class="detail-comment-edit" @click="goComment">写评论<i class="iconfont">&#xe69e;</i></label>
      </header>
      <section v-for="( item, index ) in commentList.subcomment" class="detail-comment-item">
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
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  import {getCommentListApi} from 'apis/studyapi'
  import * as filters  from 'filters'
  import {WechatEmotion as Emotion} from 'vux'
  export default {
    name: "commentList",
    components: {
      Emotion,
    },
    beforeMount: function () {
      this.$vux.loading.show({
        text: '疯狂加载中...'
      })
      getCommentListApi(this.$route.params.id)
        .then(response => {
          this.$vux.loading.hide()
          if (response.status === 200 && response.data.status === 200) {
            console.log(response)
            response.data.commentList.content = filters.emoji(response.data.commentList.content)
            for (let _i = 0; _i < response.data.commentList.subcomment.length; _i++) {
              response.data.commentList.subcomment[_i].content = filters.emoji(response.data.commentList.subcomment[_i].content)
            }
            this.commentList = response.data.commentList
          } else {
            this.$vux.alert.show({
              text: response.data.msg
            })
            //alert(rep)
          }
        })
        .catch(error => {
          this.$vux.loading.hide()
          alert(error)
        })
    },
    data () {
      return {
        commentList: {}
      }
    },
    methods: {
      goComment: function () {
        this.$router.push({path: `/detail/commentform/${this.$route.params.id}?root=false&id=${this.$route.query.sp_id}`})
      },
    }
  }
</script>
<style lang="less">
  @import "../../css/default.less";

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
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-align: start;
    -webkit-box-pack: justify;
    padding: 12px;
    background-color: #fff;
    .headerimg {
      width: 36px;
      height: 36px;
      margin-right: 12px;
      border-radius: 50%;
    }
    .detail-comment {
      -webkit-box-flex: 1;
      flex: 1;
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
</style>
