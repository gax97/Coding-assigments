import React, {Component} from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs'
import Report from './report';
import { Redirect, Link } from 'react-router-dom';

class Reports extends Component{

    componentDidMount(){ 
    // fetch reports
    let token = localStorage['jwt']
        let options = {
            method: 'GET',
            headers: new Headers({
                'Authorization': token
              }),
        }
        fetch('http://localhost:3000/api/reports', 
         options).then((res) => res.json())
        .then((data) =>  
        {    
            //console.log(data)
            this.props.updateReports(data.reports)
        }).catch((err)=>console.log(err))
    }
    displayCurrentDateFormated(){
        return dayjs().format("dddd, DD MMM, HH:mm")
    }
    formatDate(date){
        return dayjs(date).format("dddd, DD MMM")
    }
    currentDateFormated(){
        let date = dayjs()
        return {day:date.format("dddd"), time: date.format("DD MMM, HH:mm")}
    }
    render(){
        var niz = {}

        for (let index = 0; index < this.props.reports.length; index++) {
            const element = this.props.reports[index];
            
            let date = dayjs(element.startTime).format("dddd, DD MMM").toString()
            let hourInterval = dayjs(element.startTime).format("HH:mm").toString() + " - " + dayjs(element.endTime).format("HH:mm").toString()
            let hourDifferenceInMinutes =  dayjs(element.endTime).hour() * 60 + dayjs(element.endTime).minute()
                                            - dayjs(element.startTime).hour()*60 - dayjs(element.startTime).minute()
                                            
            niz[date] ? niz[date].push({hourInterval:hourInterval, hourDifference:
                {hour:Math.floor(hourDifferenceInMinutes/60), minute:Math.floor(hourDifferenceInMinutes%60)}}) 
                : niz[date] = [{hourInterval:hourInterval, hourDifference:
                    {hour:Math.floor(hourDifferenceInMinutes/60), minute:Math.floor(hourDifferenceInMinutes%60)}}]
            niz[date].total ? niz[date].total+=hourDifferenceInMinutes : niz[date].total = hourDifferenceInMinutes

        }
        let date = this.currentDateFormated()
        return this.props.loggedIn ? 
        <div className="p-16 text-2xl">
            <div className="header mb-12">
                <div className="float-left hover:text-green-500"><Link to="/dashboard">{"<="}</Link></div> 
                <div className="float-right hover:text-green-500"><Link to="/sign-out">SIGN OUT</Link></div> 
            </div>
            <br/>

        <div className="text-left">
            <span className="font">{date.day} </span>
            <span className="mx-1 font-light">{date.time}</span>
        </div>
        <h1 className="text-center mt-12">REPORTS</h1>
        {Object.keys(niz).map((el)=><Report reports={niz[el]} formatedDate={el} total={niz[el].total}></Report>)}
        </div> 
        : <Redirect to="/sign-in"/> 

    }
}

const mapStateToProps = (state) =>{
    return{
        reports:state.reports,
        loggedIn:state.loggedIn
    }
}
const mapDispatchToProps = (dispatch)=>{
    
    return {
            updateReports: (payload)=>{
            dispatch({
                type:"UPDATE_REPORTS",
                payload:payload
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Reports);

