import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dayjs from 'dayjs'

class Timer extends Component{
    constructor(){
        super()
        
        this.displayTime = this.displayTime.bind(this)
        this.fetchData = this.fetchData.bind(this)
        // this.handleClick = this.handleClick.bind(this)
    }
    
    fetchData() {
        let token = localStorage['jwt']
        if (token) {

            let options = {
                method: 'GET',
                headers: new Headers({
                    'Authorization': token
                }),
            }

            fetch('/api/todays-total',
                    options).then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    this.props.updateTotalTime(data)
                }).catch((err) => console.log(err))
        }
    }
    
    displayTime(){
        const  {hours, minutes} = this.props.currentTime
        return (hours > 9 ? hours : '0'+ hours) + "  :  " + (minutes > 9 ? minutes : '0' + minutes)
    }
    
    handleClick(){
        
        if(this.props.clicked){
            let endTime = dayjs().format("YYYY-MM-DD HH:mm:ss")
            let startTime = dayjs(this.props.startTime).format("YYYY-MM-DD HH:mm:ss")
            this.props.clearTimer()

            let token = localStorage['jwt']
             
            let options = {
                method: 'POST',
                headers: new Headers({
                        'Authorization': token,
                        'Content-type': 'application/json'
                        }),
                  
                  body:JSON.stringify({startTime:startTime, endTime:endTime}),
            }
            
            fetch('http://localhost:3000/api/add-activity', 
             options).then((res) => res.json())
            .then((data) =>  
            {
                console.log("data sent")                
            }).catch((err)=>console.log(err))

            setTimeout(()=>{
                this.fetchData()
            }, 1000)

        }else{
            
            let start = Date.now()
            this.props.setStartTime(start)
            let timerId = setInterval(this.props.updateTime, 1000)
            this.props.setTimerIntervalId(timerId)

        }

        this.props.updateClick()
          
    }
    
    render(){
        console.log('render called', this.props.currentTime)
        return (
            <div className="content-center">
                <div className="text-center text-6xl p-10 mt-16">
                    {this.displayTime()}
                </div>
                <div className="mb-16 text-center">
                    <span className="p-5 m-5">HOURS</span>
                    <span className="p-5">MINUTES</span>
                </div>
                
                <button className="w-full h-12 bg-red-500 text-white hover:bg-red-400 my-8 rounded"  onClick={()=>this.handleClick()}>
                    {this.props.clicked ? "CLOCK OUT" : "CLOCK IN"}
                </button>
            </div>
        )
    }


}

const mapStateToProps = (state) =>{
    return{
        currentTime:state.timeReducer.currentTime,
        startTime:state.timeReducer.startTime,
        clicked:state.timeReducer.clicked
    }
}
const mapDispatchToProps = (dispatch)=>{
    
    return {
        updateTime:(time)=>{
            dispatch({
                type:"UPDATE_TIME",
                payload:time
            })
        },
        setStartTime:(payload)=>{
            dispatch({
                type:"SET_START_TIME",
                payload:payload
            })
        },
        updateClick:()=>{
            dispatch({
                type:"BUTTON_CLICKED",
               
            })
        },
        updateTotalTime:(time)=>{
            dispatch({
                type:"UPDATE_TOTAL_TIME",
                payload:time
            })
        },
        resetTime:()=>{
            dispatch({
                type:"RESET_TIME"
            })
        },
        updateReports:(payload)=>{
            dispatch({
                type: "UPDATE_REPORTS",
                payload: payload
            })
        },
        clearTimer: ()=>{
            dispatch({
                type:"CLEAR_TIME"
            })
        },
        setTimerIntervalId:(payload)=>{
            dispatch({
                type:"SET_TIMER_INTERVAL_ID",
                payload:payload
            })
        }
        

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Timer);