/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import AxiosInstance from "../AxiosInstance/AxiosInstance";
import DisplayToast from "../DisplayToast/DisplayToast";


const GetFromDB = async (information : any , thunkAPI : GetThunkAPI<any>) => {
    const { url , id , token } = information;
    const URL = id ? `${url}/${id}` : url
    const {rejectWithValue} = thunkAPI 
    try {
      const response = await AxiosInstance.get(URL , {
        headers : token ? {
          Authorization: "Bearer " + token,
        } : {}
      });
      if (response.status === 200 || response.status === 201) {  
        return response.data.data;
      }
      else {
        console.log(response.data)
      }
      
    } catch (err : any) {
        const message =   err.response.data.message ? err.response.data.message : 'حاول في وقت لاحق'
        DisplayToast(message , false)
        throw rejectWithValue(err.response.data);
    }
};

export default GetFromDB