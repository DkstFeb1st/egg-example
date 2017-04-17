/**
 * Created by 1 on 2016/10/17.
 * 用户Reducer
 */
import {INITIAL, LOGINSUCCESS} from "store/mutation-types";
import {initial, loginByPwd} from "apis/apiList";
import {push} from "react-router-redux";

export const loginSuccess = (_data) => {
    return {
        type: LOGINSUCCESS,
        user: _data.user
    }
}

export const loginRequest = (_param) => {
    return (dispatch, getState) => {
        return loginByPwd(_param)
            .then(response => {
                if (response.status === 200 && response.data.status === 200) {
                    dispatch(loginSuccess(response.data))
                    dispatch(push('/main'));
                } else {
                    alert(response.data.msg)
                }
            })
    }
}

export const initialAction = (_data) => {
    return {
        type: INITIAL,
        data: _data
    }
}

export const initialRequest = () => {
    return (dispatch, getState) => {
        return initial().then(response => {
            if (response.status === 200 && response.data.status === 200) {
                dispatch(initialAction(response.data))
            } else {
                alert(response.data.msg)
            }
        })
    }
}

export const UserReducer = function (state = {
                                         isAuthenticated: false,
                                         stateList: [],
                                         departmentList: [],
                                         jobList: [],
                                         user: {}
                                     }, action) {
    switch (action.type) {
        case LOGINSUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: !state.isAuthenticated,
                user: action.user
            })
        case INITIAL:
            return Object.assign({}, state, {
                stateList: action.data.stateList,
                departmentList: action.data.departmentList,
                jobList: action.data.jobList
            })
        default:
            return state;
    }
}
