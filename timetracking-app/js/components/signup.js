import React, {Component} from 'react';
import PasswordField from './PasswordField';
import NameField from './NameField';
import EmailField from './EmailField';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
 

class Signup extends Component{

    handleSubmit(event){
        event.preventDefault()
        
        const {email, name, password} = this.props

        let options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
              },
              body:JSON.stringify({email:email, name:name, password:password}),
        }
        
        
        fetch('/api/sign-up', options).then((res) => res.json()).then((data) =>  
        {   
            if(data.success){
                this.props.clearAll()
                this.props.setLoginEmail(email)
                this.props.setRedirect()
            }else{
                if(data.type == "EMAIL"){
                    this.props.clearAll()
                    this.props.flashEmail(data.msg)
                }
                    
                if(data.type=="PASSWORD"){
                    this.props.updatePassword('')
                    this.props.flashPassword(data.msg)
                    
                }  
            }
        }).catch((err)=>console.log(err))
        
    }
    renderRedirect(){
        if(this.props.redirect){
            return <Redirect to="/sign-in"/>
        }
    }
    render(){
        
        return(
        <div className="p-20 bg-gray-800 h-full text-white">
            {this.renderRedirect()}
            <div className="text-center text-6xl">LOGO</div>
            <div className="text-center text-5xl p-10">
                <span className="text-green-400">TIME</span>
                <span className="text-white">TRACK.</span>
            </div>
            
            <form onSubmit={(event)=>this.handleSubmit(event)}>
                <NameField name={this.props.name}></NameField>
                <EmailField email={this.props.email}></EmailField>
                <PasswordField password={this.props.password}></PasswordField>
                <input className="my-10 p-5 w-full text-white rounded bg-green-400 hover:bg-green-500" type="submit" value="SIGN UP"/>
            </form>
           
            <div className="text-center">
                Already have an account?
                <span className="text-green-500"><Link to="/sign-in"> SIGN IN</Link></span>
            </div>
            
        </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        name: state.signUpReducer.name,
        email: state.signUpReducer.email,
        password: state.signUpReducer.password,
        redirect:state.redirect
    }
}
const mapDispatchToProps = (dispatch)=>{
    
    return {
            clearAll: ()=>{
            dispatch({
                type:"CLEAR_ALL",
            })
        },
        setLoginEmail: (payload)=>{
            dispatch({
                type:"SET_LOGIN_EMAIL",
                payload:payload
            })
        },
        setRedirect:()=>{
            dispatch({
                type:"REDIRECT"
            })
        },
        flashEmail:(msg)=>{
            dispatch({
                type:"FLASH_EMAIL",
                payload:msg
            })
        },
        flashPassword:(msg)=>{
            dispatch({
                type:"FLASH_PASSWORD",
                payload:msg
            })
        },
        updatePassword:(payload)=>{
            dispatch({
                type:"UPDATE_PASSWORD",
                payload:payload
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);
