/**
 * Created by 1 on 2017/5/2.
 */
import React from "react";
import {connect} from "react-redux";
import {Button, Icon, message, Modal, Pagination, Upload} from "antd";
import {getDocumentListRequest} from "reducers/UserReducer";
var Cookies = require('cookies-js')

class DocumentModalComponent extends React.Component {
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
                pageSize: 6
            };
            this.props.dispatch(getDocumentListRequest(param));
        }
    }

    handleSubmit() {
        const {selected} = this.state;
        if (selected.length === 0) {
            message.warning("请选择文档！");
        } else {
            this.props.handleDocumentInsert(selected);
        }
        this.setState({
            selected: [],
            current: 1
        });
    }

    handleCancel() {
        this.props.handleFileModalVisible();
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
            let that = this;
            setTimeout(function () {
                message.destroy();
                message.success("上传成功");
                that.props.dispatch(getDocumentListRequest(param));
            }, 3000);
        }
    }

    handleSelect(obj) {
        let selected = [];
        selected.push(obj);
        this.setState({
            selected: selected
        });
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
        this.props.dispatch(getDocumentListRequest(param));
    }

    render() {
        const {selected, current} = this.state
        return (
            <Modal
                key={this.props.newKey}
                width="580px"
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.handleSubmit.bind(this)}
                onCancel={this.handleCancel.bind(this)}
            >
                <header>
                    <Upload
                        name="file"
                        action="api/sp/doDocumentUpload"
                        accept=".xls,.xlsx,.doc,.docx,.ppt,.pptx,.pdf,.zip,.rar"
                        onChange={this.handleFileUpload.bind(this)}
                        showUploadList={false}
                        multiple={true}
                        beforeUpload={this.beforeUpload.bind(this)}
                        headers={{'x-csrf-token': Cookies.get('csrfToken')}}
                    >
                        <Button>
                            <Icon type="upload"/>本地上传
                        </Button>
                    </Upload>
                </header>
                <div className="document-wrapper">
                    {
                        this.props.documentList && this.props.documentList.map((obj, index) => {
                            return (
                                <label key={obj.id}
                                       onClick={this.handleSelect.bind(this, obj)}
                                       className={selected.includes(obj) ? "selected" : ""}>
                                    <div className="document-item">
                                        <img src={require(`img/${obj.type}.png`)} alt=""/>
                                        <div className="document-info">
                                            <p>{obj.name}</p>
                                            <p>{obj.size}k</p>
                                        </div>
                                    </div>
                                </label>
                            )
                        })
                    }
                </div>
                <footer>
                    <Pagination
                        current={current}
                        total={this.props.documentTotal}
                        defaultPageSize={6}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </footer>
            </Modal>
        );
    }
}

const MapStateToProps = state => {
    return {
        user: state.UserReducer.user,
        documentList: state.UserReducer.documentList,
        documentTotal: state.UserReducer.documentTotal
    };
};

module.exports = connect(MapStateToProps)(DocumentModalComponent);
