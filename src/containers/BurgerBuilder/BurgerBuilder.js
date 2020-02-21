import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES={
  salad:0.5,
  bacon:1,
  cheese:2,
  meat:2
};
class BurgerBuilder extends Component{
  state={
    ingredients:{
      salad:0,
      bacon:0,
      cheese:0,
      meat:0
    },totalPrice:4,
    purchasable:false,
    purchasing:false
  }
  componentDidMount(){
    axios.get('https://burgerapp-b4709.firebaseio.com/')
      .then(response=>{
          this.setState({ingredients:response.data});
      });
  }

  updatePurchasableState(ingredients){
   
    const sum= Object.keys(ingredients).map(igKey=>{
      return ingredients[igKey];
    })
    .reduce((sum,el)=>{
      return sum+el;

    },0);
    this.setState({
      purchasable:sum>0
    })
  }
  addIngredientHandler=(type)=>{
    const oldCount=this.state.ingredients[type];
    const updatedCount=oldCount+1;
    const updatedIngredients={
      ...this.state.ingredients
    };
    updatedIngredients[type]=updatedCount;
    const priceAddition=INGREDIENT_PRICES[type];
    const oldPrice=this.state.totalPrice;
    const newPrice=oldPrice+priceAddition;
    this.setState({
      totalPrice:newPrice, ingredients:updatedIngredients
    })
    this.updatePurchasableState(updatedIngredients);
  }
  removeIngredientHandler=(type)=>{
    const oldCount=this.state.ingredients[type];
    if(oldCount<=0){
      return;
    }
    const updatedCount=oldCount-1;
    const updatedIngredients={
      ...this.state.ingredients
    };
    updatedIngredients[type]=updatedCount;
    const priceDeduction=INGREDIENT_PRICES[type];
    const oldPrice=this.state.totalPrice;
    const newPrice=oldPrice-priceDeduction;
    this.setState({
      totalPrice:newPrice, ingredients:updatedIngredients
    });
    this.updatePurchasableState(updatedIngredients);
  }
  purchaseHandler=()=>{
    this.setState({
      purchasing:true
    })
  }
purchaseCancelHandler=()=>{
  this.setState({
    purchasing:false
  })
}

purchaseContinueHandler=()=>{
  // alert('you continuye');
  const orders={
    ingredients:this.state.ingredients,
    price:this.state.totalPrice,
    customer:{
      name:'sabin',
      address:{
        street:'324',
        zipCode:'23234',
        country:'Áustralia'
      },
      email:'sabin@dsabin.com'
    },
    deliveryMethod:'fastest'
  }
  axios.post('/orders.json',orders)
    .then(response=>console.log(response))
    .catch(error=>console.log(error));
}
  render(){
    const disabledInfo={
      ...this.state.ingredients
    };
    for(let key in disabledInfo){
      disabledInfo[key]=disabledInfo[key]<=0;
    }

    return(
        <Aux>
          <Modal show={this.state.purchasing} modalclosed={this.purchaseCancelHandler}>
          <OrderSummary 
          price={this.state.totalPrice}
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          />
          </Modal>
          <Burger ingredient={this.state.ingredients}/>
          <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          disabled={disabledInfo}
          ordered={this.purchaseHandler}
          />
        </Aux>
      )
  }
}

export default BurgerBuilder;