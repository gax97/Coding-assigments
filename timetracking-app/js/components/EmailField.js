import React, {Component} from 'react'
import { connect } from 'react-redux';

class EmailField extends Component{

    handleChange(event){
        if(this.props.signIn){
            this.props.updateSignInEmail(event.target.value)
        }else{
            this.props.updateSignUpEmail(event.target.value)
        }
        
    }

    
    componentDidMount(){
        this.props.clearFlashMessages()
    }
    render(){
        let styletext = {}, styleVisibility = {display:"none"}, placeholder='email@example.com'

        if(this.props.flashEmail == "EMAIL"){
            styletext={color:"red"}
            styleVisibility={display:"inline"}
            placeholder=''
        }

        return  <div style={styletext}>
                    <label  className="p-3 block">Email</label>
                    <input className="p-3 w-full appearance-none bg-gray-700 rounded" name="email" placeholder={placeholder} 
                    onChange={(event)=>this.handleChange(event)} value={this.props.email}/>
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
            updateSignUpEmail: (payload)=>{
                dispatch({
                    type:"UPDATE_EMAIL",
                    payload:payload
                })
        },
            updateSignInEmail: (payload)=>{
                dispatch({
                    type:"UPDATE_LOGIN_EMAIL",
                    payload:payload
                })
        }, 
            clearFlashMessages:()=>{
                dispatch({
                    type:"CLEAR_ALL_FLASH",
                })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EmailField);
