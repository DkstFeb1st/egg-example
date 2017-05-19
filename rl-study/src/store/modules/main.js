/**
 * Created by 1 on 2016/1/1.
 */
import tabitem from "components/main/tabitem.vue";
import obligatory from "components/main/obligatory.vue";
// import {initialApi} from "apis/mainapi";
import * as types from "../mutation-types";

//initial state
const state = {
  currentView: tabitem,//当前tabcomponent
  currentIndex: 0,
  currentTabView: obligatory,//当前tabcomponent
  currentTabIndex: 0,
  paramList: []//参数列表 包含类型
}

//getters相当于react的mapPropsToState
const getters = {
  currentView: state => {
    return state.currentView
  },
  currentIndex: state => {
    return state.currentIndex
  },
  currentTabView: state => {
    return state.currentTabView
  },
  currentTabIndex: state => {
    return state.currentTabIndex
  }
}

//actions相当于react的action
const actions = {
  changeTabAction({commit}, _param){
    commit(types.CHANGETAB, _param)
  },
  changeTabItemAction({commit}, _param){
    commit(types.CHANGETABITEM, _param)
  }
}

//mutations相当于react的reduce
const mutations = {
  [types.CHANGETAB] (state, _param){
    state.currentView = _param.currentView
    state.currentIndex = _param.currentIndex
  },
  [types.CHANGETABITEM] (state, _param){
    state.currentTabView = _param.currentTabView
    state.currentTabIndex = _param.currentTabIndex
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

