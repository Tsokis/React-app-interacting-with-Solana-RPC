
// import { PublicKey } from '@solana/web3.js';
import './ButtonComp.css';

const ButtonComp = (props) => {
    //Maybe Group All Buttons here??
    
    const airdropHandler = () => {
        const signature = props.connection.requestAirdrop(props.pk, props.lamports).then(res => console.log(res)).catch(err => console.log(err));
        props.connection.confirmTransaction(signature)
        .then(res => {
         console.log(res)
         })
         .catch(err => console.log(err));
    };
    
    return (
        <div className="test"> 
           <Button handleClick={airdropHandler} title={props.airdropButton} />
        </div>
    )
    

};
const Button = ({ handleClick, title }) => (
    <button type="button" onClick={handleClick}>
      {title}
    </button>
  );
export default ButtonComp;