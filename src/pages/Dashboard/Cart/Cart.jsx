import React from 'react';
import useCart from '../../../hooks/useCart';

const Cart = () => {
    const [cart] = useCart();
    const totalPrice = cart.reduce((accumulator,currentItem)=>accumulator+currentItem.price,0)
    return (
        <div>
            <h3>total Item:{cart.length}</h3>
            <h3>total Price:{totalPrice}</h3>
        </div>
    );
};

export default Cart;