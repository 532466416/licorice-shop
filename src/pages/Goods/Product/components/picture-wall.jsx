import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Upload, Modal,
    // message
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import { reqRemovUpload } from '../../../../api/index'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PictureWall extends Component {
    constructor(props) {
        super(props)
        let fileList = [
            // {
            //     uid: '-1',
            //     name: 'image.png',
            //     status: 'done',
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // }
        ]
        const { uplodImgs } = this.props
        if (uplodImgs && uplodImgs.length > 0) {
            fileList = uplodImgs.map((item, index) => ({
                uid: -index,
                name: item,
                status: 'done',
                url: 'http://159.75.128.32:5000/files/' + item,
            }))
        }
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList,
        }
    }
    static propTypes = {
        uplodImgs: PropTypes.array
    }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ fileList, file }) => {
        // console.log('handleChange()', file, file.status, fileList.length, file === fileList[fileList.length - 1])
        if (file.status === 'done') {
            file.name = file.response.data.name
            // file.url = file.response.data.url
        } else if (file.status === 'removed') {
            // const result = await reqRemovUpload(a.name)
            // if (result.status === 0) {
            //     message.success('删除成功')
            // }
        }
        this.setState({ fileList })
    };

    getUploads = () => {
        return this.state.fileList.map(item => item.name)
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    action="http://192.168.3.158:5000/uploadFile"
                    accept="image/*"
                    listType="picture-card"
                    fileList={fileList}
                    name="image"
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}
