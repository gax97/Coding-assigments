import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app'

import { BrowserRouter as Router, Link, Route, Redirect, Switch } from 'react-router-dom'

import Signup from './components/signup'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Signin from './components/signin';
import Dashboard from './components/dashboard';
import Reports from './components/reports';
import Signout from './components/signout';

import signUpReducer from './reducers/signUpReducer';
import signInReducer from './reducers/signInReducer';
import loggedIn from './reducers/loggedInReducer';
import timeReducer from './reducers/timeReducer';




const redirect = (state = false, action) =>{
  switch (action.type) {
    case "REDIRECT":
      return !state
    default:
      return false;
  }
} 

const reports = (state =[], action)=>{
  switch(action.type){
    case "UPDATE_REPORTS":
      return action.payload
    default:
       return state
  }
}

const flash = (state ={type:'', msg:''}, action)=>{
  switch(action.type){
    case "FLASH_EMAIL":
      return {type:"EMAIL", msg:action.payload}
    case "FLASH_PASSWORD":
          return {type:"PASSWORD", msg:action.payload}
    case "CLEAR_ALL_FLASH":
        return {type:'', msg:''}
    default:
       return state
  }
}
const store = createStore(combineReducers({signUpReducer, signInReducer, redirect, loggedIn, reports, timeReducer, flash}))

ReactDOM.render(
  <Provider store={store}>
      <Router>
        
        <Route exact path="/" component={App}/>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/reports" component={Reports} />
        <Route path="/sign-out" component={Signout} />
        <Route path="/sign-in" component={Signin} />
        <Route path="/sign-up" component={Signup} />
        
      </Router>  
  </Provider>  
,  document.getElementById('app'));