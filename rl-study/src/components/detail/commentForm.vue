<!--评论表单页面-->
<template>
  <div>
    <group>
      <i class="iconfont emoji" v-on:click="_handlerEmojiShow">&#xe602;</i>
      <x-textarea
        :max="50"
        placeholder="请填写评论"
        v-model="content"
        @on-blur="_handleTextAreaBlur()">
      </x-textarea>
      <cell title="评分" v-if="this.$route.query.root === 'true'">
        <rater v-model="rate" slot="value" star="♡" active-color="red" :margin="15"></rater>
      </cell>
      <swemoji
        :emshow="emshow"
        @on-emoji-click="_handleEmojiClick"
      >
      </swemoji>
    </group>
    <box gap="10px 10px">
      <x-button type="primary" action-type="button" @click.native="_handlerSubmit">提交</x-button>
    </box>
  </div>
</template>
<script>
  import {XTextarea, Rater, Group, Cell, XButton, Box} from 'vux'
  import swemoji from 'components/detail/swemoji.vue'
  import {addCommentApi} from 'apis/studyapi'
  export default {
    name: 'CommentForm',
    components: {
      XTextarea,
      Group,
      Cell,
      Rater,
      XButton,
      Box,
      swemoji
    },
    data () {
      return {
        rate: 0,
        content: "",//文本域值双向绑定
        pos: 0,//光标位置 用于表情插入
        emshow: false//表情包模块是否显示
      }
    },
    methods: {
      _handleTextAreaBlur: function () {
        //失去焦点记录光标位置
        this.pos = event.target.selectionStart
      },
      _handlerEmojiShow: function () {
        //控制emoji模块是否显示
        this.emshow = !this.emshow
      },
      _handleEmojiClick: function (_emoji) {
        //在对应的光标位置插入表情
        let content_arr = this.content.split('')
        content_arr.splice(this.pos || this.content.length, 0, "/" + _emoji)
        this.content = content_arr.join("")
      },
      _handlerSubmit: function () {
        const data = {
          custno: '8581234',
          name: '金吵醒',
          avator: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1490859211&di=00acc596e260316879dd68ac0b9fac7c&src=http://img3.duitang.com/uploads/item/201508/16/20150816231615_SwvhH.thumb.700_0.jpeg',
          sp_id: this.$route.query.root === 'true' ? this.$route.params.id : this.$route.query.id,
          content: this.content,
          rate: this.rate,
          parentid: this.$route.query.root === 'true' ? '' : this.$route.params.id
        }
        this.$vux.loading.show({
          text: '疯狂加载中...'
        })
        addCommentApi(data)
          .then(response => {
            this.$vux.loading.hide()
            if (response.status === 200) {
              this.$router.go(-1)
            } else {
              //提示
              this.$vux.alert.show({
                title: '提示',
                content: response.data
              })
            }
          })
          .catch(error => {
            console.log(error)
            this.$vux.loading.hide()
            this.$vux.alert.show({
              title: '提示',
              content: '数据异常'
            })
          })
      }
    }
  }
</script>
<style lang="less">
  i.emoji {
    position: absolute;
    left: 12px;
    top: 76px;
    font-size: 30px;
    color: #666;
    z-index: 1;
  }
</style>
