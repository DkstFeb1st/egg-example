<!--
  name : 表情包通用模块
  props : emshow 是否显示
  actions : on-emoji-click 监听表情点击
-->
<template>
  <swiper dots-position="center" class="swemoji-item-container" v-if="emshow">
    <swiper-item v-for="(item,index) in emojis"
                 :key="index"
                 class="swemoji-item-wrapper"
    >
      <div v-for="(row,index) in item" :key="index" class="swemoji-item-row">
        <label v-for="(emoji,index) in row" v-on:click="onEmojiClick(emoji)">
          <emotion>{{emoji}}</emotion>
        </label>
      </div>
    </swiper-item>
  </swiper>
</template>
<script>
  const emojis = [[['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡'], ['大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗'], ['抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐']], [['流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨'], ['衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑'], ['左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓']], [['可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头'], ['玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀'], ['足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱']], [['握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK'], ['爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳'], ['挥手', '激动', '街舞', '献吻', '左太极', '右太极']]]
  import {WechatEmotion as Emotion, Swiper, SwiperItem} from 'vux'
  export default {
    name: 'swemoji',
    components: {
      Swiper,
      SwiperItem,
      Emotion
    },
    props: ['emshow'],
    computed: {
      emojis: function () {
        return emojis
      }
    },
    methods: {
      onEmojiClick: function (emoji) {
        this.$emit('on-emoji-click', emoji)
      },
      onBackClick: function () {

      }
    }
  }
</script>
<style lang="less">
  .swemoji-item-container {
    height: 130px;
    .swemoji-item-wrapper {
      padding: 12px 0;
      background-color: #f5f5f5;
      .swemoji-item-row {
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-pack: justify;
        padding: 0 12px;
        label {
          display: block;
          -webkit-box-flex: 1;
        }
        label.iconfont {
          font-size: 24px;
          color: #666;
        }
      }
    }
  }

</style>
