/**
 * Created by 1 on 2016/1/1.
 */

import axios from "axios";
const debug = process.env.NODE_ENV !== 'production'
export function getObligatoryListApi() {
  //return axios.get(`${HEADURL}getUserInfo`)
  return axios.get(`${ process.env.NODE_ENV !== 'production' ? '' : 'study'}/api/sp/getObligatoryList`)
}

export function getElectiveListApi() {
  return axios.get(`${ process.env.NODE_ENV !== 'production' ? '' : 'study'}/api/sp/getElectiveList`)
}

export function getInterestListApi() {
  return axios.get(`${ process.env.NODE_ENV !== 'production' ? '' : 'study'}/api/sp/getInterestList`)
}
/*
 * _id : 学习资料,id，_custno : 8581234
 * */
export function getSpDetailListApi(_id, _custno) {
  return axios.post(`${ process.env.NODE_ENV !== 'production' ? '' : 'study'}/api/sp/getSpDetail`, {
    id: _id,
    custno: _custno
  })
}
/*
 * _id 评论id
 * */
export function getCommentListApi(_id) {
  return axios.get(`${process.env.NODE_ENV !== 'production' ? '' : 'study'}/api/sp/getCommentList?id=${_id}`)
}

export function addCommentApi(_param) {
  return axios.post(`${process.env.NODE_ENV !== 'production' ? '' : 'study'}/api/sp/addComment`, _param)
}

