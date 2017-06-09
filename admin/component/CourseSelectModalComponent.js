/**
 * Created by 1 on 2017/6/1.
 * 课程选择窗口 用于目录添加子课程
 */

import React from "react";
import {connect} from "react-redux";
import {Modal, Table} from "antd";
import {getSpList} from "apis/apiList";
const columns = [{
    title: '标题',
    dataIndex: 'title'
}, {
    title: '作者',
    dataIndex: 'authorcustno',
}, {
    title: '创建日期',
    dataIndex: 'createdAt',
}];

class CourseSelectModalComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            spList: []
        }
    }

    componentWillReceiveProps(nextProps) {
        let that = this
        if (nextProps.visible) {
            //筛选未审核及图文课程的列表
            let _param = {
                authorcustno: this.props.user.userid,
                current: 1,
                pageSize: 10000,
                type: '2'
            };
            getSpList(_param).then(response => {
                if (response.status === 200 && response.data.status === 200) {
                    that.setState({
                        spList: response.data.spList
                    });
                } else {
                    alert(response.data.msg);
                }
            });
        }
    }

    handleSubmit() {
        let {selectedRows} = this.state
        if (selectedRows && selectedRows.length > 0) {
            this.props.handleCourseModalSubmit(selectedRows)
        }
    }

    handleCancel() {
        this.props.handleCourseModalVisible()
    }

    render() {
        let {spList} = this.state
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRows: selectedRows
                })
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
        };
        return (
            <Modal
                key={this.props.newKey}
                width="580px"
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.handleSubmit.bind(this)}
                onCancel={this.handleCancel.bind(this)}
            >
                <Table rowSelection={rowSelection} columns={columns} dataSource={spList}/>
            </Modal>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.UserReducer.user
    }
}
module.exports = connect(mapStateToProps)(CourseSelectModalComponent)