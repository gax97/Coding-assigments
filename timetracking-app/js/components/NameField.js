import React, {Component} from 'react'
import { connect } from 'react-redux';


class NameField extends Component{

    handleChange(event){
        this.props.updateName(event.target.value)
    }

    render(){
        
        return  <div>
                    <label  className="p-3 block">Full name</label>
                    <input className="p-3 w-full appearance-none bg-gray-700 rounded" name="name" placeholder="John Doe" 
                    onChange={(event)=>this.handleChange(event)} value={this.props.name}/>
                </div>
    }
}

const mapDispatchToProps = (dispatch)=>{
    
    return {
            updateName: (payload)=>{
            dispatch({
                type:"UPDATE_NAME",
                payload:payload
            })
        }
    }
}

export default connect(null,mapDispatchToProps)(NameField);

