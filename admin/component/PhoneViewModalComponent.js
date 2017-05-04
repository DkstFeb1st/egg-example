/**
 * Created by 1 on 2017/4/28.
 */

import React from "react";
import {connect} from "react-redux";
import {Button, Spin} from "antd";
import {getSpDetail} from "apis/apiList";
class PhoneViewModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            study: {},
            widthClass: "preview-360"
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.id) {
            let that = this;
            let _param = {
                id: nextProps.id
            };
            getSpDetail(_param).then(response => {
                if (response.status === 200 && response.data.status === 200) {
                    that.setState({
                        study: response.data.spdetail
                    });
                } else {
                    alert(response.data.msg);
                }
            });
            return
        }
        if (nextProps.study.title) {
            console.log(nextProps.study)
            this.setState({
                study: nextProps.study
            });
        }
    }

    handleClose() {
        this.props.handleViewModalVisible();
    }

    render() {
        const {study, widthClass} = this.state;
        return (
            <div
                style={{
                    position: "fixed",
                    left: "0",
                    top: "0",
                    right: "0",
                    bottom: "0",
                    zIndex: "999",
                    display: this.props.visible ? "block" : "none"
                }}
            >
                {!study
                    ? <Spin />
                    : <div
                        className={
                            this.props.visible
                                ? `preview-modal ${widthClass} fade in`
                                : `preview-modal ${widthClass} fade`
                        }
                        style={{display: this.props.visible ? "" : "none"}}
                    >
                        <div className="preview-modal-dialog">
                            <div className="modal-body">
                                <section className="preview-body">
                                    <div className="detail-container">
                                        <div className="detail-wrapper">
                                            <header className="detail-title">
                                                {study.title}
                                            </header>
                                            <section className="detail-author">
                                                <div>
                                                    <img
                                                        src={study.authoravator}
                                                        alt=""
                                                        className="headerimg"
                                                    />
                                                    <div className="detail-author-info">
                                                        <p className="detail-authorname">
                                                            {study.authorname}
                                                        </p>
                                                        <p className="detail-addtime">
                                                            {study.createdAt}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="detail-rate">
                                                    <i>{study.rate}</i>分
                                                </div>
                                            </section>
                                            <article
                                                dangerouslySetInnerHTML={{__html: study.fhtml}}
                                            />
                                            <div className="detail-comment-wrapper">
                                                <header>
                                                    <label>全部评论</label>
                                                </header>
                                                {study.comments &&
                                                study.comments.map((item, index) => {
                                                    return (
                                                        <section className="detail-comment-item">
                                                            <div>
                                                                <img
                                                                    src={item.avator}
                                                                    alt=""
                                                                    className="headerimg"
                                                                />
                                                            </div>
                                                            <div className="detail-comment">
                                                                <p className="detail-comment-name">
                                                                    {item.name}
                                                                </p>
                                                                <p className="detail-comment-time">
                                                                    {item.createdAt}
                                                                </p>
                                                                <p className="detail-comment-content">
                                                                    {item.content}
                                                                </p>
                                                                <div className="detail-comment-callback">
                                                                    共{item.comment_num}条回复
                                                                </div>
                                                            </div>
                                                        </section>
                                                    );
                                                })}

                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                right: "400px",
                                top: "80px",
                                width: "80px",
                                color: "#fff",
                                opacity: "1"
                            }}
                        >
                            <Button onClick={this.handleClose.bind(this)} type="primary">
                                关闭
                            </Button>
                        </div>
                        <div className="preview-mask"/>
                    </div>}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

module.exports = connect(mapStateToProps)(PhoneViewModalComponent);
