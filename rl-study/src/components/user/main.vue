<template>
  <div class="user-wrapper">
    <header v-bind:class="{ moring : moring, aftermoon : aftermoon,night : night ,userwrapperheader : true}">
      <div class="userinfowrapper">
        <p class="user-name">{{user.name}}<label
          v-bind:class="{ boy : user.gender === '1',girl : user.gender !== '1',gender : true }"></label></p>
        <p class="user-position">瑞安农商银行 - {{user.position}}</p>
        <label class="user-avatar">
          <img :src="user.avatar" alt="">
        </label>
        <div class="user-data-wrapper">
          <div class="user-data-item">
            <p>{{spList.length}}</p>
            <p>课程</p>
          </div>
          <div class="user-data-item">
            <p>{{cmdList.length}}</p>
            <p>获评</p>
          </div>
          <div class="user-data-item">
            <p>{{tpdList.length}}</p>
            <p>获赞</p>
          </div>
          <div class="user-data-item">
            <p>{{lvList.length}}</p>
            <p>获藏</p>
          </div>
        </div>
      </div>
    </header>
    <div class="user-function-wrapper">
      <router-link :to="{ path: 'course/studying' }">
        <div class="user-function-item">
          <div class="icon">
            <i class="iconfont" style="color:#3dbd7d">&#xe673;</i>
          </div>
          <div class="title">
            在学的课程
            <i class="iconfont">&#xe71c;</i>
          </div>
        </div>
      </router-link>
      <router-link :to="{ path: 'course/loveing' }">
        <div class="user-function-item">
          <div class="icon">
            <i class="iconfont" style="color:#f78e3d">&#xe7cf;</i>
          </div>
          <div class="title">
            我的收藏
            <i class="iconfont">&#xe71c;</i>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import lifeMonitor from 'mixins/lifeMonitor'
  const moment = require('moment')
  export default {
    name: 'main',
    beforeMount: function () {
      this.$vux.loading.show({
        text: '疯狂加载中...'
      })
      this.$store.dispatch('getUserTabAction').then(() => this.$vux.loading.hide())
    },
    data: function () {
      return {
        moring: moment(new Date).locale('zh-cn').utcOffset(8).format('HH') > '06' && moment(new Date).locale('zh-cn').utcOffset(8).format('HH') < '12',
        aftermoon: moment(new Date).locale('zh-cn').utcOffset(8).format('HH') > '12' && moment(new Date).locale('zh-cn').utcOffset(8).format('HH') < '18',
        night: moment(new Date).locale('zh-cn').utcOffset(8).format('HH') > '18' || moment(new Date).locale('zh-cn').utcOffset(8).format('HH') < '06'
      }
    },
    computed: {
      ...mapGetters(['user', 'spList', 'cmdList', 'tpdList', 'lvList'])
    }

  }
</script>

<style lang="less">
  @import "../../css/constant.less";

  .user-wrapper {
    .userwrapperheader.moring {
      background-image: url('../../assets/img_member_cover_1.jpg');
    }
    .userwrapperheader.aftermoon {
      background-image: url('../../assets/img_member_cover_5.jpg');
    }
    .userwrapperheader.night {
      background-image: url('../../assets/img_member_cover_4.jpg');
    }
    .userwrapperheader {
      position: relative;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      height: 220px;
      margin-bottom: 12px;
      .userinfowrapper {
        position: absolute;
        bottom: -1px;
        width: 100%;
        height: 100px;
        background-color: #fff;
        .user-avatar {
          position: absolute;
          top: -33px;
          left: 12px;
          img {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            border: 3px solid #fff;
          }
        }
        .user-name {
          position: absolute;
          top: -32px;
          left: 92px;
          line-height: 32px;
          color: #ffffff;
          .gender {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-left: 8px;
            background-size: 100% 100%;
            vertical-align: text-bottom;

          }
          .boy {
            background-image: url('../../assets/img_male.png');
          }
          .girl {
            background-image: url('../../assets/img_female.png');
          }
        }
        .user-position {
          margin-left: 92px;
          line-height: 32px;
          font-size: 14px;
          color: #666;
        }
        .user-data-wrapper {

          display: -webkit-box;
          -webkit-box-orient: horizontal;
          -webkit-box-align: center;
          padding: 14px 12px;
          .user-data-item {
            -webkit-box-flex: 1;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-right: 1px solid #ebebeb;
            p {
              line-height: 20px;
            }
          }
          .user-data-item:last-child {
            border-right: none
          }
        }
      }
    }

    .user-function-wrapper {
      padding-left: 24px;
      background-color: #fff;
      .user-function-item {
        position: relative;
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-align: center;
        height: 48px;
        border-bottom: 1px solid #ebebeb;
        .icon {
          width: 40px;
          i {
            font-size: 18px;
          }
        }
        .title {
          color: #666;
          font-size: 14px;
          i {
            position: absolute;
            right: 12px;
            top: 13px;
            color: #999;
            font-size: 18px;
          }
        }
      }
      .user-function-item:last-child {
        border-bottom: none;
      }
    }
  }
</style>
