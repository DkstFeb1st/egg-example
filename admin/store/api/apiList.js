/**
 * Created by 1 on 2017/4/14.
 */

import axios from "axios";

//登录pwd
export function loginByPwd(_param) {
    return axios.post(`api/sp/loginByPwd`, _param)
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

//修改学习资料
export function doUpdate(_param) {
    return axios.put(`api/sp/doUpdate`, _param)
}

