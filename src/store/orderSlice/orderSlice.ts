/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AddToDB from "../../helpers/AddToDB/AddToDB";
import GetFromDB from "../../helpers/GetFromDB/GetFromDB";
import UpdateDB from "../../helpers/UpdateDB/UpdateDB";
import DeleteFromDB from "../../helpers/DeleteFromDB/DeleteFromDB";

export const createNewOrder = createAsyncThunk(
    "order/create",
     async (information : any, thunkAPI) => {
      return AddToDB(information, thunkAPI);
     }
 );

 export const getAllPendingOrders = createAsyncThunk(
  "order/getPending",
   async (information : any, thunkAPI) => {
    return GetFromDB(information, thunkAPI);
   }
);

export const updateOrderProducts = createAsyncThunk(
  "order/updateProducts",
   async (information : any, thunkAPI) => {
    return UpdateDB(information, thunkAPI);
   }
);

export const updateOrdersToRun = createAsyncThunk(
  "order/runOrders",
  async (information : any, thunkAPI) => {
   return AddToDB(information, thunkAPI);
  }
)


export const geOrdersCount = createAsyncThunk(
  "order/count",
  async (information : any, thunkAPI) => {
   return GetFromDB(information, thunkAPI);
  }
)

export const deletePendingOrder = createAsyncThunk(
  "order/delete",
   async (information : any, thunkAPI) => {
    return DeleteFromDB(information, thunkAPI);
   }
);

 const initialState = {
  isWaitingForAddOrder : false , 
  pendingOrders : [] , 
  isWaitingForGetPendingOrders : false , 
  isPendingOrdersRequireRender : false , 
  isErrorInGetPendingOrders : '' || undefined , 
  isRequireRender : false , 
  isWaitingForUpdateOrder : false ,
  isWaitingForRunOrders : false , 
  isWaitingForGetCount : false , 
  counts : {} , 
  isWaitingForDeleteOrder : false
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
    
   //start of get pending orders   Done!!!!!!!!!!!!!!!!!!1
     builder.addCase(getAllPendingOrders.pending , (state )=>{
        state.isWaitingForGetPendingOrders = true
     })
     builder.addCase(getAllPendingOrders.fulfilled , (state , action)=>{
       state.pendingOrders = action.payload 
       state.isWaitingForGetPendingOrders = false
     })
     builder.addCase(getAllPendingOrders.rejected , (state )=>{
       state.isWaitingForGetPendingOrders = false
    })
   //end of get pending orders Done!!!!!!!!!!!!!!!!!!1

   //start of get update  orders products  Done!!!!!!!!!!!!!!!!!!1
 builder.addCase(updateOrdersToRun.pending , (state )=>{
  state.isWaitingForRunOrders = true
 })
 builder.addCase(updateOrdersToRun.fulfilled , (state )=>{ 
   state.isWaitingForRunOrders = false
   state.isPendingOrdersRequireRender = !state.isPendingOrdersRequireRender
 })
 builder.addCase(updateOrdersToRun.rejected , (state )=>{
   state.isWaitingForRunOrders = false
   state.isPendingOrdersRequireRender = !state.isPendingOrdersRequireRender
  })
//end of  update orders products Done!!!!!!!!!!!!!!!!!!1

 //start of run orders  Done!!!!!!!!!!!!!!!!!!1
 builder.addCase(updateOrderProducts.pending , (state )=>{
  state.isWaitingForUpdateOrder = true
 })
 builder.addCase(updateOrderProducts.fulfilled , (state )=>{ 
   state.isWaitingForUpdateOrder = false
   state.isPendingOrdersRequireRender = !state.isPendingOrdersRequireRender
 })
 builder.addCase(updateOrderProducts.rejected , (state )=>{
   state.isWaitingForUpdateOrder = false
   state.isPendingOrdersRequireRender = !state.isPendingOrdersRequireRender
  })
//end of  run orders Done!!!!!!!!!!!!!!!!!!1

//start of count  Done!!!!!!!!!!!!!!!!!!1
builder.addCase(geOrdersCount.pending , (state )=>{
  state.isWaitingForGetCount = true
 })
 builder.addCase(geOrdersCount.fulfilled , (state , action)=>{ 
   state.isWaitingForGetCount = false
   state.counts = action.payload
 })
 builder.addCase(geOrdersCount.rejected , (state )=>{
   state.isWaitingForGetCount = false
  
  })
  
//end of  run orders Done!!!!!!!!!!!!!!!!!!1
//start of count  Done!!!!!!!!!!!!!!!!!!1
builder.addCase(deletePendingOrder.pending , (state )=>{
  state.isWaitingForDeleteOrder = true
 })
 builder.addCase(deletePendingOrder.fulfilled , (state )=>{ 
   state.isWaitingForDeleteOrder = false
   state.isPendingOrdersRequireRender = ! state.isPendingOrdersRequireRender
 })
 builder.addCase(deletePendingOrder.rejected , (state )=>{
   state.isWaitingForDeleteOrder = false
  
  })
  
//end of  run orders Done!!!!!!!!!!!!!!!!!!1
   
 }
})
export default orderSlice
