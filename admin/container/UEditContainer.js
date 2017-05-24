/**
 * Created by 1 on 2017/4/19.
 */
import React from "react";
import {connect} from "react-redux";
import {Button, Form, Input, Layout, message} from "antd";
import UEditor from "simple-react-ui/dist/ueditor";
import ueditor from "img/appmsg_new.png";
import GalleryModalComponent from "components/GalleryModalComponent";
import VedioModalComponent from "components/VedioModalComponent";
import AudioModalComponent from "components/AudioModalComponent";
import DocumentModalComponent from "components/DocumentModalComponent";
import PhoneViewModalComponent from "components/PhoneViewModalComponent";
import {createSpRequest, updateSpRequest} from "reducers/StudyReducer";
const FormItem = Form.Item;
const {Content} = Layout;

class UEditContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            galleryModalVisible: false,
            galleryModalType: "single",
            avator: this.props.location.state
                ? this.props.location.state.record.avator
                : "",
            videoModalVisible: false,
            audioModalVisible: false,
            fileModalVisible: false,
            viewModalVisible: false,
            study: {}
        };
    }

    componentDidMount() {
        const {setFieldsValue} = this.props.form;
        this.props.location.state &&
        setFieldsValue({title: this.props.location.state.record.title});
    }

    saveUE(ue) {
        this.ue = ue;
        this.ue &&
        this.props.location.state &&
        this.ue.setContent(this.props.location.state.record.fhtml, false);
    }

    /*表单提交*/
    handlerSubmit(e) {
        e.preventDefault();
        let that = this;
        const {avator} = this.state;
        const fhtml = this.ue.getContent();
        if (!fhtml) {
            message.warning("请编辑内容！");
            return;
        }
        if (!avator) {
            message.warning("请上传封面！");
            return;
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (this.props.location.state) {
                    //更新
                    let _param = Object.assign({}, values, {
                        id: this.props.location.state.record.id,
                        fhtml: fhtml,
                        avator: avator,
                        state: "1",
                        log: {
                            sp_id: this.props.location.state.record.id,
                            userid: this.props.user.userid,
                            content: "用户修改学习资料"
                        }
                    });
                    this.props.dispatch(
                        updateSpRequest(_param, {
                            authorcustno: this.props.user.userid
                        })
                    );
                } else {
                    //创建
                    let _param = Object.assign({}, values, {
                        fhtml: fhtml,
                        avator: avator,
                        log: {
                            sp_id: "",
                            userid: this.props.user.userid,
                            content: "用户学习资料创建"
                        }
                    });
                    this.props.dispatch(createSpRequest(_param));
                }
            } else {
            }
        });
    }

    /*图片选择框控制*/
    handleGalleryModalVisible(type) {
        this.setState({
            galleryModalVisible: !this.state.galleryModalVisible,
            galleryModalType: type
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

    /*图片选择*/
    handleGalleryInsert(selected) {
        for (let gallery of selected) {
            this.ue.execCommand("insertimage", {
                src: gallery.jpgurl
            });
        }
        this.setState({
            galleryModalVisible: !this.state.galleryModalVisible
        });
    }

    /*视频选择窗口控制*/
    handleVedioModalVisible() {
        this.setState({
            videoModalVisible: !this.state.videoModalVisible
        });
    }

    /*视频选择*/
    handleVedioInsert(selected) {
        console.log(selected[0].vediourl);
        this.ue.execCommand("insertvideo", {
            url: selected[0].vediourl,
            post: selected[0].post,
            width: 300,
            height: 180,
            type: "upload"
        });
        //this.ue.execCommand('inserthtml',"<vedio width='300' height='180' src='http://127.0.0.1:7001/public/vedio/8581234/mda-hcxs8gr55zbvzn27.mp4'><source src='http://127.0.0.1:7001/public/vedio/8581234/mda-hcxs8gr55zbvzn27.mp4'></source></vedio>")
        this.setState({
            videoModalVisible: !this.state.videoModalVisible
        });
    }

    /*视频链接插入*/
    handleVedioLinkInsert(src) {
        let iframe = '<iframe src="' + src + '" width="320" height="180" allowfullscreen scrolling=no></iframe>'
        this.ue.execCommand("inserthtml", iframe);
        this.setState({
            videoModalVisible: !this.state.videoModalVisible
        });
    }

    /*音频选择窗口控制*/
    handleAudioModalVisible() {
        this.setState({
            audioModalVisible: !this.state.audioModalVisible
        });
    }

    /*音频选择*/
    /*音频插入*/
    handleAudioInsert(audio) {
        console.log(audio)
        this.ue.execCommand('music', {
            name: audio.name,
            url: audio.url,
            duration: audio.duration
        });
        this.setState({
            audioModalVisible: !this.state.audioModalVisible
        });
    }

    /*文件选择*/
    handleFileModalVisible() {
        this.setState({
            fileModalVisible: !this.state.fileModalVisible
        });
    }

    /*文档插入*/
    handleDocumentInsert(selected) {
        this.ue.execCommand("document", selected[0]);
        this.setState({
            fileModalVisible: !this.state.fileModalVisible
        });
    }

    /*图文编辑预览*/
    handleViewModalVisible() {
        let that = this;
        const {avator} = this.state;
        const fhtml = this.ue.getContent();
        if (!fhtml) {
            message.warning("请编辑内容！");
            return;
        }
        if (!avator) {
            message.warning("请上传封面！");
            return;
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //创建
                let _param = Object.assign({}, values, {
                    fhtml: fhtml,
                    avator: avator,
                    authorcustno: this.props.user.userid,
                    authorname: this.props.user.name,
                    authoravator: this.props.user.avator,
                    createdAt: "2017-01-01 01:01:01",
                    rate: 5
                });
                that.setState({
                    study: _param
                });
            }
        });
        this.setState({
            viewModalVisible: !this.state.viewModalVisible
        });
    }

    render() {
        const {
            galleryModalVisible,
            galleryModalType,
            avator,
            videoModalVisible,
            audioModalVisible,
            viewModalVisible,
            fileModalVisible,
            study
        } = this.state;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 1},
            wrapperCol: {span: 8}
        };

        return (
            <Content
                style={{
                    position: "relative",
                    margin: "24px 16px",
                    padding: 24,
                    background: "#fff",
                    minHeight: 280
                }}
            >
                <Form>
                    <FormItem {...formItemLayout} label="标题">
                        {getFieldDecorator("title", {
                            rules: [
                                {
                                    required: true,
                                    message: "标题过长或为空",
                                    max: 16
                                }
                            ]
                        })(<Input />)}
                    </FormItem>
                    <div className="avator-wrapper">
                        <label className="tip">封面 :<span>图片建议尺寸 ：360*270</span></label>
                        <div>
                            <Button
                                onClick={this.handleGalleryModalVisible.bind(this, "single")}
                            >
                                从图库中选取
                            </Button>
                        </div>
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
                    <UEditor
                        id="ueditorContainer"
                        name="content"
                        width={600}
                        height={500}
                        uconfigSrc={
                            process.env.NODE_ENV !== "production"
                                ? "/ueditor.config.js"
                                : "public/ueditor/ueditor.config.js"
                        }
                        ueditorSrc={
                            process.env.NODE_ENV !== "production"
                                ? "/ueditor.all.js"
                                : "public/ueditor/ueditor.all.js"
                        }
                        afterInit={this.saveUE.bind(this)}
                    />
                </Form>
                <div className="media-container">
                    <h3>多媒体</h3>
                    <div className="media-wrapper">
                        <ul className="media-list">
                            <li
                                className="media-item img"
                                onClick={this.handleGalleryModalVisible.bind(this, "multi")}
                            >
                                <i
                                    style={{background: `url(${ueditor}) 0 -20px no-repeat`}}
                                />
                                图片
                            </li>
                            <li
                                className="media-item vedio"
                                onClick={this.handleVedioModalVisible.bind(this)}
                            >
                                <i
                                    style={{background: `url(${ueditor}) 0 -46px no-repeat`}}
                                />
                                视频
                            </li>
                            <li
                                className="media-item music"
                                onClick={this.handleAudioModalVisible.bind(this)}
                            >
                                <i
                                    style={{background: `url(${ueditor}) 0 -124px no-repeat`}}
                                />
                                音频
                            </li>
                            <li
                                className="media-item file"
                                onClick={this.handleFileModalVisible.bind(this)}
                            >
                                <i
                                    style={{background: `url(${ueditor}) 0 -96px no-repeat`}}
                                />
                                文件
                            </li>
                        </ul>
                    </div>
                    <div style={{marginBottom: "12px"}}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            onClick={this.handlerSubmit.bind(this)}
                        >
                            {this.props.location.state ? "修改" : "发布"}
                        </Button>
                    </div>
                    <div>
                        <Button
                            type="ghost"
                            htmlType="submit"
                            size="large"
                            onClick={this.handleViewModalVisible.bind(this)}
                        >
                            预览
                        </Button>
                    </div>

                </div>
                <GalleryModalComponent
                    newKey={Math.random()}
                    title="选择图片"
                    visible={galleryModalVisible}
                    galleryModalType={galleryModalType}
                    handleGalleryModalVisible={this.handleGalleryModalVisible.bind(this)}
                    handleGalleryInsert={this.handleGalleryInsert.bind(this)}
                    handleAvatorInsert={this.handleAvatorInsert.bind(this)}
                />
                <VedioModalComponent
                    newKey={Math.random()}
                    title="选择视频"
                    visible={videoModalVisible}
                    handleVedioModalVisible={this.handleVedioModalVisible.bind(this)}
                    handleVedioInsert={this.handleVedioInsert.bind(this)}
                    handleVedioLinkInsert={this.handleVedioLinkInsert.bind(this)}
                />
                <AudioModalComponent
                    newKey={Math.random()}
                    title="选择音频"
                    visible={audioModalVisible}
                    handleAudioModalVisible={this.handleAudioModalVisible.bind(this)}
                    handleAudioInsert={this.handleAudioInsert.bind(this)}
                >
                </AudioModalComponent>
                <DocumentModalComponent
                    newKey={Math.random()}
                    title="选择文件"
                    visible={fileModalVisible}
                    handleFileModalVisible={this.handleFileModalVisible.bind(this)}
                    handleDocumentInsert={this.handleDocumentInsert.bind(this)}
                />
                <PhoneViewModalComponent
                    newKey={Math.random()}
                    study={study}
                    visible={viewModalVisible}
                    handleViewModalVisible={this.handleViewModalVisible.bind(this)}
                />
            </Content>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.UserReducer.user
    };
}

module.exports = Form.create()(connect(mapStateToProps)(UEditContainer));
