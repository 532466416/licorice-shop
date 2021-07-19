import React, { Component } from 'react'
import './index.less'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import SymbolImg from '../../assets/images/mangseng.png'
import { reqLogin,reqRoles } from '../../api/index'
import {message} from 'antd'
import memory from '../../utils/memory'
import {setUser} from '../../utils/storage'
import {Redirect} from 'react-router-dom'

export default class login extends Component {
    onFinish = async (value) => {
        const { username, password } = value
        const result = await reqLogin(username, password)
        if(result.status === 0){
            const result2 = await reqRoles(result.data.roleId)
            result.data.roles = result2.menus.split(',')
            result.data.roleName = result2.name
            memory.user = result.data
            setUser(result.data)
            this.props.history.replace('/')
        }else{
            message.error(result.msg)
        }
    }
    validator = (_, value) => {
        if (!value) {
            return Promise.reject(new Error('请输入密码'))
        } else if (value.length < 4) {
            return Promise.reject(new Error('长度不能小于4位'))
        } else if (value.length > 12) {
            return Promise.reject(new Error('长度不能大于12位'))
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            return Promise.reject(new Error('请使用中文、数字、下滑线'))
        } else {
            return Promise.resolve()
        }
    }

    render() {
        const {user} = memory
        if(user && user._id){
            return <Redirect to='/'/>
        }    
        return (
            <div className="login">
                <header>
                    <img src={SymbolImg} alt="" />
                    <div className="header-title"> Tool配置系统</div>
                </header>
                <section>
                    <div className="section-title">用户登录</div>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, whitespace: true, message: '请输入用户名!' },
                            { min: 4, message: '最小长度为4' },
                            { max: 12, message: '最大长度为12' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '请使用中文、数字、下滑线' }
                            ]}
                            initialValue="admin"
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ validator: this.validator }]}
                            initialValue="123456"
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
