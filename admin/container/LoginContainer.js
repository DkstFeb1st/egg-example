/**
 * Created by 1 on 2017/4/12.
 */
import React from "react";
import {connect} from "react-redux";

import {loginRequest} from "reducers/UserReducer";
class LoginContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            wait: true,
        }
    }

    handlerSubmit() {
        let _param = {
            account: this.refs.account.value,
            pwd: this.refs.pwd.value
        }
        this.props.dispatch(loginRequest(_param))
    }

    render() {
        let {wait} = this.state;
        return (
            <div className="login-module">
                <div className="login-module-feature">
                    <div className="brand-cover">

                    </div>
                    <div className="">

                    </div>
                </div>
                <div className="login-module-container">
                    <header className="login-form-header">
                        <a className="login-tab is-selected">管理员登录</a>
                        <a className="login-tab"
                           href="https://qy.weixin.qq.com/cgi-bin/loginpage?corp_id=wx365326b3672b185c&redirect_uri=http://localhost:3001&usertype=all">普通用户登录</a>
                    </header>
                    <form className="login-form">
                        <div style={{marginBottom: '35px'}}></div>
                        <div className="login-form-input-wrapper">
                            <input className="login-form-input" placeholder="账号" ref="account"/>
                        </div>
                        <div style={{marginBottom: '35px'}}></div>
                        <div className="login-form-input-wrapper">
                            <input className="login-form-input" placeholder="密码(至少6位)" type="password" ref="pwd"/>
                        </div>
                        <div style={{marginBottom: '35px'}}></div>

                        <div className="login-form-submit">
                            <botton id="embed-submit" className="login-form-submitbotton btn-submit btn"
                                    onClick={this.handlerSubmit.bind(this)}>登录
                            </botton>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.UserReducer.isAuthenticated,
    }
}

module.exports = connect(mapStateToProps)(LoginContainer);
