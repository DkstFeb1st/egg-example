/**
 * Created by 1 on 2016/1/1.
 */
import {getUserListApi} from 'apis/userapi'
import * as types from '../mutation-types'

//initial state
const state = {
  userList : []
}

//getters相当于react的mapPropsToState
const getters = {

}

//actions相当于react的action
const actions = {
  getUserListAction ({commit}){
    return getUserListApi()
      .then(data => {
        console.log(data)
        commit(types.GET_USERLIST,{data})
      })
  }
}

//mutations相当于react的reduce
const mutations = {
  [types.GET_USERLIST] (state, {data}){
    state.userList = data.userList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

