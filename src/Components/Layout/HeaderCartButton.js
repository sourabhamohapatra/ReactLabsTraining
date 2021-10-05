import React,{useContext} from "react";
import classes from './HeaderCartButton.module.css'
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton=(props)=>{
   const cartCtx= useContext(CartContext);
   const numberOfCartItems=cartCtx.items.reduce((curNumber,Item)=>{
       return curNumber + Item.amount;
   },0)
return(
<button className={classes.button} onClick={props.onClick}>
    <span className={classes.icon}><CartIcon /> </span>
    <span>Your Cart</span>
    <span classname={classes.badge}>3</span>
</button>
);
};

export default HeaderCartButton;