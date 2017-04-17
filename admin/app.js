'use strict';
import React from "react";
import ReactDom from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import {routerMiddleware, syncHistoryWithStore} from "react-router-redux";
import {hashHistory, Route, Router} from "react-router";
import AppContainer from "containers/AppContainer";
import LoginContainer from "containers/LoginContainer";
import MainContainer from "containers/MainContainer";
import MyContainer from "containers/MyContainer";
import EditContainer from "containers/EditContainer";
import AuditContainer from "containers/AuditContainer";
import ExamineContainer from "containers/ExamineContainer";
import rootReducer from "reducers/index";

require('css/base.css');
require('css/iconfont.css');
require('css/app.less');
require('css/admin.less')

// Apply the middleware to the store
const middleware = routerMiddleware(hashHistory);
/*创建store*/
const store = createStore(
    rootReducer,
    applyMiddleware(middleware, thunkMiddleware, createLogger())
);
const history = syncHistoryWithStore(hashHistory, store);
ReactDom.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={AppContainer}>
                <Route path="/login" component={LoginContainer}></Route>
                <Route path="/main" component={MainContainer}>
                    <Route path="my" component={MyContainer}></Route>
                    <Route path="edit" component={EditContainer}></Route>
                    <Route path="audit" component={AuditContainer}></Route>
                    <Route path="examine" component={ExamineContainer}></Route>
                </Route>
            </Route>
        </Router>
    </Provider>
    , document.getElementById('container')
);