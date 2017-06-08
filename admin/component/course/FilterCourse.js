/**
 * Created by 1 on 2017/6/1.
 * filter course component
 */
import React from "react";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {Affix, Button, DatePicker, Form, Input, Radio, Select} from "antd";
const {RangePicker} = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;

class FilterCourse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            advance: true
        }
    }

    handleAdvance() {
        this.setState({
            advance: !this.state.advance
        })
    }

    handleFilter(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.handleFilter(values)
            }
        });
    }

    handleSingleCourseRedirect() {
        this.props.dispatch(push('/main/edit'))
    }

    handleSerialCourseRedirect() {
        this.props.dispatch(push('/main/cedit'))
    }

    render() {
        let {advance} = this.state
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        let new_stateList = this.props.stateList ? this.props.stateList.slice() : []
        new_stateList.splice(0, 0, {"value": "", "label": "全部"})
        return (
            <div style={{height: "148px"}}>
                <Affix>
                    <div className="filter-bar-wrapper">
                        <h5 className="title-bar">
                            {this.props.title}
                        </h5>
                        <Form>
                            <div className="control-bar">
                                <div className="filter">
                                    <label>类型：</label>
                                    <div className="filter-radio-bar filter-bar">
                                        <FormItem>
                                            {getFieldDecorator('courseType', {
                                                initialValue: ""
                                            })(
                                                <RadioGroup>
                                                    <RadioButton value="">全部</RadioButton>
                                                    {
                                                        this.props.courseTypeList && this.props.courseTypeList.map((obj, index) => {
                                                            return (
                                                                <RadioButton value={obj.value}>{obj.label}</RadioButton>
                                                            )
                                                        })
                                                    }
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                {
                                    this.props.state ? <span></span> :
                                        <div className="filter">
                                            <label>状态：</label>
                                            <div className="filter-select-bar filter-bar">
                                                <FormItem>
                                                    {getFieldDecorator('state', {
                                                        initialValue: ""
                                                    })(
                                                        <Select style={{width: "120px"}}>
                                                            {
                                                                new_stateList && new_stateList.map((obj, index) => {
                                                                    return (
                                                                        <Option value={obj.value}>{obj.label}</Option>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                    )}
                                                </FormItem>
                                            </div>
                                        </div>
                                }
                                <Button type="primary" onClick={this.handleFilter.bind(this)} icon="search">查询</Button>
                                {
                                    this.props.view ? <span></span> :
                                        <Button style={{marginLeft: "12px"}}
                                                onClick={this.handleSingleCourseRedirect.bind(this)} icon="file-add">图文课程</Button>
                                }
                                {
                                    this.props.view ? <span></span> :
                                        <Button style={{marginLeft: "12px"}}
                                                onClick={this.handleSerialCourseRedirect.bind(this)} icon="file-add">专题课程</Button>
                                }
                                <a className="filter-advanced" onClick={this.handleAdvance.bind(this)}>
                                    <i className="iconfont"
                                       dangerouslySetInnerHTML={{__html: advance ? "&#xe600;" : "&#xe601;"}}></i>{advance ? '高级筛选' : '收起筛选'}
                                </a>
                            </div>
                            <div className={advance ? "control-bar" : "hide"}>
                                <div className="filter">
                                    <label>课程名称：</label>
                                    <div className="filter-input-bar filter-bar">
                                        <FormItem>
                                            {getFieldDecorator('title')(
                                                <Input placeholder="模糊查询课程名称"/>
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                                <div className="filter">
                                    <label>发布日期：</label>
                                    <div className="filter-date-bar filter-bar">
                                        <FormItem>
                                            {getFieldDecorator('createdAt')(
                                                <RangePicker />
                                            )}
                                        </FormItem>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </Affix>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {}
}
module.exports = Form.create()(connect(mapStateToProps)(FilterCourse))