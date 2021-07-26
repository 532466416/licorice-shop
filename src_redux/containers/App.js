import {connect} from '../lib/react-redux'
import AppUI from '../components/App'
import {increment,decrement} from '../redux/actions'

const mapStateToProps = state => ({
    count:state.count
})
// const mapDispatchToProps = dispatch => ({
//     increment:number=>dispatch(increment(number)),
//     decrement:number=>dispatch(decrement(number))
// })
const mapDispatchToProps = {
    increment,
    decrement
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppUI)