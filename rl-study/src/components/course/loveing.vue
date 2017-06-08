<template>
  <CourseListItem
    :courseList="loveList"
  >
  </CourseListItem>
</template>
<script>
  import {mapGetters} from 'vuex'
  import CourseListItem from 'components/course/courseListItem.vue'
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
