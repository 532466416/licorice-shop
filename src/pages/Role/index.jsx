import React, { Component } from 'react'
import { Card, Table, Button, Modal, message } from 'antd'
import { reqGetRoles, reqAddRole, reqUpdateRole } from '../../api'
import AddForm from './components/add-form'
import AuthForm from './components/auth-form'
import memory from '../../utils/memory'
import { removeUser } from '../../utils/storage'


export default class Role extends Component {
    state = {
        roles: [],
        selectRole: {},
        isShowAdd: false,
        isShowAuth: false
    }
    columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '授权时间',
            dataIndex: 'authTime',
        },
        {
            title: '授权人',
            dataIndex: 'authName',
        }
    ]
    getRoles = async () => {
        const result = await reqGetRoles()
        if (result.status === 0) {
            const roles = result.data
            this.setState({
                roles
            })
        }
    }
    onRow = selectRole => {
        return {
            onClick: event => {
                this.setState({ selectRole })
            }
        }
    }
    addRole = () => {
        this.addForm.current.validateFields().then(async values => {
            const result = await reqAddRole(values.roleName)
            if (result === 'success') {
                const addObj = {
                    authName: "",
                    authTime: "",
                    createTime: "",
                    id: Math.round(Math.random() * 500),
                    menus: [],
                    name: values.roleName,
                }
                this.setState(state => ({
                    roles: [...state.roles, addObj]
                }))
                this.getRoles() //由于接口问题导致上面代码无效，实际需调用该方法重置数据
            }
            this.addForm.current.resetFields()
            this.setState({ isShowAdd: false })
        })
    }
    updateRole = async () => {
        const { selectRole } = this.state
        selectRole.menus = this.refs.authForm.state.checkedKeys.join(',')
        selectRole.authTime = Date.now()
        selectRole.authName = memory.user.name || 'admin'
        const result = await reqUpdateRole(selectRole.id, selectRole)
        if (result.status === 0) {
            if (selectRole.name === memory.user.roleName) {
                memory.user = {}
                removeUser()
                this.props.history.replace('/login')
                message.success('您已更改权限，请重新登录')
            } else {
                message.success('角色授权成功')
            }
        } else {
            message.success('角色授权失败')
        }
        this.setState({
            isShowAuth: false
        })

    }
    componentDidMount() {
        this.getRoles()
    }
    render() {
        const { roles, selectRole, isShowAdd, isShowAuth } = this.state
        const titleNode = (
            <span>
                <Button type="primary" onClick={() => this.setState({ isShowAdd: true })} style={{ marginRight: 10 }}>添加角色</Button>
                <Button type="primary" disabled={!selectRole.id} onClick={() => this.setState({ isShowAuth: true })}>角色设置权限</Button>
            </span>
        )
        return (
            <Card title={titleNode}>
                <Table
                    rowKey="id"
                    bordered
                    dataSource={roles}
                    columns={this.columns}
                    scroll={{ y: 'calc(100vh - 424px)' }}
                    rowSelection={{ type: 'radio', selectedRowKeys: [selectRole.id], onSelect: (selectRole) => this.setState({ selectRole }) }}
                    onRow={this.onRow}
                />
                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => { this.setState({ isShowAdd: false }); this.addForm.current.resetFields() }}
                >
                    <AddForm setForm={form => this.addForm = form} />
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={() => { this.setState({ isShowAuth: false }) }}
                >
                    <AuthForm ref='authForm' role={selectRole} />
                </Modal>
            </Card>
        )
    }
}
