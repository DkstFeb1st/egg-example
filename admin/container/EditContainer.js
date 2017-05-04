/**
 * Created by 1 on 2017/4/12.
 * 新增修改功能
 */
import React from "react";
import {connect} from "react-redux";
import {Layout} from "antd";
import {Editor, EditorState, RichUtils} from "draft-js";
import DraftRichUtilComponent from "components/DraftRichUtilComponent";
import ueditor from "img/appmsg_new.png";
const {Content} = Layout;

class EditContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {editorState: EditorState.createEmpty()}

        this.onChange = (editorState) => this.setState({editorState});
    }

    toggleInlineStyle(inlineStyle) {
        console.log(this.state.editorState)
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }
    render() {
        const {editorState} = this.state;
        const {record} = this.props.location.state
        return (
            <Content
                style={{position: "relative", margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                <div className="editor-container">
                    <div className="richutil-wrapper">
                        <DraftRichUtilComponent
                            editorState={editorState}
                            handlerInlineStyle={this.toggleInlineStyle.bind(this)}
                        />
                    </div>
                    <div className="editor-wrapper">
                        <div className="title-wrapper">
                            <input type="text" id="title" className="frm_input" placeholder="请在这里输入标题" max-lenght="64"/>
                        </div>
                        <div className="author-wrapper">
                            <input type="text" id="title" className="frm_input" placeholder="请输入作者" max-lenght="8"/>
                        </div>
                        <div className="editor-body">
                            <Editor
                                editorState={editorState}
                                onChange={this.onChange}
                                ref="editor"
                            />
                        </div>

                    </div>
                </div>
                <div className="media-container">
                    <h3 style={{marginRight: "24px"}}>多媒体</h3>
                    <div className="media-wrapper">
                        <ul className="media-list">
                            <li className="media-item img">
                                <i style={{"background": `url(${ueditor}) 0 -20px no-repeat`}}></i>
                                图片
                            </li>
                            <li className="media-item vedio">
                                <i style={{"background": `url(${ueditor}) 0 -46px no-repeat`}}></i>
                                视频
                            </li>
                            <li className="media-item music">
                                <i style={{"background": `url(${ueditor}) 0 -124px no-repeat`}}></i>
                                音乐
                            </li>
                        </ul>
                    </div>
                </div>

            </Content>
        )

    }
}
function mapStateToProps(state) {
    return {
        isAuthenticated: state.UserReducer.isAuthenticated,
    }
}

module.exports = connect(mapStateToProps)(EditContainer);
