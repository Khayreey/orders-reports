import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice/productSlice";
import shipSlice from "./shipSlice/shipSlice";
import orderSlice from "./orderSlice/orderSlice";
import authSlice from "./authSlice/authSlice";
const store = configureStore({
    reducer : {
       product : productSlice.reducer , 
       ship : shipSlice.reducer  , 
       order : orderSlice.reducer  , 
       auth : authSlice.reducer
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>