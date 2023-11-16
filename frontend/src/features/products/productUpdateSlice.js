import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";  
import {store} from '../../store'


const initialState = {
    updatedProduct: null,
    isUpdating: false,
    error: null,
    isUpdated: false
};  

export const updateProduct = createAsyncThunk(
    "updateProduct/updateProduct",
    async (
        product,
    ) => {
    const state = store.getState()
    const productId = product.id
    

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.loginUser.userInfo.access_token}`
        }
    };
    const response = await axios.patch(
        `/api/v1/products/${productId}/`,
        product,    
        config
    );

    return response.data       
});


const updateProductSlice = createSlice({
    name: "updateProduct",
    initialState,
    reducers: {
        updateProductReset: (state) => {
            state.updatedProduct = ''
            state.isUpdated = false;
            state.isUpdating = false;
        } 
    },
    extraReducers(builder) {
        builder
        .addCase(updateProduct.pending, (state, action) => {
            state.isUpdating = true;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.isUpdating = false;
            state.isUpdated = true;
            state.updatedProduct = action.payload;
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.isUpdating = false;
            state.error = action.error.message;
        })
    },
});

export const {updateProductReset} = updateProductSlice.actions;

export default updateProductSlice.reducer;
