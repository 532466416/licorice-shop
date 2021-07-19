import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

export default class UpdateForm extends Component {
    form = React.createRef()
    static propTypes = {
        categoryName : PropTypes.string.isRequired,
        dataSharing:PropTypes.func.isRequired
    }
    componentDidMount(){
        this.props.dataSharing(this.form)
    }
    render() {
        return (
            <Form ref={this.form}>
                <Form.Item name='name' initialValue={this.props.categoryName} rules={[{ required: true, message: '请填写名称' }]}>
                    <Input placeholder='请输入名称' />
                </Form.Item>
            </Form>
        )
    }
}
