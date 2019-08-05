import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

class App extends Component{

    render(){
    
        return  this.props.loggedIn ? <Redirect to="/dashboard"/> :

        <div className="p-20 bg-gray-800 h-full text-white">
            <div className="text-center text-6xl">LOGO</div>
            <div className="text-center text-5xl p-10">
                <span className="text-green-400">TIME</span>
                <span className="text-white">TRACK.</span>
            </div>
            
            <div className="text-center text-3xl mt-10"> <Link to="/sign-up">Sign up</Link> </div>
            <div className="text-center text-3xl"><Link to="/sign-in">Sign in</Link></div>

        </div>
    }
}
const mapStateToProps = (state) =>{
    return{
        loggedIn:state.loggedIn
    }
}

export default connect(mapStateToProps,null)(App);


