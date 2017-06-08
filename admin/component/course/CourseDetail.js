/**
 * Created by 1 on 2017/6/7.
 * 专题课程
 */

import React from "react";
import {Collapse, Rate, Tabs} from "antd";
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

export function SingleCourseDetail(props) {
    return (
        <div className="detail-wrapper">
            <div className="detail-body">
                <header className="detail-title">
                    {props.spdetail.title}
                </header>
                <section className="detail-author">
                    <div>
                        <img
                            src={props.spdetail.authoravator}
                            alt=""
                            className="headerimg"
                        />
                        <div className="detail-author-info">
                            <p className="detail-authorname">
                                {props.spdetail.authorname}
                            </p>
                            <p className="detail-addtime">
                                {props.spdetail.createdAt}
                            </p>
                        </div>
                    </div>
                    <div className="detail-rate">
                        <i>{props.spdetail.rate}</i>分
                    </div>
                </section>
                <article
                    dangerouslySetInnerHTML={{__html: props.spdetail.fhtml}}
                />
            </div>
        </div>
    )
}

export function SerialCourseDetail(props) {
    return (
        <div className="detail-wrapper">
            <div className="detail-body">
                <header className="spserialdetail-header">
                    <img src={props.spdetail.avator} alt=""/>
                </header>
                <div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="介绍" key="1">
                            <div className="serialdetail-info">
                                <div className="serialdetail-title">
                                    <p className="title">{props.spdetail.title}</p>
                                    <div>
                                        <label className="rate">
                                            <Rate disabled defaultValue={props.spdetail.rate}/>
                                            {props.spdetail.rate}
                                        </label>
                                        <label className="viewnum">{props.spdetail.views.length}人学过</label>
                                    </div>
                                </div>
                                <div className="serialdetail-desc">
                                    <header>课程简介</header>
                                    <p>{props.spdetail.desc}</p>
                                </div>
                                <div className="serialdetail-suit">
                                    <header>适用人群</header>
                                    <p>{props.spdetail.suit}</p>
                                </div>
                                <div className="serialdetail-author">
                                    <header>
                                        作者
                                    </header>
                                    <div>
                                        <img src={props.spdetail.authoravator} alt=""/>
                                        <p>{props.spdetail.authorname}</p>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="目录" key="2">
                            <Collapse defaultActiveKey={['1']}>
                                {
                                    props.spCategoryList && props.spCategoryList.map((obj, index) => {
                                        let course = []
                                        obj.courses.map((obj, index) => {
                                            course.push(<p key={obj.title}>{obj.title}</p>)
                                        })
                                        return (
                                            <Panel header={obj.name} key={obj.name}>
                                                {course}
                                            </Panel>
                                        )
                                    })
                                }
                            </Collapse>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
