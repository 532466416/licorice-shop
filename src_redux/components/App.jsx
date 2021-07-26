import React, { Component } from 'react'
import ProptTypes from 'prop-types'

export default class App extends Component {
    static = {
        count: ProptTypes.string.isRequired,
        increment:ProptTypes.func.isRequired,
        decrement:ProptTypes.func.isRequired
    }
    selectRef = React.createRef()
    increment = () => {
        const number = this.selectRef.current.value * 1
        this.props.increment(number)
    }
    decrement = () => {
        const number = this.selectRef.current.value * 1
        this.props.decrement(number)
    }
    incrementIfOdd = () => {
        const number = this.selectRef.current.value * 1
        if (this.props.count % 2 === 1) {
            this.props.increment(number)
        }
    }
    incrementAsync = () => {
        const number = this.selectRef.current.value * 1
        setTimeout(() => {
            this.props.increment(number)
        }, 1000);
    }
    render() {
        const count = this.props.count
        return (
            <div style={{ margin: 30 }}>
                count: {count} times
                <div style={{ marginTop: 20 }}>
                    <select ref={this.selectRef}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>&nbsp;&nbsp;
                    <button onClick={this.increment}>+</button>&nbsp;&nbsp;
                    <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
                    <button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;&nbsp;
                    <button onClick={this.incrementAsync}>increment async</button>
                </div>
            </div>
        )
    }
}
