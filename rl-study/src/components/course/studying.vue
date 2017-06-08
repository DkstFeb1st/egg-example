<template>
  <CourseListItem
    :courseList="studyingList"
  >

  </CourseListItem>
</template>
<script>
  import {mapGetters} from 'vuex'
  import CourseListItem from 'components/course/courseListItem.vue'
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
