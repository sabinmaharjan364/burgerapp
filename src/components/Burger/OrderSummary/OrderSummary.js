import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
const orderSummary=(props)=>{
  const ingredientSummary=Object.keys(props.ingredients)
    .map(igkey=>{
      return <li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span> : {props.ingredients[igkey]}</li>
    });
    return (
  <Aux>
    <h3> your order </h3>
    <p> A delicious burger with the following ingredients: </p>
    <ul>
        {ingredientSummary}

    </ul>
    <p> Total Price: {props.price.toFixed(2)}</p> 
<p> continue to checkout? </p>
    <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button> 
    <Button btnType="Success" clicked={props.purchaseContinue}>Checkout</Button> 
  </Aux>
  );
};
export default orderSummary;