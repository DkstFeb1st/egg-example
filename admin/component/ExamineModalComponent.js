/**
 * Created by 1 on 2017/4/14.
 */
import React from "react";
import {Checkbox, Form, Modal} from "antd";
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group;

const formItemLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 12},
};

class ExamineModalComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    handleOk() {
        const {getFieldValue} = this.props.form
        this.props.form.validateFieldsAndScroll((errors, values) => {
            console.log(values)
            this.props.submit(values);
        });
    }

    handleCancel() {
        this.props.cancel();
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        let options = []
        this.props.jobList.map((obj, index) => {
            options.push({
                label: obj.label,
                value: obj.value
            })
        })
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
                        label="必修课"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('obligatory', {
                            rules: [
                                {required: true, message: '请选择必修课'}
                            ]
                        })(
                            <CheckboxGroup options={options}/>
                        )}
                    </FormItem>
                    <FormItem
                        label="选修课"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('elective', {
                            rules: [
                                {required: true, message: '请选择选修课'}
                            ]
                        })(
                            <CheckboxGroup options={options}/>
                        )}
                    </FormItem>

                </Form>
            </Modal>
        )
    }
}

module.exports = Form.create()(ExamineModalComponent);