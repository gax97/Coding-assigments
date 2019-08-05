
let initial_state = {
  email:'',
  password:''
}

const signInReducer = (state = initial_state, action)=>{
  switch (action.type) {
    case "UPDATE_LOGIN_EMAIL":
      return {...state, email:action.payload}
    case "UPDATE_LOGIN_PASSWORD":
      return{...state, password:action.payload}
    case "SET_LOGIN_EMAIL":
      return{...state, email:action.payload}
    case "CLEAR_LOGIN_PASSWORD":
      return{...state, password:''}
    default:
      return state
  }
}

export default signInReducer