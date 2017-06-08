/**
 * Created by 1 on 2017/5/30.
 */

import React from "react";
import {Form, Input, Modal} from "antd";
const FormItem = Form.Item

const formItemLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 12},
};
class CategoryModalComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    handleSubmit() {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.handleCategoryModalSubmit(values)
            } else {

            }
        })
    }

    handleCancel() {
        this.props.handleCategoryModalVisible()
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        return (
            <Modal
                key={this.props.newKey}
                width="580px"
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.handleSubmit.bind(this)}
                onCancel={this.handleCancel.bind(this)}
            >
                <Form>
                    <FormItem
                        label="目录名称"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('name', {
                            initialValue: this.props.treeNodeName,
                            rules: [
                                {
                                    required: true,
                                    message: "目录名称不能为空",
                                    max: 16
                                }
                            ]
                        })(
                            <Input placeholder="填写目录名称"/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
module.exports = Form.create()(CategoryModalComponent);