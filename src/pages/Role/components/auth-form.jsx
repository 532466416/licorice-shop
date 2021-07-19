import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Tree } from 'antd'
import menuList from '../../../config/menuConfig'

const { Item } = Form

export default class AuthForm extends Component {
    static propTypes = {
        role: PropTypes.object.isRequired
    }

    constructor(prop) {
        super(prop)
        const treeData = this.initTree(menuList)
        const { menus } = this.props.role
        this.state = {
            treeData,
            checkedKeys: menus ? menus.split(',') : []
        }
    }
    getTreeData = (list) => {
        return list.reduce((pre, item) => {
            const nodeObj = {
                title: item.title,
                key: item.key
            }
            if (item.children) {
                nodeObj.children = this.getTreeData(item.children)
            }
            pre.push(nodeObj)
            return pre
        }, [])
    }
    initTree = (list) => {
        const children = this.getTreeData(list)
        return [{
            title: '所有权限',
            key: 'all',
            children
        }]
    }
    onCheck = checkedKeys => {
        this.setState({checkedKeys})
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { menus } = nextProps.role
        this.setState({
            checkedKeys: menus ? menus.split(',') : []
        })
    }

    render() {
        const { name } = this.props.role
        const { treeData, checkedKeys } = this.state
        return (
            <>
                <Item label="角色名称" labelCol={{ span: 4 }} wrapperCol={{ span: 17 }}>
                    <Input disabled value={name} />
                </Item>
                <Tree
                    checkable
                    defaultExpandAll
                    treeData={treeData}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                />
            </>
        )
    }
}
