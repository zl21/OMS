/**
 * 定义默认 state
 */
import { createStore } from 'redux'

const defaultState = {
  msg: 'hi'
}

// reducer 是一个纯函数
const reducer = (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state)) 
  // 1. 直接修改 state,不会报错,不会抛异常,但就是不能成功修改 state, 所以要深拷贝.（待深究
  // 2. 可以考虑使用 immutable 包裹整个 state
  console.log('action::',action);

  switch (action.type) {
    case 'changeMsgFn':
      newState.msg += action.value
      break
    default:
      break
  }
  return newState
}

/**
 * 抛出 store
 */

const store = createStore(reducer)
export default store
