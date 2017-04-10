import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import {sync} from "vuex-router-sync";

import * as filters from "./filters";
import "./css/default.less";
import "./css/iconfont.css";
// create the app instance.
// here we inject the router and store to all child components,
import {AlertPlugin, ConfirmPlugin, LoadingPlugin, ToastPlugin} from "vux";
// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
const app = new Vue({
//import router
  el: '#app',
  router,
  //import store
  store,
  render: h => h(App)
})


// expose the app, the router and the store.
// note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in a browser or on the server.
export { app, router, store }
