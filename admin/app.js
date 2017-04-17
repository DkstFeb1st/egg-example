'use strict';
import React from "react";
import ReactDom from "react-dom";
import {Provider} from "react-redux";
import {syncHistoryWithStore} from "react-router-redux";
import {hashHistory, Route, Router} from "react-router";
import AppContainer from "containers/AppContainer";
import LoginContainer from "containers/LoginContainer";
import MainContainer from "containers/MainContainer";
import MyContainer from "containers/MyContainer";
import EditContainer from "containers/EditContainer";
import AuditContainer from "containers/AuditContainer";
import ExamineContainer from "containers/ExamineContainer";
import configureStore from "store/store";

require('css/base.css');
require('css/iconfont.css');
require('css/app.less');
require('css/admin.less')


/*创建store*/
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
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