<!--选修课tab-->
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
    <div class="list-wrapper">

      <div class="list-item-wrapper" v-for="( item, index ) in electiveList " v-on:click="goToDetail(item.id)">
        <div class="list-item-img">
          <img
            :src="item.avator"
          />
        </div>
        <div class="list-item-content">
          <p class="list-item-title">{{item.title}}</p>
          <p class="list-item-type">
                       <span>
                          {{item.authorname}}
                        </span>
          </p>
          <div class="list-item-extra">
            {{item.view_num}}人观看 | {{item.comment_num}}人评论

          </div>
        </div>
      </div>
    </div>
    <empty tip="暂无学习内容" v-if="electiveList && electiveList.length === 0"></empty>
  </div>
</template>

<script>
  import lifeMonitor from 'mixins/lifeMonitor'
  import  empty  from 'components/empty/empty.vue'
  export default {
    name: "elective",
    mixins: [lifeMonitor],
    beforeMount: function () {
      this.$vux.loading.show({
        text: '疯狂加载中...'
      })
      this.$store.dispatch('getElectiveListAction').then(() => this.$vux.loading.hide())
    },
    components: {
      empty
    },
    data () {
      return {}
    },
    computed: {
      electiveList: function () {
        return this.$store.state.study.electiveList
      }
    },
    methods: {
      goToDetail(_id){
        this.$router.push(`/detail/${_id}`)
      }
    }
  }
</script>

<style lang="less">
  @primarycolor: #208157;
  @secondcolor: lighten(#208157, 10%);
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
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1);
    -o-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1);
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

  .list-wrapper {
    background-color: #fff;
    .list-item-wrapper {
      padding: 12px;
      display: -webkit-box;
      -webkit-box-orient: horizontal;
      -webkit-box-pack: start;
      -webkit-box-align: start;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      .list-item-img {
        position: relative;
        width: 120px;
        height: 90px;
        margin-right: 12px;
        overflow: hidden;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 5px;
          width: 100%;
        }
      }
      .list-item-content {
        flex: 1;
        -webkit-box-flex: 1;
        .list-item-title {
          margin-bottom: 12px;
          font-size: 18px;
          color: #000;
        }
        .list-item-type, .list-item-extra {
          font-size: 12px;
          color: #666;
          margin-bottom: 12px;
        }
      }
    }
  }
</style>
