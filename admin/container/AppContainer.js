/**
 * Created by 1 on 2017/4/12.
 */
import React from "react";
class AppContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

module.exports = AppContainer;
