import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.less'
import { Modal } from 'antd'
import { reqWhether } from '../../api/index'
import { timeFormat } from '../../utils/formateDeal'
import LinkButton from '../linkButton'
import { connect } from 'react-redux'
import {logout} from '../../redux/actions'

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
    logout = () => {
        Modal.confirm({
            title: '您确认要退出吗?',
            onOk: () => {
                this.props.logout()
            }
        });

    }
    render() {
        const { currentTime, weather } = this.state
        const {headerTitle} = this.props
        return (
            <div className="layout-header">
                <div className="layout-header-top">
                    <span>
                        欢迎，{this.props.user.name}
                    </span>
                    <LinkButton onClick={this.logout} >退出</LinkButton>
                </div>
                <div className="layout-header-bottom">
                    <div className="header-bottom-left">
                        {headerTitle}
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
export default connect(
    state => ({headerTitle:state.headerTitle,user:state.user}),
    {logout}
)(withRouter(Header))