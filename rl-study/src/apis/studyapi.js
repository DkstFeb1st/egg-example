/**
 * Created by 1 on 2016/1/1.
 */

import axios from "axios";
var Cookies = require('cookies-js')
var instance = axios.create({
  headers: {'x-csrf-token': Cookies.get('csrfToken')}
})

export function getObligatoryListApi() {
  return instance.get(`api/sp/getObligatoryList`)
}

export function getElectiveListApi() {
  return instance.get(`api/sp/getElectiveList`)
}

export function getInterestListApi() {
  return instance.get(`api/sp/getInterestList`)
}
/*
 * _id : 学习资料,id，_custno : 8581234
 * */
export function getSpDetailListApi(_param) {
  return instance.post(`api/sp/getSpDetail`, _param)
}
/*
 * _id 评论id
 * */
export function getCommentListApi(_id) {
  return instance.get(`api/sp/getCommentList?id=${_id}`)
}

/*
 * 添加评论
 * */
export function addCommentApi(_param) {
  return instance.post(`api/sp/addComment`, _param)
}
/*
 * 添加评分
 * */
export function addRateApi(_param) {
  return instance.post(`api/sp/addRate`, _param)
}

/*
 * 添加评论点赞
 * */
export function addTopApi(c_id) {
  return instance.post(`api/sp/addTop`, {
    c_id: c_id
  })
}

/*
 * 添加文章点赞
 * */
export function createTopApi(sp_id) {
  return instance.post(`api/sp/createTop`, {
    sp_id: sp_id
  })
}

/*
 * 获取点赞列表
 * */
export function getTopList(_param) {
  return instance.get(`api/sp/getTopList`, {
    params: _param
  })
}
