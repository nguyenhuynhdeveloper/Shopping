import { createStore } from 'redux'

var value = 0
const counterReducer = ( state = value , action) => {
  switch (action.type) {
    case 'counter/incremented':
      return  value = value +1  
    case 'counter/decremented':
      return  value = value +2
    default:
      return value
  }
}
 export { counterReducer }
let store = createStore(counterReducer)
export {store}



