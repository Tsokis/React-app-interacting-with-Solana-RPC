import React, { Component } from 'react';
import './App.css';
import Info from './Components/Info.js';
import Input from './Components/Input.js';
import ButtonGroup from './Components/ButtonComp';
import { Connection,Keypair,PublicKey,Transaction,SystemProgram,sendAndConfirmTransaction } from '@solana/web3.js'; //solanaWeb3 from '@solana/web3.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lamports: 0,
      connection:new Connection('https://api.devnet.solana.com'),// cluster connection
      recieverPublicKey:new PublicKey(''),//reciever's public key
      userAccountValue:'',
      isLoading:false,
      staticLamportsForAirdrop:200000000 //2000000000 // == 2 SOL
    };
    this.secret = new Uint8Array([]);//secret key as Uint8 Array
    this.accountKeyPairTest = Keypair.fromSecretKey(this.secret)
    this.publicKeyStr = this.accountKeyPairTest.publicKey.toString();
    this.pKey = new PublicKey(this.publicKeyStr);
    this.transaction = new Transaction();
    this.sendTransactionHandler = this.sendTransactionHandler.bind(this);
  }
  
  componentDidMount() {
    console.log(this.accountKeyPairTest.secretKey);
    this.state.connection.getBalance(this.accountKeyPairTest.publicKey)
    .then(res => {
        console.log(res);
        this.setState({lamports:res * 0.000000001})
    })
    .catch(err => console.log(err));
  }
  
  sendTransactionHandler(){
    this.setState({isLoading:true})
    let transferFromTo = SystemProgram.transfer({
      fromPubkey: this.pKey, // your public key
      toPubkey: this.state.recieverPublicKey, // reciever's public key
      lamports: 100000000 // static transfer of 0.1 SOL 
   });
    this.transaction.add(transferFromTo);
    //Method for sending and signing the transaction 
    let signature = sendAndConfirmTransaction(this.state.connection,this.transaction,[this.accountKeyPairTest])
    .then(res => {
       if(res.length!==0){
        this.setState({isLoading:!this.state.isLoading})
        window.location.reload();// not a proper way for reloading on react
       }
    })
    .catch(err => console.log(err))
    return signature;
  }
  getInputValue = (val) => {
    this.setState({userAccountValue:val}) // getting input value from component
    console.log(val);
  }
  
  render() {
    const isLoading = this.state.isLoading;
    let spinner;
    let display;
    if(isLoading){
      spinner = <div className="loader"></div>
      display='none';
    }
    return (
      <section className="app__wrapper">
        {spinner}
        <div style={{display: display}}>
          <Info lamports={this.state.lamports} connection={this.state.connection} recieverAccount={this.state.recieverPublicKey.toString()}/>
          <button className="btn" onClick={this.sendTransactionHandler}>Send Transaction</button>
          <Input parentHandler={this.getInputValue}/>
          <ButtonGroup airdropButton="Request Airdrop" connection={this.state.connection} 
          pk={this.accountKeyPairTest.publicKey} 
          lamports={this.state.staticLamportsForAirdrop}/>
        </div>
      </section>
    );
  }
  
}


export default App;
