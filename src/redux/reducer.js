import { combineReducers } from 'redux'
import { SET_HEADER_TITLE,RECEIVE_USER,SHOW_MESSAGE,EMPTY_USER } from './constant'
import {getUser} from '../utils/storage'

const initTitle = '首页'
const headerTitle = (state = initTitle, action) => {
    // console.log('header reducer',action);
    switch (action.type) {
        case SET_HEADER_TITLE:
            return action.data
        default:
            return state;
    }
}
const initUser = getUser()
const user = (state = initUser, action) => {
    // console.log('user reducer',action);
    switch (action.type) {
        case RECEIVE_USER:
            return action.user;
        case SHOW_MESSAGE:
            return {...state,msg:action.msg}
        case EMPTY_USER:
            return {}
        default:
            return state
    }
}

export default combineReducers({
    headerTitle,
    user
})