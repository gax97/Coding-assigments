import React, {Component} from 'react'
import { connect } from 'react-redux';

class PasswordField extends Component{

    handleChange(event){
        if(this.props.signIn){
            this.props.updateLoginPassword(event.target.value)
        }else{
            this.props.updatePassword(event.target.value)
        }
        
    }

    componentDidMount(){
        this.props.clearFlashMessages()
    }
    render(){
        let styletext = {}, styleVisibility = {display:"none"}, placeholder='5+ characters'
        if(this.props.flashEmail == "PASSWORD"){
            styletext={color:"red"}
            styleVisibility={display:"inline"}
            placeholder=''
        }
        return  <div style={styletext}>
        <label  className="p-3 block">Password</label>
        <input className="p-3 w-full appearance-none bg-gray-700 rounded" name="password" type="password" placeholder={placeholder} 
        onChange={(event)=>this.handleChange(event)} value={this.props.password}/>
        <div style={styleVisibility}>{this.props.flashMsg}</div>
    </div>
    }
}

const mapStateToProps = (state) =>{
    return{
        flashEmail:state.flash.type,
        flashMsg:state.flash.msg
    }
}
const mapDispatchToProps = (dispatch)=>{
    
    return {
        updateLoginPassword: (payload)=>{
            dispatch({
                type:"UPDATE_LOGIN_PASSWORD",
                payload:payload
            })
        },
        updatePassword: (payload)=>{
            dispatch({
                type:"UPDATE_PASSWORD",
                payload:payload
            })
        },clearLoginPassword:()=>{
            dispatch({
                type:"CLEAR_LOGIN_PASSWORD"
            })
        },
        clearFlashMessages:()=>{
            dispatch({
                type:"CLEAR_ALL_FLASH",
                
            })}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PasswordField);
