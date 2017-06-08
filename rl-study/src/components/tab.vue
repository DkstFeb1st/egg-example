<template>
  <div>
    <component v-bind:is="currentView"></component>
    <tabbar v-model="currentIndex">
      <tabbar-item v-model="currentIndex" v-on:on-item-click="_tabitem">
        <img slot="icon" src="../assets/ic_sp_obligatory_select.png">
        <img slot="icon-active" src="../assets/ic_sp_obligatory_selected.png">
        <span slot="label">课程</span>
      </tabbar-item>
      <tabbar-item v-model="currentIndex" v-on:on-item-click="_tabitem2">
        <img slot="icon" src="../assets/ic_sp_user_select.png">
        <img slot="icon-active" src="../assets/ic_sp_user_selected.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {Tabbar, TabbarItem} from 'vux'
  import tabitem from 'components/main/tabitem.vue'
  import main from 'components/user/main.vue'
  import lifeMonitor from 'mixins/lifeMonitor'
  export default {
    name: "tab",
    components: {
      Tabbar,
      TabbarItem
    },
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters(['currentView', 'currentIndex'])
    },
    methods: {
      _tabitem: function () {
        let _param = {
          currentView: tabitem,
          currentIndex: 0
        }
        this.$store.dispatch('changeTabAction', _param)
      },
      _tabitem2: function () {
        let _param = {
          currentView: main,
          currentIndex: 1
        }
        this.$store.dispatch('changeTabAction', _param)
      }
    }
  }
</script>

<style lang="less">
  @import "../css/constant.less";
  .weui-tabbar {
    position: fixed !important;
    .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
      color: @primarycolor;
    }
    .weui-tabbar__icon {
      width: 32px;
      height: 32px;
    }
    .weui-tabbar__label {
      color: #666
    }
  }
</style>
