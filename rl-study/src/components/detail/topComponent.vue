<template>
  <i :class="valueClass" @click.stop="goTop">
    &#xe71a;
    <span class="num">{{top_num}}</span>
    <transition
      name="top"
      v-on:after-enter="afterEnter"
    >
      <span class="add1" v-if="animated ">+1</span>
    </transition>
  </i>
</template>
<script>
  export default {
    name: 'topComponent',
    data: function () {
      return {
        animated: false//+1动画是否执行完毕
      }
    },
    props: {
      index: Number,
      id: Number,
      top_num: Number,
      active: Boolean
    },
    computed: {
      valueClass: function () {
        return {
          "iconfont": true,
          "top": true,
          "active": !!this.active
        }
      }
    },
    watch: {
      active: function (newValue, oldValue) {
        if (!oldValue && !!newValue) {
          this.animated = true
        }
      }
    },
    methods: {
      goTop: function () {
        this.$emit('goTop')
      },
      afterEnter: function (el) {
        this.animated = false
      }
    }
  }
</script>

<style lang="less">
  @import "../../css/default.less";

  .top {
    position: relative;
    font-size: 16px;
    color: #999 !important;
    .add1 {
      position: absolute;
      top: -16px;
      left: 0;
      font-size: 14px;
    }

  }

  .top.active {
    color: @secondcolor !important;
  }

  .top-enter-active {
    animation-name: zoomIn;
    animation-duration: 0.6s;
  }

  .top-leave-active {
    animation-duration: 0.3s;
    opacity: 0;
  }


</style>
