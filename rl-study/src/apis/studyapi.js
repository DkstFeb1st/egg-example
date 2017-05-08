/**
 * Created by 1 on 2016/1/1.
 */

import axios from "axios";
export function getObligatoryListApi() {
  //return axios.get(`${HEADURL}getUserInfo`)
  return axios.get(`api/sp/getObligatoryList`)
}

export function getElectiveListApi() {
  return axios.get(`api/sp/getElectiveList`)
}

export function getInterestListApi() {
  return axios.get(`api/sp/getInterestList`)
}
/*
 * _id : 学习资料,id，_custno : 8581234
 * */
export function getSpDetailListApi(_id, _custno) {
  return axios.post(`api/sp/getSpDetail`, {
    id: _id,
    custno: _custno
  })
}
/*
 * _id 评论id
 * */
export function getCommentListApi(_id) {
  return axios.get(`api/sp/getCommentList?id=${_id}`)
}

/*
 * 添加评论
 * */
export function addCommentApi(_param) {
  return axios.post(`api/sp/addComment`, _param)
}
/*
 * 添加评分
 * */
export function addRateApi(_param) {
  return axios.post(`api/sp/addRate`, _param)
}

