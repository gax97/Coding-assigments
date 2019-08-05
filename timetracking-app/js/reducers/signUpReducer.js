
let initial_state = {
    email:'',
    name:'',
    password:''
}
const signUpReducer = (state = initial_state, action)=>{
    switch (action.type) {
      case "UPDATE_NAME":
        return {...state, name:action.payload}
      case "UPDATE_EMAIL":
        return{...state, email:action.payload}
      case "UPDATE_PASSWORD":
        return {...state, password:action.payload}
      case "CLEAR_ALL":
        return{...state, email:'', name:'', password:''}
      default:
        return state
    }
  }
export default signUpReducer