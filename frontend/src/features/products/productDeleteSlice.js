import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";  
import {store} from '../../store'


const initialState = {
    isDeleted: false,
    isLoading: false,
    error: null,
};  

export const deleteProduct = createAsyncThunk(
    "deleteProduct/deleteProduct",
    async (id) => {
    const state = store.getState()
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.loginUser.userInfo.access_token}`
        }
    };
    const response = await axios.delete(
        `/api/v1/products/${id}`,
        config
    );

    return response.data       
});


const productDeleteSlice = createSlice({
    name: "productDelete",
    initialState,
    reducers: {
        productDeleteReset: (state) => {
            state.isDeleted = false;
            state.isLoading = false;
            state.error = null;
        } 
    },
    extraReducers(builder) {
        builder
        .addCase(deleteProduct.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.isDeleted = true;
            state.isLoading = false;
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

    },
});

export const {productDeleteReset} = productDeleteSlice.actions;
export default productDeleteSlice.reducer;
