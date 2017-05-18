/**
 * Created by 1 on 2017/4/14.
 */

import axios from "axios";

var Cookies = require('cookies-js')
var instance = axios.create({
    headers: {'x-csrf-token': Cookies.get('csrfToken')}
})

//登录pwd
export function loginByPwd(_param) {
    return instance.post(`api/sp/loginByPwd`, _param)
}
//退出
export function loginout(_param) {
    return instance.post(`api/sp/loginout`)
}
//初始化系统
export function initial() {
    return instance.get(`api/sp/initial`)
}

//根据查询学习资料
export function getSpList(_param) {
    return instance.get(`api/sp/getSpList`, {
        params: _param
    })
}

//查询学习资料明细
export function getSpDetail(_param) {
    return instance.get(`api/sp/viewSpDetail`, {
        params: _param
    })
}
//创建学习资料
export function doCreate(_param) {
    return instance.post(`api/sp/doCreate`, _param)
}

//修改学习资料
export function doUpdate(_param) {
    return instance.put(`api/sp/doUpdate`, _param)
}

//获取图库列表
export function getImageList(_param) {
    return instance.get(`api/sp/getImageList`, {
        params: _param
    })
}

//获取视频列表
export function getVedioList(_param) {
    return instance.get(`api/sp/getVedioList`, {
        params: _param
    })
}

//获取文档列表
export function getDocumentList(_param) {
    return instance.get(`api/sp/getDocumentList`, {
        params: _param
    })
}

//获取音频列表
export function getAudioList(_param) {
    return instance.get(`api/sp/getAudioList`, {
        params: _param
    })
}
