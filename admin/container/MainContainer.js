/**
 * Created by 1 on 2017/4/12.
 */
/**
 * Created by 1 on 2017/4/12.
 */
import React from "react";
import {connect} from "react-redux";
import {push, replace} from "react-router-redux";
import {Affix, Icon, Layout, Menu} from "antd";
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
            case "6":
                this.props.dispatch(
                    replace({
                        pathname: "/main/cedit"
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
        let {collapsed} = this.state
        return (
            <div id="main-container" className="main-container">
                <Header>
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
                <Layout >
                    <Affix className="affix">
                        <Sider collapsed={collapsed} className={collapsed ? "active" : ""}>
                            <div className="title">
                                <span>网站导航</span>
                                {
                                    collapsed ?
                                        <Icon type="menu-unfold" onClick={this.toggle.bind(this)}/>
                                        :
                                        <Icon type="menu-fold" onClick={this.toggle.bind(this)}/>
                                }

                            </div>
                            <Menu
                                mode={collapsed ? "vertical" : "inline"}
                                selectedKeys={this.props.currentMeunKey}
                                onClick={this.handleMenuClick.bind(this)}
                            >
                                <SubMenu key="1" title={<span><Icon type="book"/>课程管理</span>}>
                                    <Menu.Item
                                        key="4"
                                        disabled={
                                            this.props.user.role !== "sh" &&
                                            this.props.user.role !== "sp"
                                                ? false
                                                : true
                                        }
                                    >
                                        <span className="nav-text">我的课程</span>
                                    </Menu.Item>
                                </SubMenu>
                                <Menu.Item
                                    key="2"
                                    disabled={this.props.user.role === "sh" ? false : true}
                                >
                                    <Icon type="tags-o"/>
                                    <span className="nav-text">学习资料审核</span>
                                </Menu.Item>
                                <Menu.Item
                                    key="3"
                                    disabled={this.props.user.role === "sp" ? false : true}
                                >
                                    <Icon type="tags-o"/>
                                    <span className="nav-text">学习资料审批</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                    </Affix>
                    <Layout className={collapsed ? "active" : ""}>
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
