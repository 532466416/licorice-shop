import React, { Component } from 'react'
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import LinkButton from '../../../components/linkButton'
import { reqFindCategory } from '../../../api/index'
import memory from '../../../utils/memory'
const Itme = List.Item

export default class ProductDetail extends Component {
    state = {
        belongCategory: ''
    }
    obtainCategory = async () => {
        const { pcategoryId, categoryId } = memory.product
        let result;
        if (pcategoryId === '0') {
            result = await reqFindCategory(categoryId)
            this.setState({ belongCategory: result.name })
        } else {
            result = await Promise.all([reqFindCategory(pcategoryId), reqFindCategory(categoryId)])
            const belongCategory = result[0].name + ' --> ' + result[1].name
            this.setState({ belongCategory })
        }
    }
    componentDidMount() {
        this.obtainCategory()
    }
    render() {
        const { name, desc, price, images, detail } = memory.product
        const { belongCategory } = this.state
        const titleNode = (
            <span>
                <LinkButton onClick={() => {this.props.history.goBack();memory.product = {}}}><ArrowLeftOutlined /></LinkButton>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={titleNode} className="product-detail">
                <List>
                    <Itme>
                        <span className="item-title">商品名称：</span>
                        <span>{name}</span>
                    </Itme>
                    <Itme>
                        <span className="item-title">商品描述：</span>
                        <span>{desc}</span>
                    </Itme>
                    <Itme>
                        <span className="item-title">商品价格：</span>
                        <span>{price + '元'}</span>
                    </Itme>
                    <Itme>
                        <span className="item-title">所属分类：</span>
                        <span>
                            {belongCategory}
                        </span>
                    </Itme>
                    <Itme>
                        <span className="item-title">商品图片：</span>
                        <span>
                            <img src={'http://159.75.128.32:5000/files/' + images} alt="" />
                        </span>
                    </Itme>
                    <Itme>
                        <span className="item-title">商品详情：</span>
                        <span dangerouslySetInnerHTML={{ __html: detail }}></span>
                    </Itme>
                </List>
            </Card>
        )
    }
}
