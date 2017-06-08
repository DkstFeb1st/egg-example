<template>
  <footer class="commentbar">
    <section @click="goComment"><i class="iconfont">&#xe6e5;</i>写评论</section>
    <div class="icon-group">
      <i class="iconfont">&#xe70c;
        <Badge v-bind:text="commentNum ? commentNum : 0 "></Badge>
      </i>
      <i class="iconfont" @click="goRate">&#xe6ea;</i>
      <i :class="{iconfont : true ,loved : xloved}" @click="goLove">&#xe612;</i>
    </div>
  </footer>
</template>

<script>
  import {Badge} from 'vux'
  export default {
    name: 'commentbar',
    components: {
      Badge
    },
    props: {
      commentNum: Number,
      study: Object,
      loved: Boolean
    },
    //props: ['commentNum','study','loved'],
    data(){
      return {
        xloved: this.loved
      }
    },
    watch: {
      loved: function (newloved) {
        this.xloved = newloved
      }
    },
    methods: {
      goComment: function () {
        this.$router.push({path: `/detail/commentform/${this.$route.params.id}?root=true&custno=${this.study.authorcustno}`})
      },
      goRate: function () {
        this.$router.push({path: `/detail/rateform/${this.$route.params.id}?custno=${this.study.authorcustno}`})
      },
      goLove: function () {
        let _param = {
          custno: this.study.authorcustno,
          sp_id: this.study.id
        }
        let that = this
        this.$store.dispatch('addOrDeleteLoveAction', _param)
          .then(response => {
            that.$vux.alert.show({
              title: '提示',
              content: response.msg
            })
            that.xloved = !that.xloved
          })
      }
    }
  }
</script>

<style lang="less">
  footer.commentbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: -webkit-box;
    -webkit-box-pack: justify;
    height: 48px;
    padding: 6px 10px;
    background-color: #fff;
    border-top: 1px solid #eee;
    section {
      background-color: #eeeeee;
      width: 60%;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 14px;
      line-height: 24px;
      i {
        color: #666;
        margin-right: 6px;
      }
    }
    .icon-group {
      width: 40%;
      display: -webkit-box;
      -webkit-box-orient: horizontal;
      -webkit-box-align: center;
      i {
        position: relative;
        font-size: 26px;
        display: block;
        -webkit-box-flex: 1;
        color: #666;
        text-align: center;
        .vux-badge {
          position: absolute;
          right: 0;
          top: -5px
        }
      }
      i.loved {
        color: #f04134;
      }
    }
  }
</style>
