import React, { useState, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';
import './Info.css';
// getting the balance of the reciever account
const Info = (props) => {
    const [recieverAccountBalance, setrecieverAccountBalance] = useState(0);
    const pk = new PublicKey(props.recieverAccount);
    useEffect(() => {
        props.connection.getBalance(pk)
        .then(res =>{
            console.log(res);
            setrecieverAccountBalance(res * 0.000000001);
        })
        .catch(err => console.log(err));
      });
    return (
        <div className="test"> 
            <p>DEV ACCOUNT BALANCE <strong>{props.lamports}</strong>  SOL</p> 
            <p>Reciever Account has <strong>{recieverAccountBalance}</strong>  SOL</p>
        </div>
    )
};


export default Info;
