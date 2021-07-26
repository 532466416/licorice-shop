import React, { Component } from 'react'

// const context = React.createContext()
const { Provider, Consumer } = React.createContext()
export default class ContextDemo extends Component {
    state = {
        content: 'dema'
    }
    render() {
        return (
            <div>
                第一级：{this.state.content}
                <Provider value={this.state.content}>
                    <Son />
                </Provider>
            </div>
        )
    }
}

class Son extends Component {
    // static contextType  = context
    render() {
        return (
            <div>
                <Consumer>
                    {
                        name => {
                            return `第二级：${name}2`
                        }
                    }
                </Consumer>
                <GradeSon />
            </div>
        )

    }
}

class GradeSon extends Component {
    render() {
        return (
            <div>
                <Consumer>
                    {
                        name => {
                            return `第三级：${name}3`
                        }
                    }
                </Consumer>
            </div>
        )
    }
}