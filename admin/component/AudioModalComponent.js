/**
 * Created by 1 on 2017/5/17.
 * 音频选择窗口
 */

import React from "react";
import {connect} from "react-redux";
import {Button, Icon, message, Modal, Pagination, Upload} from "antd";
import {getAudioListRequest} from "reducers/UserReducer";
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
            setTimeout(function () {
                $('.weixinAudio').weixinAudio({
                    autoplay: false,
                });
            }, 1000);
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
                pageSize: 4
            };
            let that = this
            setTimeout(function () {
                message.destroy();
                message.success('上传成功')
                that.props.dispatch(getAudioListRequest(param));
            }, 2000);
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
        setTimeout(function () {
            $('.weixinAudio').weixinAudio({
                autoplay: false,
            });
        }, 1000);
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
                            <Button>
                                <Icon type="upload"/>本地上传
                            </Button>
                        </label>
                    </Upload>
                </header>
                <div className="audio-wrapper">
                    {
                        this.props.audioList && this.props.audioList.map((obj, index) => {
                            return (
                                <p className={selected.includes(obj) ? "selected weixinAudio" : "weixinAudio"}
                                   key={obj.id} onClick={this.handleSelect.bind(this, obj)}>
                                    <audio src={obj.url} id="media" width="1" height="1" preload></audio>
                                    <span className="db audio_area" id="audio_area">
                                        <span className="audio_wrp db">
                                            <span className="audio_play_area" id="audio_play">
                                                <i className="icon_audio_default"></i>
                                                <i className="icon_audio_playing"></i>
                                            </span>
                                            <span id="audio_length" className="audio_length tips_global">00.00</span>
                                            <span className="db audio_info_area">
                                                <strong className="db audio_title">{obj.name}</strong>
                                                <span className="audio_source tips_global">瑞安农商银行</span>
                                            </span>
                                            <span id="audio_progress" className="progress_bar"
                                                  style={{width: "0%"}}></span>
                                        </span>
                                    </span>
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