<template>
  <div class="list-wrapper">
    <div class="list-item-wrapper" v-for="( item, index ) in courseList " v-on:click="goToDetail(item)">
      <div class="list-item-content">
        <div class="list-item-img">
          <div class="progress" v-if="item.progress">
            已学{{item.progress * 100}}%

          </div>
          <img
            :src="item.avator"
          />
          <p class="time">{{item.createdAt.substring(0, 10)}} 发布</p>
        </div>
        <p class="list-item-type">
          <label class="title">
            {{item.title}}
              </label>
          <label>
            {{item.authorname}}
              </label>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import {Blur} from 'vux'
  export default {
    name: 'courseListItem',
    props: {
      courseList: Array,
    },
    components: {
      Blur
    },
    methods: {
      goToDetail: function (_item) {
        //根据type判断是单课程还是系列课程
        if (_item.type === '1')
          this.$router.push(`/sdetail/${_item.id}`)
        else
          this.$router.push(`/detail/${_item.id}?courseType=${_item.type}`)
      }
    }
  }
</script>
<style lang="less">
  .list-wrapper {
    padding: 0 12px;
    .list-item-wrapper {
      margin-top: 12px;
      display: -webkit-box;
      -webkit-box-orient: horizontal;
      -webkit-box-pack: start;
      -webkit-box-align: start;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      background-color: #fff;
      -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
      -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
      @media (max-width: 480px) {
        .list-item-img {
          height: 135px;
        }
      }
      @media (max-width: 330px) {
        .list-item-img {
          height: 113px;
        }
      }

      .list-item-img {
        position: relative;
        overflow: hidden;
        .progress {
          position: absolute;
          top: 10px;
          left: -40%;
          background-color: #00A1F5;
          z-index: 1;
          width: 100%;
          padding-left: 40%;
          font-size: 12px;
          color: #fff;
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 5px;
          width: 100%;
        }
        .time {
          position: absolute;
          left: 0px;
          right: 0px;
          bottom: 0px;
          padding: 0 8px;
          background-color: rgba(0, 0, 0, 0.3);
          color: #fff;
          font-size: 12px;
          line-height: 20px;
        }
      }
      .list-item-content {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-box-pack: justify;
        flex: 1;
        -webkit-box-flex: 1;
        padding: 0 12px;
        .list-item-title {
          font-size: 16px;
          letter-spacing: 1px;
          color: #000;
        }
        .list-item-type {
          display: -webkit-box;
          -webkit-box-pack: justify;
          font-size: 12px;
          line-height: 28px;
          color: #666;
          label {
            display: block
          }
          .title {
            font-size: 15px;
            color: #000;
          }
        }
      }
    }
  }
</style>
