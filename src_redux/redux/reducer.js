import {combineReducers} from '../lib/redux'
import {INCREMENT, DECREMENT} from './constant'

 function count(state = 1, action) {
    // console.log(state, action);
    switch (action.type) {
        case INCREMENT:
            return state + action.data
        case DECREMENT:
            return state - action.data
        default:
            return state
    }
}

const inintUser = {}
function user(state = inintUser,action) {
    switch (action.type) {
        default:
            return state
    }
}

export default combineReducers({
    count,
    user
})