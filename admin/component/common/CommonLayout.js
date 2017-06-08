/**
 * Created by 1 on 2017/6/8.
 * 菜单header
 */

import React from "react";
import {Affix} from "antd";
const style = {
    padding: "12px 20px",
    fontSize: "14px",
    lineHeight: "16px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #e7e7eb"
}
export function MenuHeader(props) {
    console.log(props.children)
    return (
        <Affix>
            <h5 style={style}>
                {props.children}
            </h5>
        </Affix>
    )
}
