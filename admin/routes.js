/**
 * Created by Dministrator on 2017/4/17.
 */
import React from "react";
import {Route} from "react-router";
import AppContainer from "containers/AppContainer";
import LoginContainer from "containers/LoginContainer";
import MainContainer from "containers/MainContainer";
import MyContainer from "containers/MyContainer";
import UEditContainer from "containers/UEditContainer";
import AuditContainer from "containers/AuditContainer";
import ExamineContainer from "containers/ExamineContainer";

const routes = (
    <Route path="/" component={AppContainer}>
        <Route path="/login" component={LoginContainer}></Route>
        <Route path="/main" component={MainContainer}>
            <Route path="my" component={MyContainer}></Route>
            <Route path="edit" component={UEditContainer}></Route>
            <Route path="audit" component={AuditContainer}></Route>
            <Route path="examine" component={ExamineContainer}></Route>
        </Route>
    </Route>
)
export default routes