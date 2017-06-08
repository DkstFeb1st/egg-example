/**
 * Created by 1 on 2017/6/6.
 * 单个课程统计详情
 * 包括界面预览
 * 学习个数 获赞个数 评论个数 分数
 * 浏览人员表格（userid，最近浏览时间，progress）
 */
import React from "react";
import {connect} from "react-redux";
import {Col, Layout, Progress, Row, Table} from "antd";
import {getSpDetailRequest} from "reducers/StudyReducer";
import {SerialCourseDetail, SingleCourseDetail} from "components/course/CourseDetail";
import {MenuHeader} from "components/common/CommonLayout";
const {Content} = Layout;

const columns = [
    {
        title: "柜员号",
        dataIndex: "custno",
        key: "custno"
    },
    {
        title: "最近浏览日期",
        dataIndex: "updatedAt",
        key: "updatedAt"
    },
    {
        title: "进度",
        dataIndex: "progress",
        key: "progress",
        render: text => <Progress percent={text}/>
    }
];

class DetailContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spdetail: {},
            spCategoryList: [],
            spCommentList: [],
            spUserProgress: [],
            spUserProgress: []
        };
    }

    componentDidMount() {
        const _param = this.props.location.query;
        this.props.dispatch(getSpDetailRequest(_param)).then(response => {
            this.setState({
                spdetail: response.spdetail,
                spCategoryList: response.spCategoryList,
                spCommentList: response.spCommentList,
                spUserProgress: response.spUserProgress
            });
        });
    }

    render() {
        let {
            spdetail,
            spCategoryList,
            spCommentList,
            spUserProgress
        } = this.state;
        return (
            <Content
                style={{
                    overflowX: "hidden",
                    zIndex: "1"
                }}
            >
                <MenuHeader>课程详情</MenuHeader>
                <div className="spdetail-wrapper">
                    <div className="spdetail-container">
                        {spdetail.type === "1"
                            ? <SerialCourseDetail
                                spdetail={spdetail}
                                spCategoryList={spCategoryList}
                            />
                            : <SingleCourseDetail spdetail={spdetail}/>}

                    </div>
                    <Row className="spdetail-data">
                        <h5>
                            数据统计
                        </h5>
                        <Row
                            className="spdetail-statistic"
                            gutter={24}
                            style={{
                                marginLeft: "0",
                                marginRight: "0"
                            }}
                        >
                            <Col span={6}>
                                <div className="spdetail-statistic-item rate">
                                    <span>{spdetail.rate}</span> 评分
                                    <div className="icon">
                                        <i className="iconfont"></i>
                                    </div>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="spdetail-statistic-item view">
                                    <span>{spdetail.views && spdetail.views.length}</span>学习数
                                    <div className="icon">
                                        <i className="iconfont"></i>
                                    </div>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="spdetail-statistic-item top">
                                    <span>{spdetail.tops && spdetail.tops.length}</span> 点赞数
                                    <div className="icon">
                                        <i className="iconfont"></i>
                                    </div>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="spdetail-statistic-item comment">
                                    <span>{spCommentList.length}</span> 评论数
                                    <div className="icon">
                                        <i className="iconfont"></i>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="spdetail-data">
                            <h5>
                                数据表格（学习人员追踪）
                            </h5>
                            <Table
                                columns={columns}
                                dataSource={spUserProgress}
                                className="spdetail-table"
                            />
                        </Row>
                    </Row>
                </div>
            </Content>
        );
    }
}
const mapStateToProps = state => {
    return {};
};
module.exports = connect(mapStateToProps)(DetailContainer);
