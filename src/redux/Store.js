import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import addressReducer from "./Address/addressSlice"
import authReducer from "./Auth/authSlice"

const store = configureStore({
    reducer: {
        addresses : addressReducer,
        auth : authReducer
    }
})

export default store;