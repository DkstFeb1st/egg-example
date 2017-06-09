<template>
  <CourseListItem
    :courseList="loveList"
  >
  </CourseListItem>
  <empty tip="暂无课程" v-if="loveList && loveList.length === 0"></empty>
</template>
<script>
  import {mapGetters} from 'vuex'
  import CourseListItem from 'components/course/courseListItem.vue'
  import  empty  from 'components/empty/empty.vue'
  export default {
    name: 'loving',
    beforeMount: function () {
      this.$vux.loading.show({
        text: '疯狂加载中...'
      })
      this.$store.dispatch('getLoveListAction').then(() => this.$vux.loading.hide())
    },
    computed: {
      ...mapGetters(['loveList'])
    },
    components: {
      CourseListItem
    }
  }
</script>
<style lang="less">

</style>
