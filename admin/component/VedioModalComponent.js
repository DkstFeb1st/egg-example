/*
 * 视频选择窗口
 * */
import React from "react";
import {connect} from "react-redux";
import {Button, Icon, Input, message, Modal, Pagination, Progress, Tabs, Upload} from "antd";
import {getVedioListRequest, uploadingVedio} from "reducers/UserReducer";
const TabPane = Tabs.TabPane;
var Cookies = require('cookies-js')

class VedioModalComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: [],
            current: 1,
            tab: '1'
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.visible && nextProps.visible) {
            let param = {
                userid: this.props.user.userid,
                current: 1,
                pageSize: 6
            };
            this.props.dispatch(getVedioListRequest(param));
        }
    }

    handleTabChange(value) {
        this.setState({
            tab: value
        })
    }

    /*视频选择*/
    handleSelect(obj) {
        let selected = [];
        selected.push(obj);
        this.setState({
            selected: selected
        });
    }

    beforeUpload(file) {

        this.props.vedioList.push(file)

    }

    /*
     * add upload progress for uploading filelist 2017/05/22
     * */
    handleFileUpload(param) {
        const {file, fileList, event} = param;
        let that = this
        if (event) {
            this.props.vedioList.map((obj, index) => { //上传进度表现
                if (obj.uid === file.uid) {
                    let array = this.props.vedioList.slice()
                    array[index]['percent'] = event.percent
                    that.props.dispatch(uploadingVedio(array))
                }
            })
        }
        for (let _i = 0; _i < fileList.length; _i++) {//多文件上传全部完成则更新列表
            if (fileList[_i].status !== 'done')
                break
            else if (_i == fileList.length - 1 && fileList[_i].status == 'done') {
                this.setState({
                    current: 1
                });
                let param = {
                    userid: this.props.user.userid,
                    current: 1,
                    pageSize: 6
                };
                let that = this
                setTimeout(function () {
                    that.props.dispatch(getVedioListRequest(param));
                }, 2000);
            }
        }
    }

    handleDbClick(value, e) {
        e.preventDefault()
        window.open(value)
    }

    handleSubmit() {
        const {selected, tab} = this.state;
        if (tab === '1') {//本地上传
            if (selected.length === 0) {
                message.warning("请选择视频！");
            } else {
                this.props.handleVedioInsert(selected);
            }
            this.setState({
                selected: [],
                current: 1
            });
        } else {//视频外链
            const link = this.link.refs.input.value
            if (!link) {
                message.warning('请输入视频地址！')
            } else {
                //替换宽度和高度
                this.props.handleVedioLinkInsert(link)
            }
        }

    }

    handleCancel() {
        this.props.handleVedioModalVisible()
    }

    /*分页操作*/
    handlePageChange(page, pageSize) {
        this.setState({
            current: page
        });
        let param = {
            userid: this.props.user.userid,
            current: page,
            pageSize: 6
        };
        this.props.dispatch(getVedioListRequest(param));
    }

    render() {
        const {selected, current, tab} = this.state;
        return (
            <Modal
                key={this.props.newKey}
                width="720px"
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.handleSubmit.bind(this)}
                onCancel={this.handleCancel.bind(this)}
            >
                <Tabs activeKey={tab}
                      onChange={this.handleTabChange.bind(this)}
                >
                    <TabPane tab="素材库" key="1">
                        <header>
                            <Upload
                                name="file"
                                action="api/sp/doVedioUpload"
                                accept="video/*"
                                onChange={this.handleFileUpload.bind(this)}
                                showUploadList={false}
                                multiple={true}
                                beforeUpload={this.beforeUpload.bind(this)}
                                headers={{'x-csrf-token': Cookies.get('csrfToken')}}
                            >
                                <label style={{marginRight: "12px"}}>
                                    <Button type="primary">
                                        <Icon type="upload"/>本地上传
                                    </Button>
                                </label>
                            </Upload>
                            <label htmlFor="">双击观看视频</label>
                        </header>
                        <div className="vedio-wrapper">
                            {this.props.vedioList &&
                            this.props.vedioList.map((obj, index) => {
                                return (
                                    <label
                                        key={obj.id}
                                        onClick={this.handleSelect.bind(this, obj)}
                                        onDoubleClick={this.handleDbClick.bind(this, obj.vediourl)}
                                        className={selected.includes(obj) ? "selected" : ""}
                                        data-vedio={obj.vediourl}
                                        ref={(label) => {
                                            this.vedioItem = label;
                                        }}
                                    >
                                        <div className="vedio-item">
                                            <img src={obj.post} alt=""/>
                                            <span>{obj.duration}</span>
                                        </div>

                                        <span className="lbl_content"><span
                                            style={{"color": "red"}}>{ obj.status === '0' ? '(转码中)' : '' }</span>{obj.name}</span>
                                        <Progress

                                            percent={obj.percent ? obj.percent.toFixed(2) : 0}
                                            strokeWidth={5} className={obj.percent ? "progress" : "hide"}/>
                                        <div className="selected_mask">
                                            <div className="selected_mask_inner"/>
                                            <div className="selected_mask_icon"/>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                        <footer>
                            <Pagination
                                current={current}
                                total={this.props.vedioTotal}
                                defaultPageSize={6}
                                onChange={this.handlePageChange.bind(this)}
                            />
                        </footer>
                    </TabPane>
                    <TabPane tab="视频链接" key="2">
                        <div>
                            <label>视频地址</label>
                            <Input
                                type="text"
                                placeholder="支持vue"
                                ref={(input) => {
                                    this.link = input
                                }}
                            />
                        </div>
                    </TabPane>
                </Tabs>


            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.UserReducer.user,
        vedioList: state.UserReducer.vedioList,
        vedioTotal: state.UserReducer.vedioTotal
    };
}

module.exports = connect(mapStateToProps)(VedioModalComponent)