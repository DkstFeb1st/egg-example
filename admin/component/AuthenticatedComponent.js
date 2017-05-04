/**
 * Created by 1 on 2017/5/4.
 * 登录权限校验表
 */
import React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Spin} from "antd";

export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth() {
            if (!this.props.isAuthenticated) {
                let redirectAfterLogin = this.props.location.pathname;
                this.props.dispatch(push(`/login?next=${redirectAfterLogin}`));
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <Component {...this.props}/>
                        : <div className="main-load"><Spin size="large"></Spin><p>加载中</p></div>
                    }
                </div>
            )

        }
    }

    const mapStateToProps = (state) => ({
        isAuthenticated: state.UserReducer.isAuthenticated,
    });

    return connect(mapStateToProps)(AuthenticatedComponent);

}

