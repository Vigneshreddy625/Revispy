import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "../Address/addressSlice"
import authReducer from "../Auth/authSlice"
import productReducer from "../Products/productSlice"

const store = configureStore({
    reducer: {
        addresses : addressReducer,
        products : productReducer,
        auth : authReducer
    }
})

export default store;