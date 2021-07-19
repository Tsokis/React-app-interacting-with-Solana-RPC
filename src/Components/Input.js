import { Component } from 'react';
import './Input.css';

class Input extends Component {
   
    changeHandler = (e) => {
        this.props.parentHandler(e.target.value);
    }
    //getting just the value of the input ATM
    render(){
        return(
        <div className="input__wrapper">
            <label className="input__label"><strong>Add Address</strong></label>
            <input className="input__value" onChange={this.changeHandler} />
        </div>
        )
    }
}
export default Input;
