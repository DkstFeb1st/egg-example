/**
* Created by 1 on 2017/5/15.
* 评论点赞列表
*/

<template>
  <div>
    <header class="top-header">{{topList.length}}人赞过</header>
    <section class="toplist-wrapper" v-for="(obj,index) in topList">
      <img :src="obj.avatar" alt="">
      <section>
        <label class="name">{{obj.name}}</label>
        <label v-bind:class="{ boy : obj.gender ===1,girl : obj.gender !== 1,gender : true }"></label>
      </section>
    </section>
  </div>
</template>
<script>
  import {getTopList} from 'apis/studyapi'
  export default {
    name: 'TopList',
    beforeMount: function () {
      this.$vux.loading.show({
        text: '疯狂加载中...'
      })
      let param = {
        c_id: this.$route.params.c_id
      }
      getTopList(param)
        .then(response => {
          this.$vux.loading.hide()
          if (response.status === 200 && response.data.status === 200) {
            this.topList = response.data.topList
          } else {
            this.$vux.alert.show({
              text: response.data.msg
            })
          }
        })
        .catch(error => {
          this.$vux.loading.hide()
          alert(error)
        })
    },
    data() {
      return {
        topList: []
      }
    }
  }
</script>

<style lang="less">
  header.top-header {
    text-align: center;
    color: #333;
    background: #fff;
    line-height: 32px;
    border-bottom: 1px solid #e7e7eb;
  }

  .toplist-wrapper {
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-align: center;
    padding: 8px 12px;
    background-color: #fff;
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 12px;
    }
    .name {
      font-size: 12px;
      color: #666;
      margin-right: 12px;
    }
    .gender {
      display: inline-block;
      width: 24px;
      height: 24px;
      background-size: 100% 100%;
      vertical-align: middle;
    }
    .boy {
      background-image: url('../../assets/ic_sp_boy.png');
    }
    .girl {
      background-image: url('../../assets/ic_sp_girl.png');
    }
  }
</style>
