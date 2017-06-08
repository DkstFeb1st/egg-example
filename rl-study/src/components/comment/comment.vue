<template>
  <!--评论列表-->
  <div class="detail-comment-wrapper">
    <header class="order-header">
      <label>评论</label>
      <div style="float: right">
        <label class="order-label" @click="doOrderActionsheet">{{order === 'hot' ? '热门排序' : '最新排序'}}<i
          class="iconfont">&#xe643;</i></label>
      </div>
    </header>
    <section v-for="( item, index ) in commentList" class="detail-comment-item" @click="goCommentList(item)">
      <div>
        <img v-bind:src="item.avator" alt="" class="headerimg">
      </div>
      <!--评论列表-->
      <div class="detail-comment">
        <p class="detail-comment-name">{{item.name}}


          <Top
            :top_num="item.top_num"
            v-on:goTop="goTop(item,index)"
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
    <section class="detail-comment-empty" v-if=" commentList === 0" @click="goComment">暂无评论， 点击抢沙发</section>
    <actionsheet v-model="orderActionsheet"
                 :menus="orderMenus" show-cancel
                 @on-click-menu="doOrderActionsheetMenu"
                 v-if="orderActionsheet"
                 :class="{ custom: !single }"
    >

    </actionsheet>
  </div>
</template>

<script>
  import Top from "components/detail/topComponent.vue";
  import {WechatEmotion as Emotion, Actionsheet} from 'vux'
  export default {
    name: 'comment',
    components: {
      Emotion,
      Top,
      Actionsheet
    },
    props: {
      commentList: Array,
      tops: Array,
      single: Boolean
    },
    data () {
      return {
        orderActionsheet: false,
        orderMenus: {
          hot: '按热门排序',
          new: '按最新排序'
        },
        order: 'hot'
      }
    },
    methods: {
      doOrderActionsheet: function () {
        this.orderActionsheet = !this.orderActionsheet
      },
      doOrderActionsheetMenu: function (param) {
        if (param === 'cancel')
          return
        this.$emit('doOrderActionsheetMenu', param)
        this.order = param
      },
      goTop: function (comment, index) {
        this.$emit('goTop', {comment: comment, index: index})
      },
      goCommentList: function (item) {
        this.$emit('goCommentList', item)
      }
    },
  }
</script>

<style lang="less">
  @import "../../css/constant.less";

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
      width: 100%;
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
    .custom {
      .weui-actionsheet {
        top: 0;
        bottom: 100% !important;
      }
    }
  }

  .order-header {
    padding: 0 12px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e7e7eb;
    label {
      color: #666;
    }
  }
</style>
