import React from 'react';
import classes from './Navigationitems.css';
import Navigationitem from './Navigationitem/Navigationitem';

const navigationitems=(props)=>(
  <ul className={classes.Navigationitems}>
      <Navigationitem link="/" active>BurgerBuilder</Navigationitem>
      
      <Navigationitem link='/'>checkout</Navigationitem>
  </ul>
  );

export default navigationitems;