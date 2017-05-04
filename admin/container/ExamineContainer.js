/**
 * Created by 1 on 2017/4/12.
 */
import React from "react";
import {connect} from "react-redux";
import {Layout, Modal, Table} from "antd";
import {getSpListRequest, putSpExamineRequest} from "reducers/StudyReducer";
import ExamineModalComponent from "components/ExamineModalComponent";
import PhoneViewModalComponent from "components/PhoneViewModalComponent";
const {Content} = Layout;


class ExamineContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            examineModalkey: Math.random(),
            examineModalVisible: false,
            viewModalVisible: false,
            current: ""
        }
    }

    componentDidMount() {
        let param = {
            state: '2',
            department: '1'
        }
        this.props.dispatch(getSpListRequest(param))
    }

    handlerExamineModal(recode) {
        this.setState({
            currentid: recode.id,
            examineModalVisible: true
        })
    }

    handleView(record) {
        this.setState({
            current: record.id,
            viewModalVisible: !this.state.viewModalVisible
        });
    }

    handleViewModalVisible() {
        this.setState({
            viewModalVisible: !this.state.viewModalVisible
        });
    }
    handlerExamineSubmit(_param) {
        let obligatory = _param.obligatory.join(',') + ","
        let elective = _param.elective.join(',') + ","
        _param = {
            id: this.state.currentid,
            obligatory: obligatory,
            elective: elective,
            state: 3,
            log: {
                sp_id: this.state.currentid,
                userid: this.props.user.account,
                content: "审批通过"
            }
        }
        this.props.dispatch(putSpExamineRequest(_param, {
            state: '2',
            department: '1'
        }))
        this.setState({
            examineModalkey: Math.random(),
            examineModalVisible: false
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
                    state: '6',
                    log: {
                        sp_id: record.id,
                        userid: this.props.user.account,
                        content: "审批不通过"
                    }
                }
                this.props.dispatch(putSpAuditRequest(_param, {
                    state: 2
                }))
                e()
            }
        });
    }

    render() {
        let {examineModalkey, examineModalVisible, viewModalVisible, current} = this.state
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            width: 300
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
                    <span onClick={this.handleView.bind(this, record)}>预览</span>
                    <span className="ant-divider"/>
                    <span onClick={this.handlerExamineModal.bind(this, record)}>审批</span>
                    <span className="ant-divider"/>
                    <span onClick={this.handlerReject.bind(this, record)}>拒绝</span>
                </a>
            ),
        }];
        return (
            <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                <Table columns={columns} dataSource={this.props.spList}/>
                <ExamineModalComponent
                    title="审批表单"
                    jobList={this.props.jobList}
                    key={examineModalkey}
                    visible={examineModalVisible}
                    cancel={() => this.setState({
                        examineModalkey: Math.random(),
                        examineModalVisible: false
                    })}
                    submit={this.handlerExamineSubmit.bind(this)}
                >
                </ExamineModalComponent>
                <PhoneViewModalComponent
                    id={current}
                    visible={viewModalVisible}
                    handleViewModalVisible={this.handleViewModalVisible.bind(this)}
                />
            </Content>
        )
    }
}
function mapStateToProps(state) {
    return {
        stateList: state.UserReducer.stateList,
        jobList: state.UserReducer.jobList,
        spList: state.StudyReducer.spList,
        user: state.UserReducer.user
    }
}

module.exports = connect(mapStateToProps)(ExamineContainer);
