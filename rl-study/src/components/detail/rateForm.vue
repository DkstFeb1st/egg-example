<!-打分表单页面-->
<template>
  <div>
    <group>
      <cell title="评分">
        <rater v-model="rate" slot="value" star="♡" active-color="red" :margin="15"></rater>
      </cell>
    </group>
    <box gap="10px 10px">
      <x-button type="primary" action-type="button" @click.native="_handlerSubmit">提交</x-button>
    </box>
  </div>
</template>
<script>
  import {Rater, Group, Cell, XButton, Box} from 'vux'
  import {addRateApi} from 'apis/studyapi'
  export default {
    name: 'RateForm',
    components: {
      Group,
      Cell,
      Rater,
      XButton,
      Box,
    },
    data () {
      return {
        rate: 0
      }
    },
    methods: {
      _handlerSubmit: function () {
        const data = {
          sp_id: this.$route.params.id,
          rate: this.rate,
          userid: this.$route.query.userid
        }
        this.$vux.loading.show({
          text: '疯狂加载中...'
        })
        addRateApi(data)
          .then(response => {
            this.$vux.loading.hide()
            if (response.status === 200 && response.data.status == 200) {
              let that = this
              that.$vux.toast.show({
                text: response.data.msg,
                onHide(){
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

</style>
