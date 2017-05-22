/**
 * Created by 1 on 2017/5/17.
 * 音频选择窗口
 */

import React from "react";
import {connect} from "react-redux";
import {Button, Icon, message, Modal, Pagination, Progress, Upload} from "antd";
import {getAudioListRequest, uploadingAudio} from "reducers/UserReducer";
var Cookies = require('cookies-js')

class AudioModalComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: [],
            current: 1,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.visible && nextProps.visible) {
            let param = {
                userid: this.props.user.userid,
                current: 1,
                pageSize: 4
            };
            this.props.dispatch(getAudioListRequest(param));
        }
    }

    /*音频选择*/
    handleSelect(obj, e) {
        let selected = [];
        selected.push(obj);
        this.setState({
            selected: selected
        });
    }

    beforeUpload(file) {
        //message.loading("上传中", 100);
        this.props.audioList.push(file)
    }

    handleFileUpload(param) {
        const {file, fileList, event} = param;
        let that = this
        if (event) {
            this.props.audioList.map((obj, index) => { //上传进度表现
                if (obj.uid === file.uid) {
                    let array = this.props.audioList.slice()
                    array[index]['percent'] = event.percent
                    that.props.dispatch(uploadingAudio(array))
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
                    pageSize: 4
                };
                let that = this
                setTimeout(function () {
                    that.props.dispatch(getAudioListRequest(param));
                }, 1500);
            }
        }
    }

    handleCancel() {
        this.props.handleAudioModalVisible()
    }

    /*分页操作*/
    handlePageChange(page, pageSize) {
        this.setState({
            current: page
        });
        let param = {
            userid: this.props.user.userid,
            current: page,
            pageSize: 4
        };
        this.props.dispatch(getAudioListRequest(param));
    }

    handleSubmit() {

        const {selected} = this.state;
        if (selected.length === 0) {
            message.warning("请选择音频！");
        } else {
            this.props.handleAudioInsert(selected[0]);
        }
        this.setState({
            selected: [],
            current: 1
        });
    }

    handleDbClick(value, e) {
        e.preventDefault()
        window.open(value)
    }
    render() {
        const {selected, current} = this.state;
        return (
            <Modal
                key={this.props.newKey}
                width="720px"
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.handleSubmit.bind(this)}
                onCancel={this.handleCancel.bind(this)}
            >
                <header>
                    <Upload
                        name="file"
                        action="api/sp/doAudioUpload"
                        accept="audio/*"
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
                        <label htmlFor="">双击查看音频</label>
                    </Upload>
                </header>
                <div className="audio-wrapper">
                    {
                        this.props.audioList && this.props.audioList.map((obj, index) => {
                            return (
                                <p className={selected.includes(obj) ? "selected weixinAudio" : "weixinAudio"}
                                   key={obj.id}
                                   onClick={this.handleSelect.bind(this, obj)}
                                   onDoubleClick={this.handleDbClick.bind(this, obj.url)}
                                >
                                    <audio src={obj.url} id="media" width="1" height="1" preload></audio>
                                    <span className="db audio_area" id="audio_area">
                                        <span className="audio_wrp db">
                                            <span className="audio_play_area" id="audio_play">
                                                <i className="icon_audio_default"></i>
                                                <i className="icon_audio_playing"></i>
                                            </span>
                                            <span id="audio_length"
                                                  className="audio_length tips_global">{obj.duration}</span>
                                            <span className="db audio_info_area">
                                                <strong className="db audio_title">{obj.name}</strong>
                                                <span className="audio_source tips_global">瑞安农商银行</span>
                                            </span>
                                            <span id="audio_progress" className="progress_bar"
                                                  style={{width: "0%"}}></span>
                                        </span>
                                    </span>
                                    <Progress showInfo={false} percent={obj.percent ? obj.percent : 0} strokeWidth={5}
                                              className={obj.percent ? "" : "hide"}/>
                                </p>
                            )
                        })
                    }
                </div>
                <footer>
                    <Pagination
                        current={current}
                        total={this.props.audioTotal}
                        defaultPageSize={4}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </footer>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.UserReducer.user,
        audioList: state.UserReducer.audioList,
        audioTotal: state.UserReducer.audioTotal
    };
}

module.exports = connect(mapStateToProps)(AudioModalComponent)