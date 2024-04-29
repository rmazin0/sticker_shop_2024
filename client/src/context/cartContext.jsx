import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const cartContext = createContext()

export const CartProvider = (props) => {
    const [cartItems, setCartItems] = useState({})

    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then((res) => {
            let cart = {}
            for (let i = 0; i< res.data.length; i++) {
                cart[res.data[i]._id] = 0
            }
            setCartItems(cart)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const cartQuantity = Object.values(cartItems).reduce((quantity, items) => quantity + items,0)

    return (
        <cartContext.Provider value={{cartItems, setCartItems, cartQuantity}}>
            {props.children}
        </cartContext.Provider>
    )
}