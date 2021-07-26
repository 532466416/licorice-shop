import React,{Component} from 'react'
import PropTypes from 'prop-types'
const Context = React.createContext()

export class Provider extends Component {
    static propTypes = {
        store:PropTypes.object
    }
    render(){
        return (
            <Context.Provider value={this.props.store}>
                {this.props.children}
            </Context.Provider>
            )
    }
}

export const connect = (mapStateToProps,mapDispatchToProps) => {
    return (UIComponent) => {
        return class CanComponent extends Component {
            static contextType = Context
            constructor(props,context){
                super(props,context)
                this.state = mapStateToProps(context.getState())
                if(typeof mapDispatchToProps === 'function'){
                    this.funcProps = mapDispatchToProps(context.dispatch)
                }else{
                    this.funcProps = Object.keys(mapDispatchToProps).reduce((pre,key)=>{
                        pre[key] = (...args) => {context.dispatch(mapDispatchToProps[key](...args))} // 参数透传
                        return pre
                    },{})
                }
                context.subscribe(()=>{
                    this.setState({...mapStateToProps(context.getState())})
                })
            }
            render(){
                return  <UIComponent {...this.state} {...this.funcProps}/>
            }
        }
    }
}