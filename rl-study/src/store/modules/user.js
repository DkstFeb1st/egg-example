/**
 * Created by 1 on 2016/1/1.
 */
import {addOrDeleteLoveApi, getLoveingListApi, getStudyingApi, getUserTabApi} from "apis/studyapi";
import * as types from "../mutation-types";

//initial state
const state = {
  user: {},
  spList: [],//我的发表文章列表
  cmdList: [],//我的获评列表
  tpdList: [],//我的获赞列表
  lvList: [],//我的获藏列表
  studyingList: [],//正在学习课程列表
  loveList: []//收藏列表
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
  },
  lvList: state => {
    return state.lvList
  },
  studyingList: state => {
    return state.studyingList
  },
  loveList: state => {
    return state.loveList
  }
}

//actions相当于react的action
const actions = {
  /*获取用户首页信息*/
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
  /*获取正在学习的课程*/
  getStudyingAction ({commit}){
    return getStudyingApi()
      .then(response => {
        const data = response.data
        if (response.status === 200 && response.data.status === 200) {
          commit(types.GETSTUDYING, {data})
        }
      })
  },
  /*获取收藏的课程*/
  getLoveListAction ({commit}){
    return getLoveingListApi()
      .then(response => {
        const data = response.data
        if (response.status === 200 && response.data.status === 200) {
          commit(types.GETLOVEING, {data})
        }
      })
  },
  /*添加或删除收藏*/
  addOrDeleteLoveAction ({commit}, param) {
    return addOrDeleteLoveApi(param)
      .then(response => {
        console.log(param)
        const data = response.data
        if (response.status === 200 && response.data.status === 200) {
          return response.data
        } else {
          return response.data
        }
      })
  }
}

//mutations相当于react的reduce
const mutations = {
  [types.GETUSERTAB] (state, {data}){
    state.user = data.user
    state.spList = data.spList
    state.cmdList = data.cmdList
    state.tpdList = data.tpdList
    state.lvList = data.lvList
  },
  [types.GETSTUDYING] (state, {data}){
    state.studyingList = data.studyingList
  },
  [types.GETLOVEING] (state, {data}){
    state.loveList = data.studylvList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

