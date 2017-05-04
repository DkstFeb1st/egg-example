/**
 * Created by 1 on 2016/10/17.
 * 用户Reducer
 */
import {
    GETDOCUMENTLIST,
    GETGALLERYLIST,
    GETVEDIOLIST,
    INITIAL,
    LOGIN,
    LOGINOUT,
    UPDATEMENU
} from "store/mutation-types";
import {getDocumentList, getImageList, getVedioList, initial, loginByPwd} from "apis/apiList";
import {push} from "react-router-redux";

export const logoutAction = () => {
    return {
        type: LOGINOUT
    };
};

export const loginSuccess = _data => {
    return {
        type: LOGIN,
        user: _data.user
    };
};

export const loginRequest = _param => {
    return (dispatch, getState) => {
        return loginByPwd(_param).then(response => {
            if (response.status === 200 && response.data.status === 200) {
                dispatch(loginSuccess(response.data));
                dispatch(push("/main"));
            } else {
                alert(response.data.msg);
            }
        });
    };
};

export const initialAction = _data => {
    return {
        type: INITIAL,
        data: _data
    };
};

export const initialRequest = () => {
    return (dispatch, getState) => {
        return initial().then(response => {
            if (response.status === 200 && response.data.status === 200) {
                dispatch(initialAction(response.data));
            } else {
                alert(response.data.msg);
            }
        });
    };
};
/*手工切换菜单 提交成功或者点击修改时(record)*/
export const updateMenuStateAction = _param => {
    return {
        type: UPDATEMENU,
        currentMeunKey: _param
    };
};

/*
 * 用户图库
 * */
const getImageListAction = _data => {
    return {
        type: GETGALLERYLIST,
        galleryList: _data.galleryList,
        galleryTotal: _data.galleryTotal
    };
};
export const getImageListRequest = _param => {
    return (dispatch, getState) => {
        return getImageList(_param).then(response => {
            if (response.status === 200 && response.data.status === 200) {
                dispatch(getImageListAction(response.data));
            } else {
                alert(response.data.msg);
            }
        });
    };
};

/*
 * 用户视频
 * */
const getVedioListAction = _data => {
    return {
        type: GETVEDIOLIST,
        vedioList: _data.vedioList,
        vedioTotal: _data.vedioTotal
    };
};
export const getVedioListRequest = _param => {
    return (dispatch, getState) => {
        return getVedioList(_param).then(response => {
            if (response.status === 200 && response.data.status === 200) {
                dispatch(getVedioListAction(response.data));
            } else {
                alert(response.data.msg);
            }
        });
    };
};

/*
 * 用户文库
 * */
const getDocumentAction = _data => {
    return {
        type: GETDOCUMENTLIST,
        documentList: _data.documentList,
        documentTotal: _data.documentTotal
    };
};
export const getDocumentListRequest = _param => {
    return (dispatch, getState) => {
        return getDocumentList(_param).then(response => {
            if (response.status === 200 && response.data.status === 200) {
                dispatch(getDocumentAction(response.data));
            } else {
                alert(response.data.msg);
            }
        });
    };
};
export const UserReducer = function (state = {
                                         isAuthenticated: false,
                                         stateList: [],
                                         departmentList: [],
                                         jobList: [],
                                         galleryList: [],
                                         galleryTotal: 0,
                                         documentList: [],
                                         documentTotal: 0,
                                         currentMeunKey: [],
                                         user: {}
                                     },
                                     action) {
    switch (action.type) {
        case LOGIN:
            window.__INITIAL_STATE__ = {};
            return Object.assign({}, state, {
                isAuthenticated: !state.isAuthenticated,
                user: action.user
            });
        case LOGINOUT:
            return Object.assign({}, state, {
                isAuthenticated: !state.isAuthenticated,
                user: {}
            });
        case INITIAL:
            return Object.assign({}, state, {
                stateList: action.data.stateList,
                departmentList: action.data.departmentList,
                jobList: action.data.jobList
            });
        case UPDATEMENU:
            let _currentMenuKey = [];
            _currentMenuKey.push(action.currentMeunKey);
            return Object.assign({}, state, {
                currentMeunKey: _currentMenuKey
            });
        case GETGALLERYLIST:
            return Object.assign({}, state, {
                galleryList: action.galleryList,
                galleryTotal: action.galleryTotal
            });
        case GETVEDIOLIST:
            return Object.assign({}, state, {
                vedioList: action.vedioList,
                vedioTotal: action.vedioTotal
            });
        case GETDOCUMENTLIST:
            return Object.assign({}, state, {
                documentList: action.documentList,
                documentTotal: action.documentTotal
            });
        default:
            return state;
    }
};
