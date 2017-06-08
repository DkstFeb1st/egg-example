/**
 * Created by 1 on 2017/4/12.
 */
import React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import moment from "moment";
import {Col, Layout, Modal, Pagination, Row} from "antd";
import {getSpListRequest, putSpExamineRequest, updateSpRequest} from "reducers/StudyReducer";
import {updateMenuStateAction} from "reducers/UserReducer";
import {CourseItem} from "components/course/CourseItem";
import FilterCourse from "components/course/FilterCourse";
const {Content} = Layout;

class MyContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            current: 1, //当前页
            condition: "" //查询条件
        };
    }

    componentDidMount() {
        let {current} = this.state;
        let param = {
            authorcustno: this.props.user.userid,
            current: current,
            pageSize: 8
        };
        this.props.dispatch(getSpListRequest(param));
    }

  /*过滤查询*/
    handleFilter(values) {
        let {page} = this.state;
        let param = {
            authorcustno: this.props.user.userid,
            current: 1,
            pageSize: 8,
            type: values.courseType,
            state: values.state,
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
                current: page,
                condition: values
            });
        });
    }

  /*分页操作*/
    handlePageChange(page, pageSize) {
        let {condition} = this.state;
        this.setState({
            current: page
        });
        let param = {
            authorcustno: this.props.user.userid,
            current: page,
            pageSize: 8,
            type: condition.courseType ? condition.courseType : "",
            state: condition.state ? condition.state : "",
            title: condition.title ? condition.title : "",
            createdAt: condition.createdAt && condition.createdAt.length > 0
                ? moment(condition.createdAt[0])
                    .locale("zh-cn")
                    .utcOffset(8)
                    .format("YYYY-MM-DD") +
                "," +
                moment(condition.createdAt[1])
                    .locale("zh-cn")
                    .utcOffset(8)
                    .format("YYYY-MM-DD")
                : ""
        };
        this.props.dispatch(getSpListRequest(param));
    }

  /*
   * 课程编辑
   * */
    handleUpdate(record) {
        if (record.type === "1") {
            this.props.dispatch(
                push({
                    pathname: `/main/cedit?id=${record.id}`
                })
            );
        } else {
            this.props.dispatch(
                push({
                    pathname: `/main/edit`,
                    state: {
                        record: record
                    }
                })
            );
    }
    }

  /*
   * 课程详情
   * */
    handleDetail(record) {
        this.props.dispatch(
            push({
                pathname: `/main/spdetail?id=${record.id}&type=${record.type}`
            })
        );
    }

    handlePublish(record) {
        if (record.state !== "7") {
            alert("课程状态异常");
            return;
        }
        const modal = Modal.confirm({
            title: "确认框",
            content: "确认课程发布",
            okText: "确认",
            cancelText: "取消",
            onOk: e => {
                let _param = {
                    id: record.id,
                    state: "1",
                    log: {
                        sp_id: record.id,
                        userid: this.props.user.account,
                        content: "课程发布"
                    }
                };

                this.props.dispatch(updateSpRequest(_param)).then(response => {
                    let {condition} = this.state
                    let param = {
                        authorcustno: this.props.user.userid,
                        current: 1,
                        pageSize: 8,
                        type: condition.courseType ? condition.courseType : "",
                        state: condition.state ? condition.state : "",
                        title: condition.title ? condition.title : "",
                        createdAt: condition.createdAt && condition.createdAt.length > 0
                            ? moment(condition.createdAt[0])
                                .locale("zh-cn")
                                .utcOffset(8)
                                .format("YYYY-MM-DD") +
                            "," +
                            moment(condition.createdAt[1])
                                .locale("zh-cn")
                                .utcOffset(8)
                                .format("YYYY-MM-DD")
                            : ""
                    };
                    if (response.status == "200")
                        this.props.dispatch(getSpListRequest(param));
                });
                modal.destroy();
            }
        });
    }

  /*
   * 培训课程删除
   * */
    handleDelete(record) {
        let param = {
            id: record.id,
            state: "5",
            log: {
                sp_id: record.id,
                userid: this.props.user.userid,
                content: "删除培训课程"
            }
        };
        this.props.dispatch(updateSpRequest(param)).then(response => {
            let {condition} = this.state
            let param = {
                authorcustno: this.props.user.userid,
                current: 1,
                pageSize: 8,
                type: condition.courseType ? condition.courseType : "",
                state: condition.state ? condition.state : "",
                title: condition.title ? condition.title : "",
                createdAt: condition.createdAt && condition.createdAt.length > 0
                    ? moment(condition.createdAt[0])
                        .locale("zh-cn")
                        .utcOffset(8)
                        .format("YYYY-MM-DD") +
                    "," +
                    moment(condition.createdAt[1])
                        .locale("zh-cn")
                        .utcOffset(8)
                        .format("YYYY-MM-DD")
                    : ""
        };
            if (response.status == "200")
                this.props.dispatch(getSpListRequest(param));
        });
    }

    render() {
        let {current, id} = this.state;
        return (
            <Content
                style={{
                    background: "#ececec",
                    minHeight: 280,
                    overflowX: "hidden",
                    zIndex: "1"
                }}
            >
              <FilterCourse
                  title="我的课程"
                  courseTypeList={this.props.courseTypeList}
                  stateList={this.props.stateList}
                  handleFilter={this.handleFilter.bind(this)}
              />
              <Row gutter={16} style={{padding: "0 12px"}}>
                  {this.props.spList.map((obj, index) => {
                      return (
                          <Col md={6} key={obj.id}>
                            <CourseItem
                                course={obj}
                                courseTypeList={this.props.courseTypeList}
                                stateList={this.props.stateList}
                                handleUpdate={this.handleUpdate.bind(this)}
                                handleDelete={this.handleDelete.bind(this)}
                                handleDetail={this.handleDetail.bind(this)}
                                handlePublish={this.handlePublish.bind(this)}
                            />
                          </Col>
                      );
                  })}
              </Row>
              <footer style={{textAlign: "center"}}>
                <Pagination
                    current={current}
                    total={this.props.spTotal}
                    defaultPageSize={10}
                    onChange={this.handlePageChange.bind(this)}
                />
              </footer>
            </Content>
        );
    }
}
function mapStateToProps(state) {
    return {
        stateList: state.UserReducer.stateList,
        courseTypeList: state.UserReducer.courseTypeList,
        spList: state.StudyReducer.spList,
        spTotal: state.StudyReducer.spTotal,
        user: state.UserReducer.user
    };
}

module.exports = connect(mapStateToProps)(MyContainer);
