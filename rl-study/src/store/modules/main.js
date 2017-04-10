/**
 * Created by 1 on 2016/1/1.
 */
import {initialApi} from "apis/mainapi";
import * as types from "../mutation-types";

//initial state
const state = {
  paramList: []//参数列表 包含类型
}

//getters相当于react的mapPropsToState
const getters = {}

//actions相当于react的action
const actions = {
  initialAction ({commit}){
    return initialApi()
      .then(response => {
        let _data = response.data
        commit(types.INITIAL, {_data})
      })
      .catch(error => {
        //发布错误 提示用户
      })
  }
}

//mutations相当于react的reduce
const mutations = {
  [types.INITIAL] (state, {_data}){
    console.log(_data)
    state.paramList = _data.paramList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

