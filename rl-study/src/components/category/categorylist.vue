<template>
  <div class="categorylist-wrapper">
    <template v-for="(item, _index) in categoryList">
      <cell
        class="category-wrapper"
        :title="item.name"
        is-link
        :border-intent="false"
        :arrow-direction="'down'"
      >
      </cell>
      <cell-box
        :border-intent="false"
        class="course-wrapper"
        v-for="(course, _x) in item.courses"
        :key="course.id"
        @click.native="routeChildCourse(course.id)"
        v-if="course.state === '3'"
      >
        <i class="iconfont">&#xe673;</i>
        {{course.title}}
        <i :class="{iconfont:true, studyed:true}" v-if="studyedids.includes(course.id)">&#xe68a;</i>
      </cell-box>

    </template>
  </div>
</template>

<script>
  import {Cell, CellBox} from 'vux'
  export default {
    name: 'categorylist',
    components: {
      Cell,
      CellBox
    },
    props: {
      categoryList: Array,
      study: Object,
      studyedids: Array
    },
    methods: {
      routeChildCourse: function (_id) {
        this.$router.push({path: `/detail/${_id}?courseType=3&sp_id=${this.study.id}`})
      }
    }
  }
</script>

<style lang="less">
  .categorylist-wrapper {
    background-color: #fff;
    font-size: 14px;
    .category-wrapper {
      background-color: #f7f7f7;
      color: #333;
    }
    .course-wrapper {
      position: relative;
      padding: 10px 20px;
      color: #666;
      i.studyed {
        position: absolute;
        right: 12px;
        top: 12px;
        color: #00A1F5;
      }
    }
  }
</style>
