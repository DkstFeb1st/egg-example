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
  import {XTextarea, Group, XButton, Box} from 'vux'
  import swemoji from 'components/detail/swemoji.vue'
  import {addCommentApi} from 'apis/studyapi'
  export default {
    name: 'CommentForm',
    components: {
      XTextarea,
      Group,
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
          sp_id: this.$route.query.root === 'true' ? this.$route.params.id : this.$route.query.id,
          content: this.content,
          parentid: this.$route.query.root === 'true' ? 0 : this.$route.params.id
        }
        this.$vux.loading.show({
          text: '疯狂加载中...'
        })
        addCommentApi(data)
          .then(response => {
            this.$vux.loading.hide()
            if (response.status === 200 && response.data.status == 200) {
              let that = this
              that.$vux.toast.show({
                text: response.data.msg,
                onHide() {
                  that.$router.go(-1)
                }
              })
            } else {
              //提示
              this.$vux.alert.show({
                title: '提示',
                content: response.data.msg
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
