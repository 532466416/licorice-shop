import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.less'
import {BrowserRouter} from 'react-router-dom'
import memory from './utils/memory'
import {getUser} from './utils/storage'
memory.user = getUser()

ReactDOM.render( <BrowserRouter> <App/></BrowserRouter> , document.getElementById('root'))