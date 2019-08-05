import React from "react";
import ReactDOM from "react-dom";
import Board from'./components/Board';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import state0 from './initialState';
import * as type from './types'
import { Map, List } from 'Immutable';


const reducer = (state = state0, action)=>{
  let card1, card2
  switch (action.type) {
    case type.HIDE_CARD:
      card1 = state.get('opened').get(0)
      card2 = state.get('opened').get(1)
      
      return Map({
        cards:state.get('cards').map((el)=> el.get('id') === card1.id || el.get('id')===card2.id ? el.set('hidden', true): el),
        opened:List()
    });
      
      
    case type.REMOVE_CARD:
        card1 = state.get('opened').get(0)
        card2 = state.get('opened').get(1)

        return Map({
          cards:state.get('cards').map((el)=> el.get('id') === card1.id || el.get('id')===card2.id ? el.set('removed', true): el),
          opened:List()
      });
      
    case type.REVEAL_CARD:
      
       return Map({
        cards:state.get('cards').map((el)=> el.get('id') === action.payload.id ? el.set('hidden', false): el),
        opened:state.get('opened').push(action.payload) 
     });
     
    default:
      return state;
  }
}
let store = createStore(reducer, state0);



const App = () => {
  return <Provider store={store}>
    <Board></Board>
  </Provider>;
};

ReactDOM.render(<App />, document.querySelector("#root"));