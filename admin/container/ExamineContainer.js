/**
 * Created by 1 on 2017/4/12.
 */
import React from "react";
import {connect} from "react-redux";
import {Layout, Modal, Table} from "antd";
import {getSpListRequest, putSpExamineRequest} from "reducers/StudyReducer";
import ExamineModalComponent from "components/ExamineModalComponent";
const {Content} = Layout;


class ExamineContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            examineModalkey: Math.random(),
            examineModalVisible: false
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

    handlerExamineSubmit(_param) {
        let obligatory = _param.obligatory.join(',') + ","
        let elective = _param.elective.join(',') + ","
        _param = {
            id: this.state.currentid,
            obligatory: obligatory,
            elective: elective,
            state: 3
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
                    state: '4'
                }
                this.props.dispatch(putSpAuditRequest(_param, {
                    state: 2
                }))
                e()
            }
        });
    }

    render() {
        let {examineModalkey, examineModalVisible} = this.state
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            width: 300,
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
            </Content>
        )
    }
}
function mapStateToProps(state) {
    return {
        stateList: state.UserReducer.stateList,
        jobList: state.UserReducer.jobList,
        spList: state.StudyReducer.spList
    }
}

module.exports = connect(mapStateToProps)(ExamineContainer);