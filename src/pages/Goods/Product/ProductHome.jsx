import React, { Component } from 'react'
import { Card, Select, Input, Table, Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import LinkButton from '../../../components/linkButton'
import { reqProductList, reqSearchProduct, reqChangeStatus } from '../../../api/index'
const { Option } = Select

export default class ProductHome extends Component {
    state = {
        products: [],
        total: 0,
        pageNum: 1
    }
    columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
        },
        {
            title: '价格',
            width: 150,
            dataIndex: 'price',
            render: (price) => {
                return (
                    <span>￥{price}</span>
                )
            }
        },
        {
            title: '状态',
            width: 100,
            dataIndex: 'status',
            render: (status, product) => {
                return (
                    <span>
                        <Button type="primary" onClick={() => this.changeStatus(product)}>{status === 1 ? '下架' : '上架'}</Button>
                        <span>{status === 1 ? '在售' : '已下架'}</span>
                    </span>
                )
            }
        },
        {
            title: '操作',
            width: 100,
            render: (product) => {
                return (
                    <span>
                        <LinkButton onClick={() => this.props.history.push('/product/detail', { product })}>详情</LinkButton>
                        <LinkButton onClick={() => this.props.history.push('/product/addupdate', product)}>修改</LinkButton>
                    </span>
                )
            }
        }
    ]
    searchType = "searchByName"
    searchText = ""
    obtainProducts = async (pageNum) => {
        this.setState({ pageNum })
        const { searchType, searchText } = this
        let result
        if (searchText !== '') {
            result = await reqSearchProduct(searchType, searchText, pageNum)
        } else {
            result = await reqProductList({ pageNum, pageSize: 8 })
        }
        const { list, total } = result
        this.setState({ products: list, total })
    }
    changeStatus = async (product) => {
        const result = await reqChangeStatus(product.id)
        if (result === 0) {
            message.success('更新成功')
            this.obtainProducts(this.state.pageNum)
        } else {
            message.error('更新失败')
        }
    }
    componentDidMount() {
        this.obtainProducts(1)
    }
    render() {
        const { products, total, pageNum } = this.state
        const titleNode = (
            <span>
                <Select defaultValue="searchByName" onChange={searchType => this.searchType = searchType}>
                    <Option value="searchByName">按名称搜索</Option>
                    <Option value="searchByDesc">按描述搜索</Option>
                </Select>
                <Input placeholder="关键词" onChange={event => this.searchText = event.target.value} />
                <Button type="primary" onClick={() => { this.obtainProducts(1) }}>搜索</Button>
            </span>
        )
        return (
            <Card className="product-home" title={titleNode} extra={<Button type="primary" onClick={() => { this.props.history.push('/product/addupdate') }}><PlusOutlined />添加商品</Button>}>
                <Table
                    bordered
                    rowKey='id'
                    dataSource={products}
                    columns={this.columns}
                    scroll={{
                        y: 'calc(100vh - 400px)'
                    }}
                    pagination={{ defaultPageSize: 8, total, current: pageNum, onChange: this.obtainProducts }}
                />
            </Card>
        )
    }
}
