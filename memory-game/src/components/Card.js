import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as type from '../types'

class Card extends Component{

    decide(){
        
        if(this.props.card.hidden && !this.props.card.removed)
            this.props.revealCard(this.props.card)
    }
    
    render() {
        
        let isImage = this.props.card.type === "IMG"

        let style = {height:100+'px', width:100+'px', margin:10 + 'px'}

        if(isImage && !this.props.card.hidden){
            style = {...style, background:"url(" + this.props.card.content+ ")"}
        }
        if(this.props.card.removed){
            style = {...style, visibility:"hidden"}
        }

        return <div style={{display:'inline'}}>
                <button  className="box" onClick={()=>this.decide()} style={style}>
                    
                        {this.props.card.hidden ? "CLICK" : (isImage) ? ".":this.props.card.content}
                        
                </button>
                {this.props.block ? <br/> : ''}
         
            </div>
    }
}


const mapDispatchToProps = (dispatch)=>{
    
    return {
        revealCard: (content)=>{
            dispatch({
                type:type.REVEAL_CARD,
                payload:content
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(Card)