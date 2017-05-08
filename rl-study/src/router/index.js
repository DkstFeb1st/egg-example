import Vue from "vue";
import Router from "vue-router";
import Tab from "components/tab.vue";
import Detail from "components/detail/detail.vue";
import CommentForm from "components/detail/commentForm.vue";
import RateForm from "components/detail/RateForm.vue";
import CommentList from "components/detail/commentlist.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tab',
      component: Tab
    },
    {//学习资料详情
      path: '/detail/:id',
      name: 'detail',
      component: Detail,
    },
    {//评论提交
      path: '/detail/commentform/:id',
      name: 'comment',
      component: CommentForm
    },
    {
      path: '/detail/rateform/:id',
      name: 'rate',
      component: RateForm
    },
    {
      path: '/detail/commentList/:id',
      name: 'commentList',
      component: CommentList
    }
  ]
})
