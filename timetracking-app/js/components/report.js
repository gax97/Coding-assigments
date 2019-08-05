import React, {Component} from 'react';

export default class Report extends Component{
    render(){

        let totalMinutesDifference = this.props.total
        let hourDifference = Math.floor(totalMinutesDifference/60)
        let minuteDifference = Math.floor(totalMinutesDifference%60)

        
        let style = {}
        let length = this.props.reports.length

        return <div className="mt-24">
            <span className="text-3xl text-bold">Time report for: {this.props.formatedDate}</span>
            
                <div className="my-1 text-2xl">
                    {this.props.reports.map((el, i)=>{
                        
                        if(length === i + 1){
                            style = {borderBottom:  "3px solid green", color:"rgb(169,169,169)"}
                        }else{
                            style = {borderBottom: "2px solid rgb(169,169,169)", color: "rgb(169,169,169)"}
                        }
                        return <div style={style} className="my-1">
                            <span className="float-left">{el.hourInterval}</span>
                            <span className="float-right">{el.hourDifference.hour ? el.hourDifference.hour + 'h ' : ' '} {el.hourDifference.minute}m</span>
                            <br/>
                        </div>
                    
                    })}
                    <div className="mt-2 text-2xl">
                        <span className="float-left">Total:</span>
                        <span className="float-right">{hourDifference ? hourDifference + "h " + minuteDifference +"m" : minuteDifference +"m" }</span>
                        <br/>
                    </div>
                </div>
            
        </div>
    }
}


