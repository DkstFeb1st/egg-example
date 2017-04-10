<template>
  <div>
    <component v-bind:is="currentView"></component>
    <tabbar>
      <tabbar-item selected v-on:on-item-click="_obligatory">
        <img slot="icon" src="../assets/ic_sp_obligatory_select.png">
        <img slot="icon-active" src="../assets/ic_sp_obligatory_selected.png">
        <span slot="label">必修课</span>
      </tabbar-item>
      <tabbar-item v-on:on-item-click="_elective">
        <img slot="icon" src="../assets/ic_sp_elective_select.png">
        <img slot="icon-active" src="../assets/ic_sp_elective_selected.png">
        <span slot="label">选修课</span>
      </tabbar-item>
      <tabbar-item v-on:on-item-click="_interest">
        <img slot="icon" src="../assets/ic_sp_interest_select.png">
        <img slot="icon-active" src="../assets/ic_sp_interest_selected.png">
        <span slot="label">兴趣</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem} from 'vux'
  import obligatory from 'components/main/obligatory.vue'
  import elective from 'components/main/elective.vue'
  import interest  from 'components/main/interest.vue'
  import lifeMonitor from 'mixins/lifeMonitor'
  export default {
    name: "tab",
    components: {
      Tabbar,
      TabbarItem
    },
    data () {
      return {
        currentView: obligatory
      }
    },
    methods: {
      _obligatory: function () {
        this.currentView = obligatory
      },
      _elective: function () {
        this.currentView = elective
      },
      _interest: function () {
        this.currentView = interest
      }
    }
  }
</script>

<style lang="less">
  .weui-tabbar {
    position: fixed !important;
    .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i, .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
      color: #2aaa73;
    }
  }
</style>
