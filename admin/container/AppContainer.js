/**
 * Created by 1 on 2017/4/12.
 */
import React from "react";
import {connect} from "react-redux";
class AppContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //warning 可以写成middleware 插到根路由上
        if (this.props.isAuthenticated) {
            this.props.history.push({
                pathname: '/main'
            })
        } else {
            this.props.history.push({
                pathname: '/login'
            })
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        isAuthenticated: state.UserReducer.isAuthenticated,
    }
}

module.exports = connect(mapStateToProps)(AppContainer);
