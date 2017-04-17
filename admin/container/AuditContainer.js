/**
 * Created by 1 on 2017/4/12.
 */
import React from "react";
import {connect} from "react-redux";
import {Layout, Modal, Table} from "antd";
import {getSpListRequest, putSpAuditRequest} from "reducers/StudyReducer";
import AuditModalConponent from "components/AuditModalConponent";
const {Content} = Layout;


class AuditContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            auditModalVisible: false,
            auditModalkey: Math.random()
        }
    }

    componentDidMount() {
        let param = {
            state: '1'
        }
        this.props.dispatch(getSpListRequest(param))
    }

    handlerAuditModel(record) {
        this.setState({
            currentid: record.id,
            auditModalVisible: true
        })
    }

    handlerAuditSubmit(_param) {
        console.log(this.state.currentid)
        _param = Object.assign({}, _param, {
            id: this.state.currentid,
            interest: _param.interest ? '1' : '0',
            state: 2,
        })
        this.props.dispatch(putSpAuditRequest(_param, {
            state: '1'
        }))
        this.setState({
            auditModalkey: Math.random(),
            auditModalVisible: false
        })
    }

    handlerReject(record) {
        Modal.confirm({
            title: '确认框',
            content: '确认拒绝此学习资料上传',
            okText: '确认',
            cancelText: '取消',
            onOk: (e) => {
                let _param = {
                    id: record.id,
                    state: '4'
                }
                this.props.dispatch(putSpAuditRequest(_param, {
                    state: 1
                }))
                e()
            }
        });
    }

    render() {
        let {auditModalVisible, auditModalkey} = this.state
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: text => <a href="#">{text}</a>,
        }, {
            title: '作者',
            dataIndex: 'authorname',
            key: 'authorname',
        }, {
            title: '创建日期',
            dataIndex: 'createdAt',
            key: 'createdAt',
        }, {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: function (text) {
                return this.props.stateList[text - 1].label
            }.bind(this)
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <a>
                    <span onClick={this.handlerAuditModel.bind(this, record)}>审核</span>
                    <span className="ant-divider"/>
                    <span onClick={this.handlerReject.bind(this, record)}>拒绝</span>
                </a>
            ),
        }];
        return (
            <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                <Table
                    columns={columns}
                    dataSource={this.props.spList}/>
                <AuditModalConponent
                    departmentList={this.props.departmentList}
                    title="审核表单"
                    key={auditModalkey}
                    visible={auditModalVisible}
                    cancel={() => this.setState({
                        auditModalkey: Math.random(),
                        auditModalVisible: false
                    })}
                    submit={this.handlerAuditSubmit.bind(this)}
                ></AuditModalConponent>
            </Content>
        )
    }
}
function mapStateToProps(state) {
    return {
        spList: state.StudyReducer.spList,
        stateList: state.UserReducer.stateList,
        departmentList: state.UserReducer.departmentList
    }
}

module.exports = connect(mapStateToProps)(AuditContainer);
