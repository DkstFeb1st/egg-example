<template>
  <div class="serialdetail-wrapper">
    <header class="spserialdetail-header">
      <img :src="study.avator" alt="">
    </header>
    <div>
      <tab
        :line-width=2
        v-model="tabindex"
        custom-bar-width="64px"
      >
        <tab-item>介绍</tab-item>
        <tab-item>目录</tab-item>
        <tab-item>评价</tab-item>
      </tab>
      <swiper v-model="tabindex" :show-dots="false">
        <swiper-item key="0">
          <div class="serialdetail-info">
            <div class="serialdetail-title">
              <p class="title">{{study.title}}</p>
              <div>
                <label class="rate">
                  <rater v-model="study.rate" slot="value" font-size="18" margin="1" active-color="#f56a00"></rater>
                  {{study.rate}}
                </label>
                <label class="viewnum">{{study.viewnum}}人学过</label>
              </div>
            </div>
            <div class="serialdetail-desc">
              <header>课程简介</header>
              <p>{{study.desc}}</p>
            </div>
            <div class="serialdetail-suit">
              <header>适用人群</header>
              <p>{{study.suit}}</p>
            </div>
            <div class="serialdetail-author">
              <header>
                作者

              </header>
              <div>
                <img :src="study.authoravator" alt="">
                <p>{{study.authorname}}</p>
              </div>
            </div>
          </div>
        </swiper-item>
        <swiper-item key="1">
          <CategoryList
            :categoryList="spCategoryList"
            :study="study"
            :studyedids="studyedids"
          >

          </CategoryList>
        </swiper-item>
        <swiper-item key="2">
          <div class="serialdetail-comment">
            <div class="sptop-wrapper">
              <div class="sptop" :class="{active : sptoped}">
                <Top
                  :top_num="study.topnum"
                  v-on:goTop="createTop(study)"
                  :active="sptoped > 0"
                >
                </Top>
              </div>
            </div>
            <Comment
              :commentList="spCommentList"
              :tops="tops"
              v-on:doOrderActionsheetMenu="doOrderActionsheetMenu"
              v-on:goTop="goTop"
              v-on:goCommentList="goCommentList"
            >
            </Comment>
          </div>
        </swiper-item>
      </swiper>
      <CommentBar
        :commentNum="spCommentList.length"
        :study="study"
        :loved="sploved"
      >

      </CommentBar>
    </div>
  </div>
</template>
<script>
  import lifeMonitor from 'mixins/lifeMonitor'
  import * as filters  from 'filters'
  import {Tab, TabItem, Swiper, SwiperItem, Rater, Cell, CellBox} from 'vux'
  import {getSpDetailListApi, addTopApi, createTopApi, getCommentListApi} from 'apis/studyapi'
  import  Comment  from "components/comment/comment.vue";
  import CategoryList from "components/category/categorylist.vue";
  import CommentBar from "components/comment/commentbar.vue"
  import Top from "components/detail/topComponent.vue"
  export default {
    name: 'serialdetail',
    mixins: [lifeMonitor],
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Rater,
      Comment,
      CategoryList,
      CommentBar,
      Top
    },
    beforeMount: function () {
      this.$vux.loading.show({
        text: '疯狂加载中...'
      })
      let params = {
        id: this.$route.params.id,
        type: '1'//系列课程
      }
      this.$store.dispatch('getSpDetailListAction', params)
        .then(response => {
          this.$vux.loading.hide()
          if (response.status === 200 && response.data.status === 200) {
            for (let _i = 0; _i < response.data.spCommentList.length; _i++) {
              response.data.spCommentList[_i].content = filters.emoji(response.data.spCommentList[_i].content)
            }
            this.study = response.data.spdetail
            this.spCommentList = response.data.spCommentList
            this.spCategoryList = response.data.spCategoryList
            this.tops = response.data.tops//我的点赞评论id数组
            this.sptoped = response.data.sptoped
            this.sploved = response.data.sploved
            this.studyedids = response.data.studyedids
          } else {
            this.$vux.alert.show({
              title: '提示',
              content: response.data.msg
            })
          }
        })
    },
    data: function () {
      return {
        tabindex: 0,
        study: {},
        tops: [],
        spCommentList: [],
        spCategoryList: [],
        studyedids: [],
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
          //this.order = 'hot'
          var params = {
            sp_id: this.$route.params.id,
            order: 'hot'
          }
        } else {
          //this.order = 'new'
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
      goCommentList: function (item) {
        this.$router.push({path: `/detail/commentlist/${item.id}?sp_id=${this.$route.params.id}&custno=${item.userid}`})
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
      createTop: function (_study) {
        this.$store.dispatch('createTopAction', {sp_id: _study.id, userid: _study.authorcustno})
          .then(response => {
            if (response.status === 200 && response.data.status === 200) {
              this.study.topnum = this.study.topnum + 1
              this.sptoped = true
            } else {
              this.$vux.alert.show({
                title: '提示',
                content: response.data.msg
              })
            }
          })
      },
    }
  }
</script>

<style lang="less">
  .serialdetail-wrapper {
    header.spserialdetail-header {
      img {
        width: 100%;
      }
    }
    .serialdetail-info {

      .serialdetail-title {
        background-color: #fff;
        padding: 12px;
        margin-bottom: 12px;
        .title {
          line-height: 24px;
          margin-bottom: 12px;
        }
        .rate {
          color: #999;
          font-size: 12px;
          margin-right: 24px;
        }
        .viewnum {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .serialdetail-desc {
      background-color: #fff;
      padding: 12px;
      border-bottom: 1px solid #ebebe7;
      header {
        font-size: 14px;
        color: #333;
        padding-bottom: 12px;
      }
      p {
        font-size: 12px;
        color: #666;
      }
    }
    .serialdetail-suit {
      background-color: #fff;
      padding: 12px;
      border-bottom: 1px solid #ebebe7;
      header {
        font-size: 14px;
        color: #333;
        padding-bottom: 12px;
      }
      p {
        font-size: 12px;
        color: #666;
      }
    }
    .serialdetail-author {
      background-color: #fff;
      padding: 12px;
      header {
        font-size: 14px;
        color: #333;
        padding-bottom: 12px;
      }
      div {
        display: -webkit-box;
        -webkit-box-align: center;
        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-right: 12px;
        }
        p {
          color: #333;
          font-size: 14px;
        }
      }
    }
    .vux-slider {
      margin-bottom: 60px;
    }
  }
</style>
