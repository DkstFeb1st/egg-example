/**
 * Created by 1 on 2017/4/14.
 */
import React from "react";
import {Checkbox, Form, Modal, Select} from "antd";
const FormItem = Form.Item
const Option = Select.Option;

const formItemLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 12},
};

class AuditModalConponent extends React.Component {
    constructor(props) {
        super(props)
    }

    handleOk() {
        const {getFieldValue} = this.props.form
        this.props.form.validateFieldsAndScroll((errors, values) => {
            let interest = getFieldValue('interest')
            this.props.submit(values);
        });
    }

    handleCancel() {
        this.props.cancel();
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;

        return (
            <Modal
                wrapClassName="auditModal"
                width={500}
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                key={this.props.key}
                maskClosable={false}
            >
                <Form>
                    <FormItem
                        label="兴趣课"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('interest', {})(
                            <Checkbox ></Checkbox>
                        )}
                    </FormItem>
                    <FormItem
                        label="审核的部门"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('department')(
                            <Select style={{width: 120}} disabled={getFieldValue('interest')}>
                                {
                                    this.props.departmentList.map((obj, index) => {
                                        return <Option value={obj.value}>{obj.label}</Option>
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>

                </Form>
            </Modal>
        )
    }
}

module.exports = Form.create()(AuditModalConponent);