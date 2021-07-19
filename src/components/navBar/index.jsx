import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.less'
import titleImg from '../../assets/images/mangseng.png'
import { Menu } from 'antd';
import menuLists from '../../config/menuConfig'
import memory from '../../utils/memory'
const { SubMenu } = Menu;

class NavBar extends Component {
    // getLists = (lists) => {
    //     return lists.map(list => {
    //         if (!list.children) {
    //             return (
    //                 <Menu.Item key={list.key} icon={list.icon}>
    //                     <Link to={list.key}>{list.title}</Link>
    //                 </Menu.Item>
    //             )
    //         } else {
    //             return (
    //                 <SubMenu key={list.key} icon={list.icon} title={list.title}>
    //                     {this.getLists(list.children)}
    //                 </SubMenu>
    //             )
    //         }
    //     })
    // }
    permVerify = (item) => {
        const { roles } = memory.user
        if (memory.user.name === 'main' || roles.includes(item.key) || item.isPublic) return true
        else if (item.children) return !!item.children.find(child => roles.includes(child.key))
        return false
    }
    getLists = lists => {
        const path = this.props.location.pathname
        return lists.reduce((pre, list) => {
            if (this.permVerify(list)) {
                if (!list.children) {
                    pre.push((
                        <Menu.Item key={list.key} icon={list.icon}>
                            <Link to={list.key}>{list.title}</Link>
                        </Menu.Item>
                    ))
                    if (path.indexOf(list.key) === 0) {
                        this.selectKey = list.key
                    }
                } else {
                    let titleItem = list.children.find(item => {
                        return path.indexOf(item.key) === 0
                    })
                    if (titleItem) {
                        this.submenuKey = list.key
                    }
                    pre.push((
                        <SubMenu key={list.key} icon={list.icon} title={list.title}>
                            {this.getLists(list.children)}
                        </SubMenu>
                    ))
                }
            }
            return pre
        }, [])

    }
    UNSAFE_componentWillMount() {
        this.menuItemLists = this.getLists(menuLists)
    }
    render() {
        return (
            <div className="layout-navbar">
                <Link to="/" className="layout-navbar-header">
                    <img src={titleImg} alt="" />
                    <h1>德玛西亚</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={[this.selectKey]}
                    defaultOpenKeys={[this.submenuKey]}
                >
                    {this.menuItemLists}
                </Menu>
            </div>
        )
    }
}

export default withRouter(NavBar)