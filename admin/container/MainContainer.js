/**
 * Created by 1 on 2017/4/12.
 */
/**
 * Created by 1 on 2017/4/12.
 */
import React from "react";
import {connect} from "react-redux";
import {push, replace} from "react-router-redux";
import {Icon, Layout, Menu} from "antd";
import {initialRequest, logoutRequest, updateMenuStateAction} from "reducers/UserReducer";
import {browerHistory} from "react-router";
const {Header, Sider, Content} = Layout;
const SubMenu = Menu.SubMenu;

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    componentDidMount() {
        console.log("initial");
        this.props.dispatch(initialRequest());
    }

    handleLogout() {
        this.props.dispatch(logoutRequest());
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleMenuClick(e) {
        console.log(e);
        this.props.dispatch(updateMenuStateAction(e.key));
        switch (e.key) {
            case "4":
                // this.props.replace({
                //         pathname: '/main/my'
                // })
                this.props.dispatch(
                    push({
                        pathname: "/main/my"
                    })
                );
                break;
            case "5":
                this.props.dispatch(
                    replace({
                        pathname: "/main/edit"
                    })
                );
                break;
            case "2":
                this.props.dispatch(
                    replace({
                        pathname: "/main/audit"
                    })
                );
                break;
            case "3":
                this.props.dispatch(
                    replace({
                        pathname: "/main/examine"
                    })
                );
                break;
        }
    }

    render() {
        return (
            <div id="main-container">
                <Layout>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode="inline"
                            selectedKeys={this.props.currentMeunKey}
                            onClick={this.handleMenuClick.bind(this)}
                        >
                            <SubMenu key="1" title="学习资料管理">
                                <Menu.Item
                                    key="4"
                                    disabled={
                                        this.props.user.role !== "sh" &&
                                        this.props.user.role !== "sp"
                                            ? false
                                            : true
                                    }
                                >
                                    <Icon type="user"/>
                                    <span className="nav-text">我的上传</span>
                                </Menu.Item>
                                <Menu.Item
                                    key="5"
                                    disabled={
                                        this.props.user.role !== "sh" &&
                                        this.props.user.role !== "sp"
                                            ? false
                                            : true
                                    }
                                >
                                    <Icon type="user"/>
                                    <span className="nav-text">学习资料编辑</span>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item
                                key="2"
                                disabled={this.props.user.role === "sh" ? false : true}
                            >
                                <Icon type="video-camera"/>
                                <span className="nav-text">学习资料审核</span>
                            </Menu.Item>
                            <Menu.Item
                                key="3"
                                disabled={this.props.user.role === "sp" ? false : true}
                            >
                                <Icon type="upload"/>
                                <span className="nav-text">学习资料审批</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: "#fff", padding: 0}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                                onClick={this.toggle.bind(this)}
                            />
                            <div className="header-user-info-wrapper">
                                <label className="avator">
                                    <img
                                        src={this.props.user.avatar || "public/img/avatar.png"}
                                        alt=""
                                    />
                                </label>
                                <label className="name">{this.props.user.name}</label>
                                <label
                                    className="logout"
                                    onClick={this.handleLogout.bind(this)}
                                >
                                    退出
                                </label>
                            </div>
                        </Header>
                        {this.props.children}
                    </Layout>
                </Layout>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.UserReducer.isAuthenticated,
        currentMeunKey: state.UserReducer.currentMeunKey,
        user: state.UserReducer.user
    };
}

module.exports = connect(mapStateToProps)(MainContainer);
