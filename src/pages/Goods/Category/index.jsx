import React, { Component } from 'react'
import './index.less'
import { Card, Table, Button, Modal, message } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import AddForm from './add-form'
import UpdateForm from './update-form'
import LinkButton from '../../../components/linkButton'
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../../api/index'

export default class Category extends Component {
    columns = [
        {
            title: '分类名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            width: 300,
            render: (category) => {
                return (
                    <span>
                        <LinkButton onClick={() => { this.showUpdateModal(category) }}>修改分类</LinkButton>
                        {
                            this.state.parentId === 0 ?
                                <LinkButton onClick={() => { this.showSubCategory(category) }}>查看子分类</LinkButton> : null
                        }
                    </span>
                )
            }
        }
    ]

    formRef = React.createRef()
    state = {
        categorys: [],
        subCategorys: [],
        parentId: 0,
        subTitleName: '',
        isLoading: false,
        modalVisible: 0,
        categoryMsg: { name: '' }
    }
    getCategory = async (id) => {
        let { parentId } = this.state
        if (id === 0) {
            parentId = id
        }
        this.setState({ isLoading: true })
        const res = await reqCategorys(parentId)
        this.setState({ isLoading: false })
        if (res.flag) {
            if (parentId === 0) {
                this.setState({ categorys: res.data })
            } else {
                this.setState({ subCategorys: res.data })
            }
        } else {
            message.error('分类列表数据请求失败')
        }

    }
    showChiefCategory = () => {
        this.setState({ parentId: 0, subTitleName: '', subCategorys: [] })
    }
    showSubCategory = (category) => {
        this.setState({ parentId: category.id, subTitleName: category.name }, () => {
            this.getCategory()
        })
    }

    showAddModal = () => {
        this.setState({ modalVisible: 1 })
    }
    addCategory = () => {
        const addForm = this.form.current
        addForm.validateFields().then(async value => {
            const { name, type } = value
            const dataObj = {
                name,
                parentId: type,
            }
            const result = await reqAddCategory(dataObj)
            if (result.flag) {
                if (this.state.parentId === type) {
                    this.getCategory()
                } else if (type === 0) {
                    this.getCategory(0)
                }
            } else {
                message.error('品类添加失败')
            }
            this.setState({ modalVisible: 0 })
        }, error => {
        })
    }
    showUpdateModal = (category) => {
        this.setState({ modalVisible: 2, categoryMsg: category })
    }
    updateCategory = async () => {
        const updateForm = this.form.current
        updateForm.validateFields().then(
            async value => {
                const dataObj = { ...this.state.categoryMsg, name:value.name }
                const result = await reqUpdateCategory(dataObj)
                if (result.flag) {
                    this.getCategory()
                } else {
                    message.error('修改失败')
                }
                this.setState({ modalVisible: 0 })
            }, error => {
            }
        )
    }
    cancelModal = () => {
        this.setState({ modalVisible: 0 })
    }
    componentDidMount() {
        this.getCategory()
    }
    render() {
        const { categorys, subCategorys, parentId, subTitleName, isLoading, modalVisible, categoryMsg } = this.state
        const titleNode = parentId === 0 ? '一级分类列表' :
            (<span>
                <LinkButton onClick={this.showChiefCategory}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{ marginRight: 10 }} />
                <span>{subTitleName}</span>
            </span>)

        return (
            <Card title={titleNode} className="goods-category"
                extra={<Button type="primary" onClick={this.showAddModal} icon={<PlusOutlined />}>添加</Button>} >
                <Table
                    columns={this.columns}
                    dataSource={parentId === 0 ? categorys : subCategorys}
                    bordered
                    rowKey='id'
                    scroll={{ y: '42vh' }}
                    loading={isLoading}
                />
                {
                    modalVisible === 1 &&
                    <Modal title="添加分类" visible={modalVisible === 1} onOk={this.addCategory} onCancel={this.cancelModal}>
                        <AddForm categorys={categorys} parentId={parentId} dataSharing={(form) => { this.form = form }} />
                    </Modal>
                }

                {
                    modalVisible === 2 &&
                    <Modal title="修改分类" visible={modalVisible === 2} onOk={this.updateCategory} onCancel={this.cancelModal}>
                        <UpdateForm categoryName={categoryMsg.name} dataSharing={(form) => { this.form = form }} />
                    </Modal>
                }
            </Card>
        )
    }
}
