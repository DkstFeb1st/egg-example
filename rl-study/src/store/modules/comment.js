/**
 * Created by 1 on 2017/6/6.
 */
import {addTopApi, createTopApi, getCommentListApi} from "apis/studyapi";

const state = {}

//getters相当于react的mapPropsToState
const getters = {}

const actions = {
  getCommentListAction({commit}, param){
    return getCommentListApi(param)
      .then(response => {
        return response
      })
      .catch(error => {
        alert(error)
      })
  },
  addTopAction({commit}, param){
    return addTopApi(param)
      .then(response => {
        return response
      })
      .catch(error => {
        alert(error)
      })
  },
  createTopAction({commit}, param){
    return createTopApi(param)
      .then(response => {
        return response
      })
      .catch(error => {
        alert(error)
      })
  }
}

const mutations = {}

export default {
  state,
  getters,
  actions,
  mutations
}
