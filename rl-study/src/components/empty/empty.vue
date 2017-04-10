<template>
  <div class="empty-wrapper">
    <i class="iconfont">&#xe6b9;</i>
    <p>{{tip}}</p>
  </div>
</template>
<script>
  export default {
    name: 'empty',
    props: ['tip'],
  }
</script>
<style lang="less">
  .empty-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    i {
      color: #999;
      font-size: 56px;
    }
    p {
      margin-top: 12px;
      color: #666;
    }
  }
</style>
