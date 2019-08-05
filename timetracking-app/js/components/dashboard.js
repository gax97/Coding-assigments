import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import dayjs from 'dayjs'
import Timer from './timer';

class Dashboard extends Component{
    
    constructor(){
        super()
        this.displayTotalTime = this.displayTotalTime.bind(this)
        this.fetchData = this.fetchData.bind(this)
    }
    componentDidMount(){
        this.fetchData()
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
                    this.props.updateTotalTime(data)
                }).catch((err) => console.log(err))
        }
    }
    displayTotalTime(){
        const {hours, minutes} = this.props.totalTime
        return (hours > 9 ? hours : '0'+ hours) + "h " + (minutes > 9 ? minutes+"m" : '0' + minutes + "m")
    }
    currentDateFormated(){
        let date = dayjs()
        return {day:date.format("dddd"), time: date.format("DD MMM, HH:mm")}
    }
    
    render(){
        
        let date2 = dayjs()
        let date = {day:date2.format("dddd"), time: date2.format("DD MMM, HH:mm")}

        return this.props.loggedIn ? 
        <div className="p-20 text-2xl">
            <div className="header text-right mb-12 hover:text-green-500"> <Link to="sign-out">SIGN OUT</Link> </div>

            <div className="text-left todaysDate">
                <span className="font">{date.day} </span>
                <span className="mx-1 font-light">{date.time}</span>
            </div>
            <div className="text-left totalTime">
            <span>Time spent today: </span>
            <span className="font-bold">{this.displayTotalTime()}</span>
            </div>
            
            <Timer></Timer>
            
            <div className="h-12 w-full bg-gray-400 text-center text-black hover:bg-gray-300 hover:text-white rounded">
                <Link to="/reports">REPORTS</Link>
            </div>
                
            <div className="font-thin text-center">
                {this.props.clicked ? <span className="text-red-500">Clicking <span className="font-bold">CLOCK OUT</span> 
                    will stop the time counter.</span> 
                :<span>Clicking <span className="font-bold">CLOCK IN</span> will start the the time counter.</span>}
            </div>
            
        </div>
        : <div><Redirect to="/sign-in"/></div>
    }
}

const mapStateToProps = (state) =>{
    return{
        totalTime:state.timeReducer.totalTime,
        loggedIn:state.loggedIn,
        clicked:state.timeReducer.clicked
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        updateTotalTime: (time) => {
            dispatch({
                type: "UPDATE_TOTAL_TIME",
                payload: time
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);