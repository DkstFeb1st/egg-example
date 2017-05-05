/**
 * Created by 1 on 2016/1/1.
 */
import obligatory from "components/main/obligatory.vue";
// import {initialApi} from "apis/mainapi";
import * as types from "../mutation-types";

//initial state
const state = {
  currentView: obligatory,//当前tabcomponent
  currentIndex: 0,
  paramList: []//参数列表 包含类型
}

//getters相当于react的mapPropsToState
const getters = {
  currentView: state => {
    return state.currentView
  },
  currentIndex: state => {
    return state.currentIndex
  }
}

//actions相当于react的action
const actions = {
  // initialAction ({commit}){
  //   return initialApi()
  //     .then(response => {
  //       let _data = response.data
  //       commit(types.INITIAL, {_data})
  //     })
  //     .catch(error => {
  //       //发布错误 提示用户
  //     })
  // },
  changeTabAction({commit}, _param){
    commit(types.CHANGETAB, _param)
  }
}

//mutations相当于react的reduce
const mutations = {
  [types.CHANGETAB] (state, _param){
    state.currentView = _param.currentView
    state.currentIndex = _param.currentIndex
  },
  // [types.INITIAL] (state, {_data}){
  //   state.paramList = _data.paramList
  // }
}

export default {
  state,
  getters,
  actions,
  mutations
}

