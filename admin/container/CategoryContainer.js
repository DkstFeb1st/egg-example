/**
 * Created by 1 on 2017/5/27.
 * 系统课程编辑界面
 */
import React from "react";
import {connect} from "react-redux";
import {goBack} from "react-router-redux";
import GalleryModalComponent from "components/GalleryModalComponent";
import CategoryModalComponent from "components/CategoryModalComponent";
import CourseSelectModalComponent from "components/CourseSelectModalComponent";
import {MenuHeader} from "components/common/CommonLayout";
import {Button, Carousel, Form, Input, Layout, message, Steps, Tree} from "antd";
import {createSpRequest, getSpDetailRequest, updateSpRequest} from "reducers/StudyReducer";
import {addCategoryRequest, deleteCategoryRequest} from "reducers/CategoryReducer";
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const Step = Steps.Step;
const {Content} = Layout;
class CategoryContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            id: "",//系列课程的id
            galleryModalVisible: false,
            categoryModalVisible: false,
            courseModalVisible: false,
            avator: "",
            categoryList: [],//目录
            cur_category: "",//当前选择目录的对象
            cur_selectNode: ""//当前选择节点对象
        }
    }

    componentDidMount() {
        if (this.props.location.query.id) {
            let param = {
                id: this.props.location.query.id,
                type: '1'
            }
            this.props.dispatch(getSpDetailRequest(param))
                .then(response => {
                    if (response) {
                        this.setState({
                            study: response.spdetail,
                            avator: response.spdetail.avator,
                            categoryList: response.spCategoryList
                        })
                    }
                })
        }
    }

    /*切换走马灯面板*/
    swipeCarsoul(value) {
        const {avator} = this.state;
        switch (value) {
            case 1:
                /*创建系列课程*/
                if (!avator) {
                    message.warning("请上传封面！");
                    break;
                }
                this.props.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        let {study} = this.state
                        if (study) {
                            let _param = Object.assign({}, values, {
                                avator: avator,
                                state: "7",
                                type: "1",//系列课程
                                id: study.id,
                                log: {
                                    sp_id: study.id,
                                    userid: this.props.user.userid,
                                    content: "培训资料修改"
                                }
                            });
                            this.props.dispatch(updateSpRequest(_param))
                                .then((response) => {
                                    if (response) {
                                        this.setState({
                                            id: study.id,
                                        })
                                        this.category_carousel.refs.slick.slickGoTo(value)
                                    }

                                });
                        } else {
                            let _param = Object.assign({}, values, {
                                avator: avator,
                                state: "7",
                                type: "1",//系列课程
                                log: {
                                    sp_id: "",
                                    userid: this.props.user.userid,
                                    content: "培训资料创建"
                                }
                            });
                            this.props.dispatch(createSpRequest(_param))
                                .then((response) => {
                                    if (response) {
                                        this.setState({
                                            id: response.study.id,
                                        })
                                        this.category_carousel.refs.slick.slickGoTo(value)
                                    }

                                });
                        }
                    }
                })
                break
            case 2:
                this.category_carousel.refs.slick.slickGoTo(value)
                break
            case 3:
                this.props.dispatch(goBack())
                break

        }

    }

    /*走马灯切换后回调step*/
    afterCarouselChange(a, b, c) {
        this.setState({
            step: c || b || a
        })
    }

    /*分娩选择框控制*/
    handleGalleryModalVisible() {
        this.setState({
            galleryModalVisible: !this.state.galleryModalVisible,
            galleryModalType: "single"
        });
    }

    /*封面设置*/
    handleAvatorInsert(select) {
        this.setState({
            avator: select[0].jpgurl
        });
        this.setState({
            galleryModalVisible: !this.state.galleryModalVisible
        });
    }

    /*封面删除*/
    handleAvatorDelete() {
        this.setState({
            avator: ""
        });
    }

    /*树形目录选择*/
    selectCategory(selectedKeys, info) {
        console.log(selectedKeys)
        console.log(info)
        this.setState({
            cur_category: selectedKeys[0],
            cur_selectNode: info.selectedNodes[0]
        })
    }

    /*
     * 目录操作窗口操作
     * */
    handleCategoryModalVisible(e, tag) {
        let {cur_category, cur_selectNode} = this.state
        if (tag) {//修改
            if (!cur_category) {
                message.warn('请选择目录')
                return
            }
            if (cur_selectNode.props.isLeaf) {
                message.warn('请选择目录')
                return
            }
            this.setState({
                categoryModalVisible: !this.state.categoryModalVisible
            })
        } else {//新增
            this.setState({
                categoryModalVisible: !this.state.categoryModalVisible,
                cur_category: "",
                cur_selectNode: ""
            })
        }

    }

    /*
     * 更新或新增目录操作
     * */
    handleCategoryModalSubmit(values) {
        let {id, cur_category, cur_selectNode} = this.state
        if (!cur_category) {//添加
            var param = {
                name: values.name,
                sp_id: id
            }
        } else {//更新
            var param = {
                id: cur_category,
                name: values.name,
                sp_id: id
            }
        }

        this.props.dispatch(addCategoryRequest(param))
            .then(response => {
                let categoryList = this.state.categoryList.slice()
                if (!cur_category) {//添加
                    categoryList.push(response.category)
                    this.setState({
                        categoryModalVisible: !this.state.categoryModalVisible,
                        categoryList: categoryList,
                        cur_category: "",
                        cur_selectNode: ""
                    })
                } else {//更新
                    for (let i = 0; i < categoryList.length; i++) {
                        if (categoryList[i].id == parseInt(cur_category)) {
                            categoryList[i].name = values.name
                            break
                        }
                    }
                    this.setState({
                        categoryModalVisible: !this.state.categoryModalVisible,
                        categoryList: categoryList,
                        cur_category: "",
                        cur_selectNode: ""
                    })
                }
            })
    }

    /*删除目录操作*/
    handleCategoryDelete() {
        let {cur_category, cur_selectNode} = this.state
        if (!cur_category) {
            message.warn('请选择目录')
            return
        }
        if (cur_selectNode.props.isLeaf) {
            message.warn('请选择目录')
            return
        }
        let _param = {
            id: cur_category
        }
        this.props.dispatch(deleteCategoryRequest(_param))
            .then(response => {
                let categoryList = this.state.categoryList.slice()//更新dom
                categoryList.map((obj, index) => {
                    if (obj.id == cur_category) {
                        categoryList.splice(index, 1)
                    }
                })
                this.setState({
                    categoryList: categoryList,
                    cur_category: "",
                    cur_selectNode: ""
                })
            })
    }

    /*课程窗口操作*/
    handleCourseModalVisible() {
        let {cur_category, cur_selectNode} = this.state
        console.log(cur_selectNode)
        if (!cur_category) {
            message.warn('请选择目录')
            return
        }
        if (cur_selectNode.props.isLeaf) {
            message.warn('请选择目录')
            return
        }
        this.setState({
            courseModalVisible: !this.state.courseModalVisible
        })
    }

    /*课程选择完毕*/
    handleCourseModalSubmit(courses) {
        let {cur_category} = this.state
        let categoryList = this.state.categoryList.slice()

        courses.map((obj, index) => {//课程类型更新 图文课程-》子课程
            let param = {
                id: obj.id,
                type: '3',
                category_id: cur_category,
                log: {
                    sp_id: obj.id,
                    userid: this.props.user.userid,
                    content: "关联目录"
                }
            }
            this.props.dispatch(updateSpRequest(param))
                .then(response => {
                    if (response) {
                        //更新ui
                        for (let i = 0; i < categoryList.length; i++) {
                            if (categoryList[i].id == cur_category) {
                                if (!categoryList[i].courses)
                                    Object.defineProperty(categoryList[i], 'courses', {
                                        enumerable: true,
                                        configurable: true,
                                        writable: true,
                                        value: []
                                    })
                                categoryList[i].courses.push(obj)
                            }
                        }
                    }
                })
        })
        var that = this
        setTimeout(function () {//解决添加的课程不能及时更新
            that.setState({
                courseModalVisible: !that.state.courseModalVisible,
                categoryList: categoryList
            })
        }, 500)
    }

    /*删除子课程*/
    handleCourseDelete() {
        let {cur_category, cur_selectNode} = this.state
        let isLeaf = cur_selectNode.props.isLeaf
        if (!!isLeaf) {
            let categoryList = this.state.categoryList.slice()
            let param = {
                id: cur_category,
                type: '2',
                category_id: '',
                log: {
                    sp_id: cur_category,
                    userid: this.props.user.userid,
                    content: "关联目录"
                }
            }
            this.props.dispatch(updateSpRequest(param))
                .then(response => {
                    if (response) {//更新UI
                        for (let i = 0; i < categoryList.length; i++) {
                            categoryList[i].courses && categoryList[i].courses.map((obj, index) => {
                                if (obj.id == cur_category)
                                    categoryList[i].courses.splice(index, 1)
                            })
                        }
                        this.setState({
                            categoryList: categoryList
                        })
                    }
                })

        } else {
            message.warn("请选择课程！")
        }

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {
            step,
            galleryModalVisible,
            categoryModalVisible,
            courseModalVisible,
            avator,
            categoryList,
            cur_category,
            study
        } = this.state
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 12}
        };
        let treeNodes = []
        for (let i = 0; i < categoryList.length; i++) {
            if (categoryList[i].id == cur_category) {
                var treeNodeName = categoryList[i].name
            }
            let coursesTreeNodes = []
            if (categoryList[i].courses && categoryList[i].courses.length > 0) {
                categoryList[i].courses.map((obj, index) => {
                    coursesTreeNodes.push(<TreeNode title={obj.title} key={obj.id} isLeaf/>)
                })
            }
            treeNodes.push(
                <TreeNode title={categoryList[i].name} key={categoryList[i].id}>
                    {coursesTreeNodes}
                </TreeNode>
            )
        }
        let expandsKey = ['0-0'];//需要展开的key
        for (let i = 0; i < categoryList.length; i++) {
            expandsKey.push(categoryList[i].id.toString())
        }
        return (
            <Content
                style={{
                    position: "relative",
                    minHeight: 280
                }}
            >
                <MenuHeader>专题课程编辑</MenuHeader>
                <div className="categoryedit-wrapper">
                    <header>
                        <Steps current={step}>
                            <Step title="基本资料编辑"/>
                            <Step title="目录编辑"/>
                            <Step title="子课程编辑"/>
                        </Steps>
                    </header>
                    <div>
                        <Carousel
                            afterChange={this.afterCarouselChange.bind(this)}
                            ref={(e) => this.category_carousel = e}
                            dots={false}
                            adaptiveHeight={true}
                        >
                            <div className="cardpanel base-wrapper">
                                <div className="base-form">
                                    <Form>
                                        <FormItem {...formItemLayout} label="标题">
                                            {getFieldDecorator("title", {
                                                initialValue: study && study.title,
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "标题过长或为空",
                                                        max: 16
                                                    }
                                                ]
                                            })(<Input />)}
                                        </FormItem>
                                        <div className="avator-wrapper category">
                                            <div className="ant-row ant-form-item">
                                                <div className="ant-col-6 ant-form-item-label"><span
                                                    style={{color: "red"}}>*</span>封面 :
                                                </div>
                                                <div className="ant-col-12 ant-form-item-control-wrapper"
                                                     style={{"lineHeight": "32px"}}>图片建议尺寸 ：520*200
                                                </div>
                                                <div className="avator-img-wrapper">
                                                    <span
                                                        className="avator-preview"
                                                        style={{
                                                            backgroundImage: `url(${avator})`,
                                                            height: `${avator ? "120px" : "0px"}`
                                                        }}
                                                    >
                                                      <div
                                                          className="avator-mask"
                                                          onClick={this.handleAvatorDelete.bind(this)}
                                                      >
                                                    <a className="avator-delete"/>
                                                  </div>
                                                </span>
                                                </div>
                                            </div>
                                            <div>
                                                <Button
                                                    type="primary"
                                                    onClick={this.handleGalleryModalVisible.bind(this)}
                                                >
                                                    从图库中选取
                                                </Button>
                                            </div>
                                        </div>
                                        <FormItem {...formItemLayout} label="适合人群">
                                            {getFieldDecorator("suit", {
                                                initialValue: study && study.suit,
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "请填写适合人群"
                                                    }
                                                ]
                                            })(<Input />)}
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="课程简介">
                                            {getFieldDecorator("desc", {
                                                initialValue: study && study.desc,
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "请填写课程简介"
                                                    }
                                                ]
                                            })(<Input type="textarea" rows={4}/>)}
                                        </FormItem>
                                        <Button type="primary" onClick={this.swipeCarsoul.bind(this, 1)}>下一步</Button>
                                    </Form>
                                </div>
                            </div>
                            <div className="cardpanel category-wrapper">
                                <div className="category-form">
                                    <header className="button-groups">
                                        <div >
                                            <Button type="primary" style={{"marginRight": "12px"}}
                                                    onClick={this.handleCategoryModalVisible.bind(this)}>新增目录</Button>
                                            <Button type="primary" style={{"marginRight": "12px"}}
                                                    onClick={this.handleCategoryModalVisible.bind(this, 'update')}>修改目录</Button>
                                            <Button type="primary"
                                                    onClick={this.handleCategoryDelete.bind(this)}>删除目录</Button>
                                        </div>
                                    </header>
                                    <div>
                                        <Tree

                                            defaultExpandAll
                                            autoExpandParent
                                            expandedKeys={expandsKey}
                                            multiple={false}
                                            onSelect={this.selectCategory.bind(this)}
                                            selectedKeys={[cur_category]}
                                            showLine
                                        >
                                            <TreeNode
                                                disableCheckbox
                                                title="课程目录"
                                                key="0-0"
                                            >
                                                {treeNodes}
                                            </TreeNode>
                                        </Tree>
                                    </div>
                                    <footer>
                                        <Button type="primary" onClick={this.swipeCarsoul.bind(this, 2)}>下一步</Button>
                                    </footer>
                                </div>
                            </div>
                            <div className="cardpanel category-wrapper">
                                <header className="button-groups">
                                    <div >
                                        <Button type="ghost" style={{"marginRight": "12px"}}
                                                onClick={this.handleCourseModalVisible.bind(this)}>新增子课程</Button>
                                        <Button type="ghost" style={{"marginRight": "12px"}}
                                                onClick={this.handleCourseDelete.bind(this)}>删除子课程</Button>
                                    </div>
                                </header>
                                <div>
                                    <Tree
                                        defaultExpandAll
                                        autoExpandParent
                                        expandedKeys={expandsKey}
                                        multiple={false}
                                        onSelect={this.selectCategory.bind(this)}
                                        selectedKeys={[cur_category]}
                                        showLine
                                    >
                                        <TreeNode
                                            disableCheckbox
                                            title="课程目录"
                                            key="0-0"
                                        >
                                            {treeNodes}
                                        </TreeNode>
                                    </Tree>
                                </div>
                                <footer>
                                    <Button type="primary" onClick={this.swipeCarsoul.bind(this, 3)}>完成</Button>
                                </footer>
                            </div>
                        </Carousel>
                    </div>
                </div>
                <GalleryModalComponent
                    newKey={Math.random()}
                    title="选择图片"
                    visible={galleryModalVisible}
                    galleryModalType="single"
                    handleGalleryModalVisible={this.handleGalleryModalVisible.bind(this)}
                    handleAvatorInsert={this.handleAvatorInsert.bind(this)}
                />
                <CategoryModalComponent
                    newKey={Math.random()}
                    title="目录操作"
                    visible={categoryModalVisible}
                    treeNodeName={treeNodeName}
                    handleCategoryModalVisible={this.handleCategoryModalVisible.bind(this)}
                    handleCategoryModalSubmit={this.handleCategoryModalSubmit.bind(this)}
                >
                </CategoryModalComponent>
                <CourseSelectModalComponent
                    newKey={Math.random()}
                    title="课程选择(图文课程)"
                    visible={courseModalVisible}
                    handleCourseModalVisible={this.handleCourseModalVisible.bind(this)}
                    handleCourseModalSubmit={this.handleCourseModalSubmit.bind(this)}
                >

                </CourseSelectModalComponent>
            </Content>

        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user
    }
}

module.exports = Form.create()(connect(mapStateToProps)(CategoryContainer))