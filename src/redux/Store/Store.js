import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "../Address/addressSlice"
import authReducer from "../Auth/authSlice"
import productReducer from "../Products/productSlice"
import cartReducer from "../Cart/cartSlice"

const store = configureStore({
    reducer: {
        cart : cartReducer,
        addresses : addressReducer,
        products : productReducer,
        auth : authReducer
    }
})

export default store;