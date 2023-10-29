import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice/productSlice";
import shipSlice from "./shipSlice/shipSlice";

const store = configureStore({
    reducer : {
       product : productSlice.reducer , 
       ship : shipSlice.reducer    
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>