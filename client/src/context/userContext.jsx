import { createContext, useState } from "react";

export const userContext = createContext() //creates the context

//provides context to the rest of the app.
export const UserProvider = (props) => {
    const [user, setUser] = useState({}) 
    // stores a user id in local storage of website
    const setIdInLocal = (id) => {
        window.localStorage.setItem('uuid', id)
    }
    return (
        // value is us passing user state, ln7 as props
        <userContext.Provider value={{user, setUser, setIdInLocal}}> 
            {props.children} {/* this line is saying render the children component that userContext.Provider is wrapped around*/}
        </userContext.Provider>
    )
}