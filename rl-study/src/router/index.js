import Vue from "vue";
import Router from "vue-router";
import Tab from "components/tab.vue";
import Detail from "components/detail/singledetail.vue";
import SerialDetail from "components/detail/serialdetail.vue";
import CommentForm from "components/comment/commentForm.vue";
import RateForm from "components/comment/RateForm.vue";
import CommentList from "components/comment/commentlist.vue";
import TopList from "components/detail/topList.vue";
import Studying from "components/course/studying.vue";
import Loveing from "components/course/loveing.vue";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tab',
      component: Tab
    },
    {//单课程详情页
      path: '/detail/:id',
      name: 'detail',
      component: Detail,
    },
    {//专题课程详情页
      path: '/sdetail/:id',
      name: 'serialdetail',
      component: SerialDetail
    },
    {//评论提交
      path: '/detail/commentform/:id',
      name: 'comment',
      component: CommentForm
    },
    {//评分提交
      path: '/detail/rateform/:id',
      name: 'rate',
      component: RateForm
    },
    {//子评论列表
      path: '/detail/commentList/:id',
      name: 'commentList',
      component: CommentList
    },
    {//点赞列表
      path: '/detail/topList/:c_id',
      name: 'topList',
      component: TopList
    },
    {//正在学习的课程
      path: '/course/studying',
      name: 'studying',
      component: Studying
    },
    {//收藏课程
      path: '/course/loveing',
      name: 'loveing',
      component: Loveing
    }
  ]
})
