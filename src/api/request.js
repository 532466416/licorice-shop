import axios from 'axios'
import {
    message
} from 'antd'

const BASE2 = 'http://159.75.128.32:5000'
const strUrl = [BASE2 + '/api/role/createRoleByName']
export default function request(url, data = {}, type = 'get') {
    const config = strUrl.includes(url) ? {
        headers: {
            'content-type': 'application/json'
        }
    } : {}
    return new Promise(async (resolve, reject) => {
        let response = ''
        try {
            if (type === 'get') {
                response = await axios.get(url, {
                    params: data
                })
            } else if (type === 'put') {
                response = await axios.put(url, data)
            } else if (type === 'delete') {
                response = await axios.delete(url, data)
            } else {
                response = await axios.post(url, data, config)
            }
            resolve(response.data)
        } catch (error) {
            message.error( error.message)
        }
    })
}