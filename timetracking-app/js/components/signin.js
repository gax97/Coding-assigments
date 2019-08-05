import React, {Component} from 'react';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';


class Signin extends Component{

    handleSubmit(event) {
        event.preventDefault()
        
        const {email, password} = this.props
  
        let options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        }

        fetch('/api/sign-in', options).then((res) => res.json()).then((data) => {

            if (data.success) {
                localStorage['jwt'] = data.token
                this.props.clearLoginPassword()
                this.props.updateSignInEmail('')
                this.props.setRedirect()
                this.props.setLogIn()
            } else {
                if(data.type == "EMAIL"){
                    this.props.updateSignInEmail('')
                    this.props.clearLoginPassword()
                    this.props.flashEmail(data.msg)
                }
                
                if(data.type=="PASSWORD"){
                    this.props.clearLoginPassword()
                    this.props.flashPassword(data.msg)
                }
                
            }
        }).catch((err) => console.log(err))

    }
    renderRedirect(){
        if (this.props.redirect) {
            this.props.setRedirect()
            return <Redirect to='/dashboard' />
          }
    }
    render(){
        if(this.props.loggedIn) return <Redirect to='/dashboard' />
        return(
                <div className="p-20 bg-gray-800 h-full text-white">    
                    <div className="text-center text-6xl">LOGO</div>
                    <div className="text-center text-5xl p-10">
                        <span className="text-green-400">TIME</span>
                        <span className="text-white">TRACK.</span>
                    </div>
                    <form onSubmit={(event)=>this.handleSubmit(event)}>
                        <EmailField email={this.props.email} signIn={true}></EmailField>
                        <PasswordField password={this.props.password} signIn={true}></PasswordField>
            
                        <input className="my-10 p-5 w-full text-white rounded bg-green-400 hover:bg-green-500" type="submit" value="SIGN IN"/>
                    </form>

                    <div className="text-center">
                        Not a member?
                        <span className="text-green-500"><Link to="/sign-up"> SIGN UP</Link></span>
                    </div>
                </div>
            )
        }
}

const mapStateToProps = (state) =>{
    return{
        email: state.signInReducer.email,
        password: state.signInReducer.password,
        redirect: state.redirect,
        loggedIn:state.loggedIn
    }
}

const mapDispatchToProps = (dispatch)=>{
    
    return {
        setRedirect:()=>{
            dispatch({
                type:"REDIRECT"
            })
        },
        clearLoginPassword:()=>{
            dispatch({
                type:"CLEAR_LOGIN_PASSWORD"
            })
        },
        setLogIn: ()=>{
            dispatch({
                type:"LOG_IN"
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
        updateSignInEmail: (payload)=>{
            dispatch({
                type:"UPDATE_LOGIN_EMAIL",
                payload:payload
            })
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Signin);