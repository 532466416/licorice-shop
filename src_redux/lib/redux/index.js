export const createStore = (reducer) => {
    let state = reducer(undefined, {
        type: '@@init/reducer'
    })
    const listenList = []
    const getState = () => {
        return state
    }
    const dispatch = (action) => {
        state = reducer(state, action)
        listenList.forEach(listen => {
            listen()
        })
    }
    const subscribe = (listener) => {
        listenList.push(listener)
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}

export const combineReducers = (reducer) => {
    return (preState={}, action) => {
        return Object.keys(reducer).reduce((preData, key) => {
            preData[key] = reducer[key](preState[key], action)
            return preData
        }, {})
    }
}