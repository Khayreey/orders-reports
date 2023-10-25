/* eslint-disable @typescript-eslint/no-explicit-any */

import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import AxiosInstance from "../AxiosInstance/AxiosInstance";
import DisplayToast from "../DisplayToast/DisplayToast";

const AddToDB = async (information : any , thunkAPI : GetThunkAPI<any>) => {
    const {   url  , data , token , toastMessage , clearForm } = information;
    const {  rejectWithValue } = thunkAPI;
    console.log(token)
    try {
      const response = await AxiosInstance.post(url , {...data} , {
        //   headers: {
        //      Authorization:
        //      "Bearer " + token
        //   }
      })
      if (response.status === 200 || response.status === 201) {  
        DisplayToast(toastMessage, true)
        clearForm()
        return response.data.data;
      }
    } catch (err : any) {
        const message =   err.response.data.message ? err.response.data.message : 'حاول في وقت لاحق'
      DisplayToast(message , false)
      throw rejectWithValue(err.response.data);
    }
};
export default AddToDB