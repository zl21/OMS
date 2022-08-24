import React, { Component } from "react"

class App extends Component {
  render() {
    return <h2> hi</h2>
  }
}

export default App


/**
 * 父组件
 */

/* 
import ReactDOM  from "react-dom";
import App from './xx.jsx'

ReactDOM.render(
  <App/>
  console.log('???');
) 
*/


/** 按钮点击 */
import React, { Component, Fragment } from 'react'
export default class App extends Component {
  state = {
    num: 1
  }
  render() {
    return (
      <>
        <h2>数字为:{this.state.num}</h2>
        <button onClick={this.addNum.bind(this)}></button>累加</button>
      </>
    )
  }
  addNum() {
    this.setState({
      num: this.state.num + 1
    }, () => {
      console.log(this.state.num); // 2—同步 在回调函数中可以拿到异步的结果, setState 的 同步处理
    })
    console.log(this.state.num); // 1—异步
  }
}