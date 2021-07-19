import React, { Component } from 'react'
import { Card, Form, Input, Cascader, Button, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import LinkButton from '../../../components/linkButton'
import PictureWall from './components/picture-wall'
import RichTextEditor from './components/rich-text-editor'
import { reqCategorys, reqAddOrUpdateProduct } from '../../../api/index'
const { Item } = Form
const { TextArea } = Input

const validator = (rule, value, callback) => {
    if (value && value * 1 <= 0) {
        return Promise.reject('数值必须大于0')
    } else {
        return Promise.resolve()
    }
}

export default class ProductAddUpdate extends Component {
    state = {
        options: []
    }
    formRef = React.createRef()
    uploadRef = React.createRef()
    editorRef = React.createRef()
    loadData = async selectedOptions => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;
        const result = await this.getCategorys(targetOption.value)
        targetOption.loading = false;
        if (result && result.length > 0) {
            const subOptions = result.map(item => ({
                value: item.id,
                label: item.name,
                isLeaf: true,
            }))
            targetOption.children = subOptions
        } else {
            targetOption.isLeaf = true
        }
        this.setState({ options: [...this.state.options] })
    };
    getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId)
        if (result.flag) {
            if (parentId === 0) {
                this.initOptions(result.data)
            } else {
                return result.data
            }
        }
    }
    initOptions = (data) => {
        const options = data.map(item => ({
            value: item.id,
            label: item.name,
            isLeaf: false,
        }))
        this.setState({ options })
        const { isUpdate, product } = this
        const { pcategoryId } = product
        if (isUpdate && pcategoryId !== '0') {
            const selectOption = options.find(item => item.value === pcategoryId * 1)
            this.loadData([selectOption])
        }
    }
    submitForm = () => {
        this.formRef.current.validateFields().then(async values => {
            const { name, price, desc, categorys } = values
            const images = this.uploadRef.current.getUploads().join(',')
            const detail = this.editorRef.current.getEditor()
            const pcategoryId = categorys.length === 1 ? 0 : categorys[0]
            const categoryId = categorys.length === 1 ? categorys[0] : categorys[1]
            const dataObj = { name, price, desc, pcategoryId, categoryId, images, detail }
            if (this.isUpdate) {
                dataObj.id = this.product.id
            }
            const result = await reqAddOrUpdateProduct(dataObj)
            const messageText = this.isUpdate ? '修改':'增加'
            if (result.status === 0) {
                message.success(messageText+'成功')
                this.props.history.goBack()
            }else{
                message.error(messageText+'失败')
            }

        })
    }
    UNSAFE_componentWillMount() {
        this.isUpdate = !!this.props.location.state
        this.product = this.props.location.state || {}
    }
    componentDidMount() {
        this.getCategorys(0)
    }
    render() {
        const { product } = this
        const titleNode = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}><ArrowLeftOutlined /></LinkButton>
                <span>添加商品</span>
            </span>
        )
        const categorys = []
        let uplodImgs = []
        let detail = ''
        if (this.isUpdate) {
            const { pcategoryId, categoryId, images } = product
            categorys.push(categoryId * 1)
            if (pcategoryId !== '0') {
                categorys.unshift(pcategoryId * 1)
            }
            uplodImgs = images ? images.split(','):[]
            detail = product.detail
        }
        return (
            <Card title={titleNode}>
                <Form
                    ref={this.formRef}
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 8 }}
                >
                    <Item name="name" label="商品名称：" rules={[{ required: true, message: '请输入商品名称' }]} initialValue={product.name}>
                        <Input placeholder="请输入商品名称" />
                    </Item>
                    <Item name="desc" label="商品描述：" rules={[{ required: true, message: '请输入商品描述' }]} initialValue={product.desc}>
                        <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
                    </Item>
                    <Item name="price" label="商品价格：" rules={[{ required: true, message: '请输入商品价格' }, { validator }]} initialValue={product.price}>
                        <Input type="number" addonAfter="元" placeholder="" />
                    </Item>
                    <Item name="categorys" label="商品分类：" rules={[{ required: true, message: '请选择商品分类' }]} initialValue={categorys}>
                        <Cascader options={this.state.options} loadData={this.loadData} />
                    </Item>
                    <Item label="商品图片：">
                        <PictureWall ref={this.uploadRef} uplodImgs={uplodImgs} />
                    </Item>
                    <Item label="商品详情：" wrapperCol={{ span: 20 }}>
                        <RichTextEditor ref={this.editorRef} detail={detail} />
                    </Item>
                    <Item >
                        <Button onClick={this.submitForm} type="primary">提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
