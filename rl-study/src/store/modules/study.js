/**
 * Created by 1 on 2016/1/1.
 */
import {getElectiveListApi, getInterestListApi, getObligatoryListApi} from "apis/studyapi";
import * as types from "../mutation-types";

//initial state
const state = {
  obligatoryList: [],//必修课列表
  electiveList: [],//选修课列表
  interestList: []//兴趣课列表
}

//getters相当于react的mapPropsToState
const getters = {

}

//actions相当于react的action
const actions = {
  getObligatoryListAction ({commit}){
    return getObligatoryListApi()
      .then(response => {
        const data = response.data
        if (response.status === 200 && response.data.status === 200) {
          commit(types.OBLIGATORY, {data})
        }

      })
      .catch(error => {
        //发布错误 提示用户
      })
  },

  getElectiveListAction ({commit}){
    return getElectiveListApi()
      .then(response => {
        const data = response.data
        if (response.status === 200 && response.data.status === 200) {
          commit(types.ELECTIVE, {data})
        }

      })
      .catch(error => {

      })
  },

  getInterestListAction ({commit}){
    return getInterestListApi()
      .then(response => {
        const data = response.data
        if (response.status === 200 && response.data.status === 200) {
          commit(types.INTEREST, {data})
        }

      })
      .catch(error => {

      })
  }
}

//mutations相当于react的reduce
const mutations = {
  [types.OBLIGATORY] (state, {data}){
    state.obligatoryList = data.obligatoryList
  },
  [types.ELECTIVE] (state, {data}){
    state.electiveList = data.electiveList
  },
  [types.INTEREST] (state, {data}){
    state.interestList = data.interestList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

