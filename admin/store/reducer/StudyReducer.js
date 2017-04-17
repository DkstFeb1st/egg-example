/**
 * Created by 1 on 2017/4/13.
 */
import {doUpdate, getSpList} from "apis/apiList";
import {GETSPLIST} from "store/mutation-types";
/******************************************获取学习资料列表************************************************************/
const getSpListAction = (_data) => {
    for (let i = 0; i < _data.spList.length; i++) {
        _data.spList[i].createdAt = _data.spList[i].createdAt.replace('T', ' ').slice(0, 19)
    }
    return {
        type: GETSPLIST,
        spList: _data.spList
    }
}

export const getSpListRequest = (_param) => {
    return (dispatch, getState) => {
        return getSpList(_param)
            .then(response => {
                if (response.status === 200 && response.data.status === 200) {
                    dispatch(getSpListAction(response.data))
                } else {
                    alert(response.data.msg)
                }
            })
    }
}

/******************************************审核学习资料************************************************************/
export const putSpAuditRequest = (_param, _condition) => {
    return (dispatch, getState) => {
        return doUpdate(_param)
            .then(response => {
                if (response.status === 200 && response.data.status === 200) {
                    dispatch(getSpListRequest(_condition))
                    alert(response.data.msg)
                } else {
                    alert(response.data.msg)
                }
            })
    }
}
/******************************************审批学习资料学习资料*****************************************************/
export const putSpExamineRequest = (_param, _condition) => {
    return (dispatch, getState) => {
        return doUpdate(_param)
            .then(response => {
                if (response.status === 200 && response.data.status === 200) {
                    dispatch(getSpListRequest(_condition))
                    alert(response.data.msg)
                } else {
                    alert(response.data.msg)
                }
            })
    }
}
export const StudyReducer = function (state = {
                                          spList: []//学习资料列表
                                      }, action) {
    switch (action.type) {
        case GETSPLIST :
            return Object.assign({}, state, {
                spList: action.spList
            })
        default:
            return state;
    }
}