import React, { Component } from 'react'
import { Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'
const { Item } = Form
const { Option } = Select

export default class UserForm extends Component {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
        user: PropTypes.object,
        roles: PropTypes.array.isRequired
    }
    formRef = React.createRef()
    componentDidMount() {
        this.props.setForm(this.formRef)
    }
    render() {
        const formLayout = {
            labelCol: { span: 5, },
            wrapperCol: { span: 16, }
        }
        const { user, roles } = this.props
        return (
            <Form ref={this.formRef} {...formLayout}>
                <Item name="name" label="用户名" initialValue={user.name}>
                    <Input placeholder="请输入用户名称" />
                </Item>
                {
                    user.id ?
                        null :
                        (<Item name="password" label="密码">
                            <Input type="password" placeholder="请输入密码" />
                        </Item>)

                }
                <Item name="phone" label="手机号" initialValue={user.phone}>
                    <Input placeholder="请输入手机" />
                </Item>
                <Item name="email" label="邮箱" initialValue={user.email}>
                    <Input placeholder="请输入邮箱" />
                </Item>
                <Item name="roleId" label="角色" initialValue={user.roleId}>
                    <Select placeholder="请选择角色">
                        {
                            roles.map(role => (
                                <Option value={role.id} key={role.id}>{role.name}</Option>
                            ))
                        }
                    </Select>
                </Item>
            </Form>
        )
    }
}
