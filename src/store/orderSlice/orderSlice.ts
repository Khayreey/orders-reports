/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AddToDB from "../../helpers/AddToDB/AddToDB";







export const createNewOrder = createAsyncThunk(
    "order/create",
     async (information : any, thunkAPI) => {
      return AddToDB(information, thunkAPI);
     }
 );








 const initialState = {
  isWaitingForAddOrder : false 
  
}
const orderSlice = createSlice({
   name : 'order' , 
   initialState ,
   reducers : {
    
   } ,
   extraReducers : (builder)=>{
      
     //start of create order   Done!!!!!!!!!!!!!!!!!!1
     builder.addCase(createNewOrder.pending , (state )=>{
        state.isWaitingForAddOrder = true
     })
     builder.addCase(createNewOrder.fulfilled , (state )=>{
       
       state.isWaitingForAddOrder = false
     })
     builder.addCase(createNewOrder.rejected , (state )=>{
       state.isWaitingForAddOrder = false
       
    })
   //end of create order Done!!!!!!!!!!!!!!!!!!1
 }
})
export default orderSlice
