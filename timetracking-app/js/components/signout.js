import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Signout extends Component{   
    render(){    
        this.props.setLogOut()
        this.props.clearAll()
        return <Redirect to="sign-in"/>   
    }
}
const mapDispatchToProps = (dispatch)=>{
    
    return {
        setLogOut: ()=>{
            dispatch({
                type:"LOG_OUT"
            })
        },
        clearAll: ()=>{
            dispatch({
                type:"CLEAR_BEFORE_SIGN_OUT"
            })
        }
    }
}

export default connect(null,mapDispatchToProps)(Signout);