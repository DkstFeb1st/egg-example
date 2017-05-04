'use strict';
require('es6-promise')
require('babel-polyfill')
import React from "react";
import ReactDom from "react-dom";
import {Provider} from "react-redux";
import {syncHistoryWithStore} from "react-router-redux";
import {hashHistory, Router} from "react-router";
import configureStore from "store/store";
import routes from "./routes";
require('babel-polyfill')
require('es6-promise')
require('css/base.css');
require('css/iconfont.css');
require('css/app.less');
require('css/admin.less')
require('css/ueditor.css')

/*创建store*/
const initialState = window.__INITIAL_STATE__ || ""
console.log(window.__INITIAL_STATE__)
const store = configureStore(initialState);
const history = syncHistoryWithStore(hashHistory, store);
ReactDom.render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>
    , document.getElementById('container')
);