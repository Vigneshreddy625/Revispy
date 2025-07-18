import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "../Address/addressSlice"
import authReducer from "../Auth/authSlice"
import productReducer from "../Products/productSlice"
import cartReducer from "../Cart/cartSlice"
import couponReducer from "../Coupon/couponSlice"

const store = configureStore({
    reducer: {
        cart : cartReducer,
        coupon : couponReducer,
        addresses : addressReducer,
        products : productReducer,
        auth : authReducer
    }
})

export default store;