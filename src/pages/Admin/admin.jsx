import React, { Component } from 'react'
import memory from '../../utils/memory'
import { Redirect,Route,Switch } from 'react-router-dom'
import { Layout } from 'antd';
import NaverBar from '../../components/navBar'
import Header from '../../components/header'
import Home from '../Home'
import Category from '../Goods/Category'
import Product from '../Goods/Product'
import User from '../User'
import Role from '../Role'
import Bar from '../echarts/bar'
import Line from '../echarts/line'
import Pie from '../echarts/pie'

const {  Footer, Sider, Content } = Layout;

export default class admin extends Component {
    render() {
        const { user } = memory
        if (!user || !user.id) {
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{minHeight:'100%'}}>
                <Sider>
                    <NaverBar />
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{backgroundColor:'white',margin:'20px'}}>
                        <Switch>
                            <Route path="/home" component={Home}></Route>
                            <Route path="/category" component={Category}></Route>
                            <Route path="/product" component={Product}></Route>
                            <Route path="/user" component={User}></Route>
                            <Route path="/role" component={Role}></Route>
                            <Route path="/charts/bar" component={Bar}></Route>
                            <Route path="/charts/line" component={Line}></Route>
                            <Route path="/charts/pie" component={Pie}></Route>
                            <Redirect to="/home" />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'#ccc'}}>
                        欲买桂花同载酒，终不似，少年游
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
