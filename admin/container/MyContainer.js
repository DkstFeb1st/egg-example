/**
 * Created by 1 on 2017/4/12.
 */
import React from "react";
import {connect} from "react-redux";
import {replace} from "react-router-redux";
import {Layout, Rate, Table} from "antd";
import {getSpListRequest, putSpExamineRequest, updateSpRequest} from "reducers/StudyReducer";
import {updateMenuStateAction} from "reducers/UserReducer";
import PhoneViewModalComponent from "components/PhoneViewModalComponent";
const {Content} = Layout;

class MyContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: "",
            viewModalVisible: false
        };
    }

    componentDidMount() {
        let param = {
            authorcustno: this.props.user.userid
        };
        this.props.dispatch(getSpListRequest(param));
    }

    handleView(record) {
        this.setState({
            current: record.id,
            viewModalVisible: !this.state.viewModalVisible
        });
    }

    handleUpdate(record) {
        this.props.dispatch(
            replace({
                pathname: "/main/edit",
                state: {
                    record: record
        }
            })
        );
        this.props.dispatch(updateMenuStateAction("5"));
    }

    handleDelete(record) {
        let param = {
            id: record.id,
            state: "5",
            log: {
                sp_id: record.id,
                userid: this.props.user.userid,
                content: "用户删除学习资料"
            }
        };
        let condition = {
            authorcustno: this.props.user.userid
        };
        this.props.dispatch(updateSpRequest(param, condition));
    }

    handleViewModalVisible() {
        this.setState({
            viewModalVisible: !this.state.viewModalVisible
        });
    }

    render() {
        let {viewModalVisible, current} = this.state;
        const columns = [
            {
                title: "标题",
                dataIndex: "title",
                key: "title",
                width: 300
            },
            {
                title: "评分",
                dataIndex: "rate",
                key: "rate",
                render: function (text) {
                    return <Rate allowHalf defaultValue={parseFloat(text)} disabled/>;
                }
            },
            {
                title: "创建日期",
                dataIndex: "createdAt",
                key: "createdAt"
            },
            {
                title: "状态",
                dataIndex: "state",
                key: "state",
                render: function (text) {
                    return this.props.stateList[text - 1].label;
                }.bind(this)
            },
            {
                title: "操作",
                key: "action",
                render: (text, record) => (
                    <a>
                        <span onClick={this.handleView.bind(this, record)}>预览</span>
                        <span className="ant-divider"/>
                        <span onClick={this.handleUpdate.bind(this, record)}>修改</span>
                        <span className="ant-divider"/>
                        <span onClick={this.handleDelete.bind(this, record)}>删除</span>
                    </a>
                )
            }
        ];
        return (
            <Content
                style={{
                    margin: "24px 16px",
                    padding: 24,
                    background: "#fff",
                    minHeight: 280
                }}
            >
                <Table columns={columns} dataSource={this.props.spList}/>
                <PhoneViewModalComponent
                    id={current}
                    visible={viewModalVisible}
                    handleViewModalVisible={this.handleViewModalVisible.bind(this)}
                />
            </Content>
        );
    }
}
function mapStateToProps(state) {
    return {
        stateList: state.UserReducer.stateList,
        spList: state.StudyReducer.spList,
        user: state.UserReducer.user
    };
}

module.exports = connect(mapStateToProps)(MyContainer);
