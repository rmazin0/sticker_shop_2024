import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const cartContext = createContext()

export const CartProvider = (props) => {
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    

    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then((res) => {
            setProducts(res.data)
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

    const getSubTotalAmount = () => {
        let subTotalAmount = 0;
        for (const item in cartItems) {
            console.log(cartItems[item]);
            if (cartItems[item]>0) {
                let itemInfo = products.find((product) => product._id === (item))
                console.log(itemInfo);
                subTotalAmount += cartItems[item] * itemInfo.productPrice
            }
        }
        return subTotalAmount;
    };

    const cartQuantity = Object.values(cartItems).reduce((quantity, items) => quantity + items,0)

    return (
        <cartContext.Provider value={{cartItems, setCartItems, cartQuantity, getSubTotalAmount }}>
            {props.children}
        </cartContext.Provider>
    )
}