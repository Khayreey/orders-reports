/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GetFromDB from "../../helpers/GetFromDB/GetFromDB";
import AddToDB from "../../helpers/AddToDB/AddToDB";
import DeleteFromDB from "../../helpers/DeleteFromDB/DeleteFromDB";
import UpdateDB from "../../helpers/UpdateDB/UpdateDB";




export const getAllShips = createAsyncThunk(
   "ship/all",
    async (information : any, thunkAPI) => {
     return GetFromDB(information, thunkAPI);
    }
);

export const createNewShip = createAsyncThunk(
    "ship/create",
     async (information : any, thunkAPI) => {
      return AddToDB(information, thunkAPI);
     }
 );

 export const deleteShip = createAsyncThunk(
    "ship/delete",
     async (information : any, thunkAPI) => {
      return DeleteFromDB(information, thunkAPI);
     }
 );


 export const updateShip = createAsyncThunk(
   "ship/update",
    async (information : any, thunkAPI) => {
     return UpdateDB(information, thunkAPI);
    }
);

 const initialState = {
   ships : [] , 
   isWaitingForShips : false , 
   errorMessageInGetShips : "" ,
   errorMessage : undefined ,
   isShipsRequireRender : false , 
   isWaitingForAddShip : false , 
   isWaitingForDeleteShip : false , 
   isWaitingForUpdateShip : false , 
   isErrorInUpdateShip : false
}
const shipSlice = createSlice({
   name : 'ship' , 
   initialState ,
   reducers : {
      resetError(state ) {
         state.errorMessage = undefined
      }
   } ,
   extraReducers : (builder)=>{
       //start of get All ships   Done!!!!!!!!!!!!!!!!!!1
       builder.addCase(getAllShips.pending , (state )=>{
          state.isWaitingForShips = true
       })
       builder.addCase(getAllShips.fulfilled , (state , action)=>{
         state.ships = action.payload
         state.isWaitingForShips = false
       })
       builder.addCase(getAllShips.rejected , (state , action : any)=>{
         state.isWaitingForShips = false
         state.errorMessageInGetShips = action.payload.message 
      })
     //end of get All ships Done!!!!!!!!!!!!!!!!!!1
    
     //start of create ship  Done!!!!!!!!!!!!!!!!!!1
      builder.addCase(createNewShip.pending , (state )=>{
        state.isWaitingForAddShip = true
     })
     builder.addCase(createNewShip.fulfilled , (state )=>{
        state.isWaitingForAddShip = false
        state.isShipsRequireRender = !state.isShipsRequireRender
     })
     builder.addCase(createNewShip.rejected , (state , action : any)=>{
        state.isWaitingForAddShip = false
        state.errorMessage =   action.payload.message
    })
   //end of of create ship Done!!!!!!!!!!!!!!!!!!1
   //start of  delete  Done!!!!!!!!!!!!!!!!!!1
    builder.addCase(deleteShip.pending , (state )=>{
        state.isWaitingForShips = true
        state.isWaitingForDeleteShip = true
     })
     builder.addCase(deleteShip.fulfilled , (state )=>{
        state.isWaitingForShips = false
        state.isWaitingForDeleteShip = false
        state.isShipsRequireRender = !state.isShipsRequireRender
     })
     builder.addCase(deleteShip.rejected , (state )=>{
        state.isWaitingForShips = false
        state.isWaitingForDeleteShip = false

    })
   //end of of  delete  Done!!!!!!!!!!!!!!!!!!1
    //start of update 
     builder.addCase(updateShip.pending , (state )=>{
      state.isWaitingForShips = true
      state.isWaitingForUpdateShip = true 
      state.isErrorInUpdateShip = false
     })
     builder.addCase(updateShip.fulfilled , (state)=>{
      state.isWaitingForShips = false
      state.isWaitingForUpdateShip = false 
      state.isShipsRequireRender = !state.isShipsRequireRender 
     })
     builder.addCase(updateShip.rejected , (state )=>{
      state.isWaitingForShips = false
      state.isErrorInUpdateShip = true
    })
   //end of update
 }
})
export default shipSlice
export const shipActions = shipSlice.actions