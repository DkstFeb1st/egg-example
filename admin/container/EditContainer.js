/**
 * Created by 1 on 2017/4/12.
 */
import React from "react";
import {connect} from "react-redux";
import {Layout} from "antd";
const {Header, Sider, Content} = Layout;


class EditContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                edit
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
