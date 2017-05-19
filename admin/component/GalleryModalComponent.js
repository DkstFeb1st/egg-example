/**
 * Created by 1 on 2017/4/24.
 */
import React from "react";
import {connect} from "react-redux";
import {Button, Icon, message, Modal, Pagination, Upload} from "antd";
import {getImageListRequest} from "reducers/UserReducer";
var Cookies = require('cookies-js')

const heightStyle = {
    height: "117px"
};
const widthStyle = {
    width: "117px"
};
class GalleryModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            current: 1
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.visible && nextProps.visible) {
            let param = {
                userid: this.props.user.userid,
                current: 1,
                pageSize: 10
            };
            this.props.dispatch(getImageListRequest(param));
        }
    }

    /*分页操作*/
    handlePageChange(page, pageSize) {
        this.setState({
            current: page
        });
        let param = {
            userid: this.props.user.userid,
            current: page,
            pageSize: 10
        };
        this.props.dispatch(getImageListRequest(param));
    }

    /*图片选择*/
    handleSelect(obj) {
        const galleryModalType = this.props.galleryModalType;
        console.log(galleryModalType);
        if (galleryModalType === "multi") {
            let selected = this.state.selected.slice();
            if (selected.includes(obj)) {
                selected = selected.filter(function (value) {
                    return value !== obj;
                });
            } else {
                selected.push(obj);
            }
            this.setState({
                selected: selected
            });
        } else {
            let selected = [];
            selected.push(obj);
            this.setState({
                selected: selected
            });
        }
    }

    /*选完图片后提交*/
    handleSubmit() {
        const {selected} = this.state;
        const galleryModalType = this.props.galleryModalType;
        if (galleryModalType === "multi") {
            if (selected.length === 0) {
                message.warning("请选择图片！");
            } else {
                this.props.handleGalleryInsert(selected);
            }
        } else {
            if (selected.length === 0) {
                message.warning("请选择图片！");
            } else {
                this.props.handleAvatorInsert(selected);
            }
        }
        this.setState({
            selected: [],
            current: 1
        });
    }

    /*窗口关闭*/
    handleCancel() {
        this.setState({
            selected: [],
            current: 1
        });
        this.props.handleGalleryModalVisible();
    }

    beforeUpload(file) {
        message.loading("上传中", 100);
    }

    handleFileUpload(param) {
        const {file, fileList, event} = param;
        console.log(param);
        if (event && event.percent === 100) {
            this.setState({
                current: 1
            });
            let param = {
                userid: this.props.user.userid,
                current: 1,
                pageSize: 10
            };
            let that = this;
            setTimeout(function () {
                message.destroy();
                message.success("上传成功");
                that.props.dispatch(getImageListRequest(param));
            }, 3000);
        }
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
                        action="api/sp/doImageUpload"
                        accept="image/*"
                        onChange={this.handleFileUpload.bind(this)}
                        showUploadList={false}
                        multiple={true}
                        beforeUpload={this.beforeUpload.bind(this)}
                        headers={{'x-csrf-token': Cookies.get('csrfToken')}}
                    >
                        <Button type="primary">
                            <Icon type="upload"/>本地上传
                        </Button>
                    </Upload>

                </header>
                <div className="gallery-wrapper">
                    {this.props.galleryList &&
                    this.props.galleryList.map((obj, index) => {
                        return (
                            <label
                                key={obj.id}
                                onClick={this.handleSelect.bind(this, obj)}
                                className={selected.includes(obj) ? "selected" : ""}
                            >
                                <div className="gallery-item">
                                    <img
                                        src={obj.jpgurl}
                                        alt=""
                                        width="36"
                                        style={obj.hw > 1 ? heightStyle : widthStyle}
                                    />
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
                        total={this.props.galleryTotal}
                        defaultPageSize={10}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </footer>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.UserReducer.user,
        galleryList: state.UserReducer.galleryList,
        galleryTotal: state.UserReducer.galleryTotal
    };
}
module.exports = connect(mapStateToProps)(GalleryModalComponent);
