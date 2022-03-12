import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const Initial_State = {
    // user: {                              // OLD
    //     _id: '616d69902752ac5a2f5ee625',
    //     username: "ankur",
    //     email: "anku@gmail.com",
    //     password: "$2b$10$OOgoa16XyG3OX4tdIsm1ZeRhXKTzG463jcEr7QFA0EoIl81Q6q/iK",
    //     ProfilePicture: "profiles/pro7.jpg",
    //     CoverPicture: "",
    //     followers: [],
    //     followeing: ["616d5ee4b5865ce744eeced1"],
    //     isAdmin: false
    // },

    user: {                             // NEW
        _id: '61c857be71d8b3165d8e103d',
        username: "Tushar",
        email: "tushar@gmail.com",
        password: "$2b$10$H8DDWN3E2XHbxFxEQ3rrEesKRyPbznVtQrM1kzR5M7B.wH2NyOaCi",
        ProfilePicture: "profiles/pro7.jpg",
        CoverPicture: "",
        followers: [],
        followeing: ["61c89af4daf4d865ad6c5854", "61cb3a09f6b64290b533111f"],
        isAdmin: false
    },
    // user: null,
    isFetching : false,
    error: false 
}

export const AuthContext = createContext(Initial_State);

export const AuthContextProvider = ({children}) =>{
    const [state, dispetch] = useReducer(AuthReducer, Initial_State);

    return (
        <AuthContext.Provider
        value={{
            user : state.user,
            isFetching : state.isFetching, 
            error : state.error,
            dispetch,
        }}
        >
        {children}
        </AuthContext.Provider>
    )
}
