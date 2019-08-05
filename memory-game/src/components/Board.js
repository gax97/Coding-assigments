import React, {Component} from 'react';
import Card from './Card';
import {connect} from 'react-redux'
import * as type from '../types';

class Board extends Component{
    render(){
        
        setTimeout(()=>{
          if(this.props.openCards.length == 2)  {
            if(this.props.openCards[0].content === this.props.openCards[1].content){
                
                this.props.removeCards()
            }else{
                this.props.hideCards()
            }
          }
            
        }, 1000);

        let endGame = this.props.cards.find((el)=> el.get('removed') === false);
        
        if(!endGame) 
            return <div>
                <h1>Congrats! You won</h1>
            </div>

        return <div>
            {this.props.cards.map((element, i)=> (i+1)%4 === 0 ? <Card card={element.toObject()} block={true}></Card> : 
            <Card card={element.toObject()} block={false}></Card>)}
        </div>
        
    }
}
const mapStateToProps = (state) =>{
    return{
        cards: state.get('cards').toArray(),
        openCards: state.get('opened').toArray()
    }
}
const mapDispatchToProps = (dispatch)=>{
    
    return {
            hideCards: ()=>{
            dispatch({
                type:type.HIDE_CARD,
                
            })
        },
        removeCards: ()=>{
            dispatch({
                type:type.REMOVE_CARD,
                
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Board);