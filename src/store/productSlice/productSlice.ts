/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GetFromDB from "../../helpers/GetFromDB/GetFromDB";
import AddToDB from "../../helpers/AddToDB/AddToDB";
import DeleteFromDB from "../../helpers/DeleteFromDB/DeleteFromDB";
import UpdateDB from "../../helpers/UpdateDB/UpdateDB";




export const getAllProducts = createAsyncThunk(
   "product/all",
    async (information, thunkAPI) => {
     return GetFromDB(information, thunkAPI);
    }
);

export const createNewProduct = createAsyncThunk(
    "product/createOrder",
     async (information, thunkAPI) => {
      return AddToDB(information, thunkAPI);
     }
 );

 export const deleteProduct = createAsyncThunk(
    "product/deleteOrder",
     async (information, thunkAPI) => {
      return DeleteFromDB(information, thunkAPI);
     }
 );

 export const updateProduct = createAsyncThunk(
    "product/updateProduct",
     async (information, thunkAPI) => {
      return UpdateDB(information, thunkAPI);
     }
 );

 const initialState = {
   productsDB : [] , 
   isWaitingForGetProducts : false , 
   errorMessageInGet : "" ,
   errorMessage : undefined ,
   errorField : '' , 
   isProductsRequireRender : false , 
   isWaitingForAddOrder : false , 
}
const productSlice = createSlice({
   name : 'product' , 
   initialState ,
   reducers : {
      resetError(state ) {
         state.errorMessage = undefined
      }
   } ,
   
   extraReducers : (builder)=>{
       //start of get All products
       builder.addCase(getAllProducts.pending , (state )=>{
          state.isWaitingForGetProducts = true
       })
       builder.addCase(getAllProducts.fulfilled , (state , action)=>{
         state.productsDB = action.payload
         state.isWaitingForGetProducts = false
       })
       builder.addCase(getAllProducts.rejected , (state , action : any)=>{
         state.isWaitingForGetProducts = false
         state.errorMessageInGet = action.payload.message 
      })
     //end of get All products
    
     //start of create product
       builder.addCase(createNewProduct.pending , (state)=>{
         state.isWaitingForAddOrder = true
     })
     builder.addCase(createNewProduct.fulfilled , (state)=>{
        state.isWaitingForAddOrder = false
        state.isProductsRequireRender = !state.isProductsRequireRender
     })
     builder.addCase(createNewProduct.rejected , (state , action : any)=>{
        state.isWaitingForAddOrder = false
        state.errorField = action.payload.field
        state.errorMessage =   action.payload.message

    })
    //end of create product

     //start of delete product
     builder.addCase(deleteProduct.pending , (state , action)=>{
        console.log(state , action)
     })
     builder.addCase(deleteProduct.fulfilled , (state , action)=>{
      console.log(state , action)
     })
     builder.addCase(deleteProduct.rejected , (state , action)=>{
      console.log(state , action)
    })
    //end of delete product

     //start of update product
    
    //end of update product
 }
})
export default productSlice
export const productActions = productSlice.actions