/**
 * Created by 1 on 2017/4/12.
 */
import React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Layout, Modal, Table} from "antd";
import {getSpListRequest, putSpAuditRequest} from "reducers/StudyReducer";
import AuditModalConponent from "components/AuditModalConponent";
import FilterCourse from "components/course/FilterCourse";
const {Content} = Layout;


class AuditContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            auditModalVisible: false,
            auditModalkey: Math.random(),
            current: ""
        }
    }

    componentDidMount() {
        let param = {
            state: '1',
            current: 1,
            pageSize: 10000
        }
        this.props.dispatch(getSpListRequest(param))
    }

    /*过滤查询*/
    handleFilter(values) {
        let param = {
            authorcustno: this.props.user.userid,
            current: 1,
            pageSize: 10000,
            type: values.courseType,
            state: '1',
            title: values.title,
            createdAt: values.createdAt && values.createdAt.length > 0
                ? moment(values.createdAt[0])
                    .locale("zh-cn")
                    .utcOffset(8)
                    .format("YYYY-MM-DD") +
                "," +
                moment(values.createdAt[1])
                    .locale("zh-cn")
                    .utcOffset(8)
                    .format("YYYY-MM-DD")
                : ""
        };
        this.props.dispatch(getSpListRequest(param)).then(response => {
            this.setState({
                condition: param
            })
        });
    }

    handleView(record) {
        this.props.dispatch(push({
            pathname: `/main/spdetail?id=${record.id}&type=${record.type}`
        }))
    }
    handlerAuditModel(record) {
        this.setState({
            currentid: record.id,
            auditModalVisible: true
        })
    }

    handlerAuditSubmit(_param) {
        _param = Object.assign({}, _param, {
            id: this.state.currentid,
            interest: _param.interest ? '1' : '0',
            state: _param.interest ? '3' : '2',
            log: {
                sp_id: this.state.currentid,
                userid: this.props.user.account,
                content: "审核通过"
            }
        })
        this.props.dispatch(putSpAuditRequest(_param, this.state.condition || {
                state: '1',
                current: 1,
                pageSize: 10000,
        }))
        this.setState({
            auditModalkey: Math.random(),
            auditModalVisible: false
        })
    }

    handlerReject(record) {
        const modal = Modal.confirm({
            title: '确认框',
            content: '确认拒绝课程发布',
            okText: '确认',
            cancelText: '取消',
            onOk: (e) => {
                let _param = {
                    id: record.id,
                    state: '4',
                    log: {
                        sp_id: record.id,
                        userid: this.props.user.account,
                        content: "审核不通过"
                    }
                }
                this.props.dispatch(putSpAuditRequest(_param, this.state.condition || {
                        state: 1,
                        current: 1,
                        pageSize: 10000
                }))
                modal.destroy()

            }
        });
    }

    render() {
        let {auditModalVisible, auditModalkey, current} = this.state
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
                return this.props.stateList[text].label
            }.bind(this)
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <a>
                    <span onClick={this.handleView.bind(this, record)}>详情</span>
                    <span className="ant-divider"/>
                    <span onClick={this.handlerAuditModel.bind(this, record)}>审核</span>
                    <span className="ant-divider"/>
                    <span onClick={this.handlerReject.bind(this, record)}>拒绝</span>
                </a>
            ),
        }];
        return (
            <Content
                style={{
                    minHeight: 280,
                    zIndex: '1'
                }}
            >
                <FilterCourse
                    title="待审批课程"
                    courseTypeList={this.props.courseTypeList}
                    stateList={this.props.stateList}
                    handleFilter={this.handleFilter.bind(this)}
                    view={true}
                    state={true}
                >

                </FilterCourse>
                <div
                    style={{
                        margin: "0 20px",
                        backgroundColor: "#fff"
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={this.props.spList}/>
                </div>
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
        departmentList: state.UserReducer.departmentList,
        stateList: state.UserReducer.stateList,
        courseTypeList: state.UserReducer.courseTypeList,
        user: state.UserReducer.user
    }
}

module.exports = connect(mapStateToProps)(AuditContainer);
