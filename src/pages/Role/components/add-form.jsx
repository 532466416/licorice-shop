import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
const Item = Form.Item

export default class AddForm extends Component {
    static propsTypes = {
        setForm:PropTypes.func.isRequired
    }

    formRef = React.createRef()

    componentDidMount() {
        this.props.setForm(this.formRef)
    }
    render() {
        return (
            <Form ref={this.formRef}>
                <Item name="roleName" label="角色名称" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}
                    rules={[{
                        required: true,
                        message: '请输入角色名称!',
                    }]}>
                    <Input placeholder="请输入角色名称"/>
                </Item>
            </Form>
        )
    }
}
