<!--必修课tab-->
<template>
  <div class="main-container">
    <!--<div class="main-wrapper">-->
    <!--<header class="main-header">-->
    <!--<label-->
    <!--v-bind:class = "[active === 'new' ? 'main-header-new active' : 'main-header-new']"-->
    <!--v-on:click="active = 'new'"-->
    <!--&gt;-->
    <!--最新-->
    <!--</label>-->
    <!--<label-->
    <!--v-bind:class = "[active === 'hot' ? 'main-header-hot active' : 'main-header-hot']"-->
    <!--v-on:click="active = 'hot'"-->
    <!--&gt;-->
    <!--最热-->
    <!--</label>-->
    <!--<label-->
    <!--v-bind:class = "[selecting ? 'main-header-select active' : 'main-header-select']"-->
    <!--v-on:click="selecting = !selecting"-->
    <!--&gt;-->
    <!--筛选-->
    <!--<i class="iconfont">{{ selecting ? '&#xe601;' : '&#xe600;'}}</i></label>-->
    <!--</header>-->
    <!--</div>-->
    <!--<transition name="fade">-->
    <!--<div class="select-wrapper" v-if="selecting">-->
    <!--<section class="select-type-wrapper">-->
    <!--<div class="select-type-title">-->
    <!--类型：-->
    <!--</div>-->
    <!--<div class="select-type-content" >-->
    <!--<div class="select-type-row" v-for="row in filter1">-->
    <!--<label-->
    <!--v-bind:class="[filter[0] == item.value ? 'active' : '']"-->
    <!--v-for="( item, index ) in row"-->
    <!--v-on:click="filter.splice(0,1,item.value)"-->
    <!--&gt;-->
    <!--{{item.label}}-->
    <!--</label>-->
    <!--</div>-->
    <!--</div>-->
    <!--</section>-->
    <!--<section class="select-type-wrapper">-->
    <!--<div class="select-type-title">-->
    <!--岗位：-->
    <!--</div>-->
    <!--<div class="select-type-content" >-->
    <!--<div class="select-type-row" v-for="row in filter1">-->
    <!--<label-->
    <!--v-bind:class="[filter[1] == item.value ? 'active' : '']"-->
    <!--v-for="( item, index ) in row"-->
    <!--v-on:click="filter.splice(1,1,item.value)"-->
    <!--&gt;-->
    <!--{{item.label}}-->
    <!--</label>-->
    <!--</div>-->
    <!--</div>-->
    <!--</section>-->
    <!--</div>-->
    <!--</transition>-->
    <CourseListItem
      :courseList="obligatoryList"
    >
    </CourseListItem>
    <empty tip="暂无学习内容" v-if="obligatoryList && obligatoryList.length === 0"></empty>
  </div>
</template>

<script>
  import lifeMonitor from 'mixins/lifeMonitor'
  import empty  from 'components/empty/empty.vue'
  import CourseListItem from 'components/course/courseListItem.vue'
  export default {
    name: "obligatory",
    mixins: [lifeMonitor],
    beforeMount: function () {
      this.$vux.loading.show({
        text: '疯狂加载中...'
      })
      this.$store.dispatch('getObligatoryListAction').then(() => this.$vux.loading.hide())
    },
    components: {
      empty,
      CourseListItem
    },
    data () {
      return {}
    },
    computed: {
      obligatoryList: function () {
        return this.$store.state.study.obligatoryList
      }
    }
  }
</script>

<style lang="less">
  @import "../../css/constant.less";

  .fly1-enter-active, .fly2-enter-active {
    transition: all .5s;
    transform: translateY(0px);
  }

  .fly1-leave-active {
    transition: all .5s;
    transform: translateY(62px);
  }

  .fly2-leave-active {
    transition: all .5s;
    transform: translateY(124px);
  }

  .fly1-enter, .fly1-leave, .fly2-enter, .fly2-leave {
    transition: all .5s;
    transform: translateY(30px);
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .main-container {
    margin-bottom: 53px;
  }

  .main-header {
    position: absolute;
    width: 100%;
    padding: 10px 0;
    .shadow();
    background-color: #fff;
    label.main-header-new {
      padding-left: 12px;
      margin-right: 40px;
    }
    label.main-header-select {
      float: right;
      padding-right: 12px;
      i {
        margin-left: 4px;
      }
    }
    label.active {
      color: @primarycolor
    }
  }

  .select-wrapper {
    position: absolute;
    top: 39px;
    left: 0;
    width: 100%;
    padding: 12px 0;
    background-color: rgba(255, 255, 255, 0.9);
    .select-type-wrapper {
      display: -webkit-box;
      -webkit-box-orient: horizontal;
      -webkit-box-pack: start;
      -webkit-box-align: center;
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      font-size: 14px;
      margin: 0 12px 12px 12px;
      .select-type-title {
        width: 60px;
      }
      .select-type-content {
        width: 100%;
        label {
          padding: 0 12px;
          line-height: 26px;
          text-align: center;
        }
        label.active {
          color: #fff;
          background-color: @secondcolor;
          border-radius: 32px;
        }
        .select-type-row {
          display: -webkit-box;
          -webkit-box-orient: horizontal;
          -webkit-box-pack: justify;
          -webkit-box-align: center;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
      }
    }
  }


</style>
