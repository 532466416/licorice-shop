import React, { Component } from 'react'
import { Card, Table, Button, Modal, message } from 'antd'
import { reqGetUsers, reqGetRoles, reqAddUpdateUser, reqDeleteUser } from '../../api'
import LinkButton from '../../components/linkButton'
import UserForm from './components/user-form'


export default class User extends Component {
    columns = [
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '电话',
            dataIndex: 'phone',
        },
        {
            title: '注册时间',
            dataIndex: 'createTime',
        },
        {
            title: '所属角色',
            dataIndex: 'roleId',
            render: roleId => this.rolesName[roleId]
        },
        {
            title: '操作',
            render: user => (
                <span>
                    <LinkButton onClick={() => { this.setState({ isModalVisible: true }); this.user = user }}>修改</LinkButton>
                    <LinkButton onClick={() => this.deleteUser(user.id)}>删除</LinkButton>
                </span>
            )
        }
    ]
    state = {
        users: [],
        roles: [],
        isModalVisible: false
    }
    initRolesName = (roles) => {
        const rolesObj = roles.reduce((pre, role) => {
            pre[role.id] = role.name
            return pre
        }, {})
        this.rolesName = rolesObj
    }
    getUsers = async () => {
        const [users, roles] = await Promise.all([reqGetUsers(), reqGetRoles()])
        this.initRolesName(roles.data)
        this.setState({ users, roles: roles.data })
    }
    addOrUpdate = async () => {
        const formObj = this.form.current.getFieldsValue()
        if (this.user.id) {
            formObj.id = this.user.id
            formObj.password = this.user.password
        }
        const result = await reqAddUpdateUser(formObj)
        if (result === 'success') {
            this.form.current.resetFields()
            this.getUsers()
            this.setState({ isModalVisible: false })
            const msgText = this.user.id ? '修改' : '创建'
            message.success(msgText + '成功')
        }
    }
    deleteUser = id => {
        Modal.confirm({
            title: '确认删除？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                const result = await reqDeleteUser(id)
                if (result === 'success') {
                    message.success('删除成功')
                    this.getUsers()
                }
            }
        });
    }
    componentDidMount() {
        this.getUsers()
    }

    render() {
        const { users, roles, isModalVisible } = this.state
        return (
            <Card title={<Button type="primary" onClick={() => { this.setState({ isModalVisible: true }); this.user = {} }}>创建用户</Button>}>
                <Table
                    bordered
                    rowKey='id'
                    dataSource={users}
                    columns={this.columns}
                    pagination={{ pageSize: 6 }}
                />
                {
                    isModalVisible && <Modal title={this.user.id ? '修改用户' : '创建用户'} visible={isModalVisible} onOk={() => this.addOrUpdate()} onCancel={() => { this.setState({ isModalVisible: false }) }}>
                        <UserForm setForm={form => this.form = form} user={this.user} roles={roles} />
                    </Modal>
                }
            </Card>
        )
    }
}
