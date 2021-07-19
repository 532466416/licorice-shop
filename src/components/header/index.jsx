import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.less'
import { Modal } from 'antd'
import { reqWhether } from '../../api/index'
import { timeFormat } from '../../utils/formateDeal'
import memory from '../../utils/memory'
import {removeUser} from '../../utils/storage'
import menuLists from '../../config/menuConfig'
import LinkButton from '../linkButton'

class Header extends Component {
    state = {
        currentTime: timeFormat(Date.now()),
        whether: ''
    }
    componentDidMount() {
        this.getWhether()
        this.timer = setInterval(() => {
            this.setState({ currentTime: timeFormat(Date.now()) })
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    getWhether = async () => {
        const res = await reqWhether(110101)
        const { weather } = res.lives[0]
        //     then(res => {
        //     const { weather } = res.lives[0]
        //     
        // })
        this.setState({ weather })
    }
    getModuleTitle = () => {
        const { pathname } = this.props.location
        menuLists.forEach(item => {
            if (pathname.indexOf(item.key) === 0) {
                this.moduleTitle = item.title
            } else if (item.children) {
                item.children.forEach(viceItem => {
                    if (pathname.indexOf(viceItem.key) === 0) {
                        this.moduleTitle = viceItem.title
                    }
                })
            }
        })
    }
    logout = () => {
        Modal.confirm({
            title: '您确认要退出吗?',
            onOk: () => {
                memory.user = {}
                removeUser()
                this.props.history.replace('/login')
            }
        });

    }
    render() {
        const { currentTime, weather } = this.state
        this.getModuleTitle()
        return (
            <div className="layout-header">
                <div className="layout-header-top">
                    <span>
                        欢迎，{memory.user.name}
                    </span>
                    <LinkButton onClick={this.logout} >退出</LinkButton>
                </div>
                <div className="layout-header-bottom">
                    <div className="header-bottom-left">
                        {this.moduleTitle}
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        {/* <img src="" alt="" /> */}
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)