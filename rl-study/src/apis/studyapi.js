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
export function getCommentListApi(_params) {
  return instance.get(`api/sp/getCommentList`, {
    params: _params
  })
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
export function addTopApi(params) {
  return instance.post(`api/sp/addTop`, params)
}

/*
 * 添加文章点赞
 * */
export function createTopApi(params) {
  return instance.post(`api/sp/createTop`, params)
}

/*
 * 添加或删除收藏
 * */
export function addOrDeleteLoveApi(_param) {
  return instance.post(`api/sp/addOrDeleteLove`, _param)
}

/*
 * 获取收藏列表
 * */
export function getLoveingListApi() {
  return instance.get(`api/sp/getLoveStudyList`)
}

/*
 * 获取点赞列表
 * */
export function getTopList(_param) {
  return instance.get(`api/sp/getTopList`, {
    params: _param
  })
}

/*
 * 我的tab页数据fetch
 * */
export function getUserTabApi() {
  return instance.get(`api/sp/getUserTab`)
}

/*
 * 我的tab页正在学习的课程
 * */
export function getStudyingApi() {
  return instance.get(`api/sp/getStudyingList`)
}
