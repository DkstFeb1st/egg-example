<template>
  <CourseListItem
    :courseList="studyingList"
  >

  </CourseListItem>
  <empty tip="暂无课程" v-if="studyingList && studyingList.length === 0"></empty>
</template>
<script>
  import {mapGetters} from 'vuex'
  import CourseListItem from 'components/course/courseListItem.vue'
  import  empty  from 'components/empty/empty.vue'
  export default {
    name: 'studying',
    beforeMount: function () {
      this.$vux.loading.show({
        text: '疯狂加载中...'
      })
      this.$store.dispatch('getStudyingAction').then(() => this.$vux.loading.hide())
    },
    computed: {
      ...mapGetters(['studyingList'])
    },
    components: {
      CourseListItem
    }
  }
</script>
<style lang="less">

</style>
