import CartContext from "./cart-context";
import React from "react";

const CartProvider=(props)=>{

const addItemToCartHandler=(item)=>{

};

const removeItemFromCartHandler=(id)=>{

};

const cartContext={
        items:[],
        totalAmount:0,
        addItem:addItemToCartHandler,
        removeItem:removeItemFromCartHandler
    };

return <CartContext.Provider value={cartContext}>
    {props.children}
</CartContext.Provider>
};

export default CartProvider;