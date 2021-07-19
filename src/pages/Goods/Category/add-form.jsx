import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Input } from 'antd'
const Option = Select.Option

export default class AddForm extends Component {
    static propTypes = {
        categorys: PropTypes.array.isRequired,
        parentId: PropTypes.number.isRequired,
        dataSharing: PropTypes.func.isRequired
    }
    form = React.createRef()
    componentDidMount() {
        this.props.dataSharing(this.form)
    }
    render() {
        const { categorys, parentId } = this.props
        return (
            <Form ref={this.form}>
                <Form.Item name="type" initialValue={parentId} rules={[{ required: true, message: '请选择分类' }]}>
                    <Select >
                        <Option value={0}>一级分类</Option>
                        {
                            categorys.map(item => {
                                return (<Option key={item.id} value={item.id}>{item.name}</Option>)
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item name='name' rules={[{ required: true, message: '请填写名称' }]}>
                    <Input placeholder='请输入名称' />
                </Form.Item>
            </Form>
        )
    }
}
