/**
 * Created by Dministrator on 2017/4/17.
 */
import React from "react";
import {IndexRedirect, Route} from "react-router";
import AppContainer from "containers/AppContainer";
import LoginContainer from "containers/LoginContainer";
import MainContainer from "containers/MainContainer";
import MyContainer from "containers/MyContainer";
import UEditContainer from "containers/UEditContainer";
import CategoryContainer from "containers/CategoryContainer";
import AuditContainer from "containers/AuditContainer";
import ExamineContainer from "containers/ExamineContainer";
import DetailContainer from "containers/DetailContainer";
import {requireAuthentication} from "components/AuthenticatedComponent";


const routes = (
    <Route path="/" component={AppContainer}>
        <IndexRedirect to="/main"/>
        <Route path="/login" component={LoginContainer}></Route>
        <Route path="/main" component={requireAuthentication(MainContainer)}>
            <Route path="my" component={MyContainer}></Route>
            <Route path="edit" component={UEditContainer}></Route>
            <Route path="cedit" component={CategoryContainer}></Route>
            <Route path="audit" component={AuditContainer}></Route>
            <Route path="examine" component={ExamineContainer}></Route>
            <Route path="spdetail" component={DetailContainer}></Route>
        </Route>
    </Route>
)
export default routes
