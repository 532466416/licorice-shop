import React, { Component } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PropTypes from 'prop-types'

export default class richTextEditor extends Component {
    constructor(props) {
        super(props);
        const html = this.props.detail;
        let editorState;
        if (html) {
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            editorState = EditorState.createWithContent(contentState);
        } else {
            editorState = EditorState.createEmpty()
        }
        this.state = {
            editorState,
        };

    }
    static propTypes = {
        detail: PropTypes.string
    }
    onEditorStateChange = (editorState) => {
        this.setState({ editorState })
    }
    getEditor = () => {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }
    uploadImageCallBack = file => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.open('POST', 'http://192.168.3.158:5000/uploadFile')
                const data = new FormData()
                data.append('image', file)
                xhr.send(data)
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText)
                    resolve({data:{link:response.data.url}})
                })
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText)
                    reject(error)
                    // resolve({data: {link:'https://img0.baidu.com/it/u=792472527,2883439455&fm=26&fmt=auto&gp=0.jpg'}})
                });
            }
        );
    }
    render() {
        const { editorState } = this.state;
        return (
            <Editor
                editorState={editorState}
                editorStyle={{ border: '1px solid #000', minHeight: 200, paddingLeft: 10 }}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                }}
            />
        )
    }
}





