/**
 * Created by 1 on 2016/1/1.
 */
import {getUserTabApi} from "apis/studyapi";
import * as types from "../mutation-types";

//initial state
const state = {
  user: {},
  spList: [],//我的发表文章列表
  cmdList: [],//我的获评列表
  tpdList: [],//我的获赞列表
}

//getters相当于react的mapPropsToState
const getters = {
  user: state => {
    return state.user
  },
  spList: state => {
    return state.spList
  },
  cmdList: state => {
    return state.cmdList
  },
  tpdList: state => {
    return state.tpdList
  }
}

//actions相当于react的action
const actions = {
  getUserTabAction ({commit}){
    return getUserTabApi()
      .then(response => {
        const data = response.data
        if (response.status === 200 && response.data.status === 200) {
          commit(types.GETUSERTAB, {data})
        }

      })
      .catch(error => {
        //发布错误 提示用户
      })
  },
}

//mutations相当于react的reduce
const mutations = {
  [types.GETUSERTAB] (state, {data}){
    state.user = data.user
    state.spList = data.spList
    state.cmdList = data.cmdList
    state.tpdList = data.tpdList
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}

