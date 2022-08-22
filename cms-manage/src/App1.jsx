/**
 * redux 初体验:
 */
import React from 'react'
import { connect } from "react-redux";

function App1(props) {
  return (
    <>
      <h2>{props.msg}</h2>
      <button onClick={props.changeMsgFn}>修改msg</button>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    msg: state.msg
  }
}

const mapDispatchToState = (dispatch) => {
  return {
    changeMsgFn() {
      console.log('???');
      const action = {type: 'changeMsgFn', value: '，点了'}
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps,mapDispatchToState)(App1) // 高阶函数