/*
 * 视频选择窗口
 * */
import React from "react";
import {connect} from "react-redux";
import {Button, Icon, Input, message, Modal, Pagination, Tabs, Upload} from "antd";
import {getVedioListRequest} from "reducers/UserReducer";
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
        message.loading("上传中", 100);
    }

    handleFileUpload(param) {
        const {file, fileList, event} = param;
        if (event && event.percent === 100) {
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
                message.destroy();
                message.success('上传成功')
                that.props.dispatch(getVedioListRequest(param));
            }, 2000);
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
            } else if (link.indexOf('v.qq.com') === -1) {
                message.warning('仅支持腾讯视频！')
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
                                    <Button>
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

                                        <span className="lbl_content">{obj.name}</span>
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
                            <label>视频地址(复制视频网站的通用代码)</label>
                            <Input
                                type="text"
                                placeholder="支持腾讯视频"
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