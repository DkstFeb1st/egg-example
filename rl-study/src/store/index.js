import Vue from "vue";
import Vuex from "vuex";
import study from "./modules/study";
import main from "./modules/main";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules : {
    main,
    study
  },
  strict : debug
})
