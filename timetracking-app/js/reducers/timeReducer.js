let initialState = {currentTime:{hours:0, minutes:0}, startTime:0, clicked:false, totalTime:{hours:0,minutes:0}, timerIntervalId:undefined}

const timeReducer = (state = initialState,  action)=>{
    switch(action.type){
      case "CLEAR_TIME":
        if(state.timerIntervalId)
          clearInterval(state.timerIntervalId)
        return {...state, currentTime:{hours:0, minutes:0}, timerIntervalId:undefined}
      case "SET_TIMER_INTERVAL_ID":
        return{...state, timerIntervalId:action.payload}
      case "SET_START_TIME":
        return {...state, startTime:action.payload}
      case "UPDATE_TIME":
        //miliseconds
        let time = Date.now() - state.startTime
        let minutes = Math.floor(time/60000)
        let hours = Math.floor(minutes/60)
        minutes = Math.floor(minutes % 60)
        
        return {...state, currentTime:{hours:hours, minutes:minutes}}
      case "UPDATE_TOTAL_TIME":
        return {...state, totalTime:{hours:action.payload.hours, minutes:action.payload.minutes}}
      case "BUTTON_CLICKED":
        return {...state, clicked:!state.clicked}
      case "UPDATE_PREVIOUS_TIME":
        return {...state, previousTime:action.payload}
      case "RESET_TIME":
        return {...state, currentTime:{hours:0, minutes:0}}
      case "CLEAR_BEFORE_SIGN_OUT":
        if(state.timerIntervalId)
            clearInterval(state.timerIntervalId);
        return initialState
      default:
        return state;
    }
}
export default timeReducer