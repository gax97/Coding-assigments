const loggedIn = (state = false, action)=>{
    switch(action.type){
      case "LOG_IN":
        return true;
      case "LOG_OUT":
        localStorage.removeItem('jwt');
        return false;
      default:
        return state;
    }
  }

export default loggedIn