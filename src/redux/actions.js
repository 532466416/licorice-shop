import { reqLogin,reqRoles } from '../api/index'
import {setUser,removeUser} from '../utils/storage'
import { SET_HEADER_TITLE,RECEIVE_USER,SHOW_MESSAGE,EMPTY_USER} from './constant'

export const setHeaderTitle = data => ({
    type: SET_HEADER_TITLE,
    data
})

const receiveUser = user => ({type:RECEIVE_USER,user})
const showMessage = msg => ({type:SHOW_MESSAGE,msg})
export const login = (username, password) => {
    return async dispatch => {
        const result = await reqLogin(username, password)
        if(result.status === 0){
            const result2 = await reqRoles(result.data.roleId)
            result.data.roles = result2.menus.split(',')
            result.data.roleName = result2.name
            setUser(result.data)
            dispatch(receiveUser(result.data))
        }else{
            // message.error(result.msg)
            dispatch(showMessage(result.msg || '登录失败'))
        }
    }
}

export const  logout =  () => {
    removeUser()
    return { type:EMPTY_USER}
}