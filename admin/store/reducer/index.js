/**
 * Created by 1 on 2017/4/12.
 */
import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";

import {UserReducer} from "reducers/UserReducer";
import {StudyReducer} from "reducers/StudyReducer";
import {CategoryReducer} from "reducers/CategoryReducer";

//注册reducer，每个自定义的reducer都要来这里注册！！！不注册会报错。
const rootReducer = combineReducers({
    UserReducer,
    StudyReducer,
    CategoryReducer,
    routing: routerReducer
});

export default rootReducer;