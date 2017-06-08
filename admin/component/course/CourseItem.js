/**
 * Created by 1 on 2017/6/1.
 * course card component
 */
import React from "react";
export function CourseItem(props) {
    return (
        <div className="course-item-wrapper">
            <div className="course-item-avatar">
                <img src={props.course.avator} alt=""/>
                <div
                    className={
                        props.course.state === "3"
                            ? "checked course-item-status"
                            : props.course.state === "2"
                            ? "checking course-item-status"
                            : "uncheck course-item-status"
                    }
                >
                    {props.stateList &&
                    props.stateList[parseInt(props.course.state) - 1].label}
                </div>
                <div className="course-item-mask">
                    <div
                        className="cousrse-item-btn"
                        onClick={props.handlePublish.bind(this, props.course)}
                    >
                        <i className="iconfont"></i>
                        <span>发布</span>
                    </div>
                    <div
                        className="cousrse-item-btn"
                        onClick={props.handleUpdate.bind(this, props.course)}
                    >
                        <i className="iconfont"></i>
                        <span>编辑</span>
                    </div>
                    <div className="cousrse-item-btn"
                         onClick={props.handleDetail.bind(this, props.course)}
                    >
                        <i className="iconfont"></i>
                        <span>详情</span>
                    </div>
                </div>
            </div>
            <div className="course-item-info">
                <div className="course-item-title">
                    {props.course.title}
                    <label >{props.courseTypeList && props.courseTypeList[parseInt(props.course.type) - 1].label}</label>
                </div>
                <div className="course-item-statistisc">
                    <div className="data1">
                        <label>
                            <i className="iconfont"></i>{props.course.rate}
                        </label>
                    </div>
                    <div className="data2">
                        <label>
                            <i className="iconfont"></i>{props.course.views.length}
                        </label>
                        <label>
                            <i className="iconfont"></i>
                            {props.course.comments.length}
                        </label>
                        <label>
                            <i className="iconfont"></i>{props.course.tops.length}
                        </label>
                    </div>
                </div>
            </div>
            <div className="buttons">
                <label
                    className="buttons-item delete"
                    onClick={props.handleDelete.bind(this, props.course)}
                >
                    <i className="iconfont"></i>
                    <span>删除</span>
                </label>
            </div>
        </div>
    )
}
