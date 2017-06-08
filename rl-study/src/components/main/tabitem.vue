<template>
  <div class="tabitem-wrapper">
    <header class="tabitem-wrapper-item">
      <label class="tabitem-ic-search"> <i class="iconfont">&#xe604;</i></label>
      <tab v-model="currentTabIndex"
           custom-bar-width="32px">
        <tab-item @on-item-click="_obligatory">必修</tab-item>
        <tab-item @on-item-click="_elective">选修</tab-item>
        <tab-item @on-item-click="_interest">兴趣</tab-item>
      </tab>
    </header>
    <component v-bind:is="currentTabView"></component>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import {Tab, TabItem} from 'vux'
  import obligatory from 'components/main/obligatory.vue'
  import elective from 'components/main/elective.vue'
  import interest  from 'components/main/interest.vue'
  import lifeMonitor from 'mixins/lifeMonitor'
  export default {
    name: 'tabitem',
    components: {
      Tab,
      TabItem
    },
    data(){
      return {}
    },
    computed: {
      ...mapGetters(['currentTabView', 'currentTabIndex'])
    },
    methods: {
      _obligatory: function () {
        let _param = {
          currentTabView: obligatory,
          currentTabIndex: 0
        }
        this.$store.dispatch('changeTabItemAction', _param)
      },
      _elective: function () {
        let _param = {
          currentTabView: elective,
          currentTabIndex: 1
        }
        this.$store.dispatch('changeTabItemAction', _param)
      },
      _interest: function () {
        let _param = {
          currentTabView: interest,
          currentTabIndex: 2
        }
        this.$store.dispatch('changeTabItemAction', _param)
      }
    }
  }
</script>

<style lang="less">
  @import "../../css/constant.less";
  .vux-tab .vux-tab-item {
    background: none !important;
  }

  .vux-tab .vux-tab-item.vux-tab-selected {
    color: @primarycolor !important;
  }

  .vux-tab-bar-inner {
    background-color: @primarycolor !important;
  }
  .tabitem-wrapper {
    header.tabitem-wrapper-item {
      position: relative;
      padding: 0 56px;
      background: #fff;
      border-bottom: 1px solid #ebebeb;
      label.tabitem-ic-search {
        position: absolute;
        top: 12px;
        left: 12px;
        color: #666;
        z-index: 1;
        i {
          font-size: 20px;
        }
      }
    }
  }
</style>
