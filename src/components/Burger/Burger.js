import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './Burgeringredient/Burgeringredient';

const burger=(props)=>{
  let transfermedIngredients=Object.keys(props.ingredient)
      .map(igkey=>{
        return [...Array(props.ingredient[igkey])].map((_,i)=>{
         return <BurgerIngredient key={igkey+i} type={igkey}/>
        }); //[,]
      })
      .reduce((arr,el)=>{
        return arr.concat(el);
      });
      if(transfermedIngredients.length===0){
        transfermedIngredients=<p> please start adding ingredient </p>
      }
  return (
      <div className={classes.Burger}>
        <BurgerIngredient type="bread-top"/>
        {transfermedIngredients}

        <BurgerIngredient type="bread-bottom"/>
      </div>
    );
};
export default burger;