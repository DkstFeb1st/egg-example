/**
 * Created by 1 on 2017/4/14.
 */

import axios from "axios";

//登录pwd
export function loginByPwd(_param) {
    return axios.post(`api/sp/loginByPwd`, _param)
}
//退出
export function loginout() {
    return axios.post(`api/sp.loginout`)
}
//初始化系统
export function initial() {
    return axios.get(`api/sp/initial`)
}

//根据查询学习资料
export function getSpList(_param) {
    return axios.get(`api/sp/getSpList`, {
        params: _param
    })
}

//查询学习资料明细
export function getSpDetail(_param) {
    return axios.get(`api/sp/viewSpDetail`, {
        params: _param
    })
}
//创建学习资料
export function doCreate(_param) {
    return axios.post(`api/sp/doCreate`, _param)
}

//修改学习资料
export function doUpdate(_param) {
    return axios.put(`api/sp/doUpdate`, _param)
}

//获取图库列表
export function getImageList(_param) {
    return axios.get(`api/sp/getImageList`, {
        params: _param
    })
}

//获取视频列表
export function getVedioList(_param) {
    return axios.get(`api/sp/getVedioList`, {
        params: _param
    })
}

//获取文档列表
export function getDocumentList(_param) {
    return axios.get(`api/sp/getDocumentList`, {
        params: _param
    })
}
