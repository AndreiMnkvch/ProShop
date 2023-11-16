import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";  
import {store} from '../../store'


const initialState = {
    product: null,
    isCreated: false,
    isLoading: false,
    error: null,
};  

export const createProduct = createAsyncThunk(
    "createProduct/createProduct",
    async () => {
    const state = store.getState()
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.loginUser.userInfo.access_token}`
        }
    };
    const response = await axios.post(
        `/api/v1/products/`,
        // product,
        {},
        config
    );

    return response.data       
});


const productCreateSlice = createSlice({
    name: "productCreate",
    initialState,
    reducers: {
        productCreateReset: (state) => {
            state.product = null;
            state.isCreated = false;
            state.isLoading = false;
            state.error = null;
        } 
    },
    extraReducers(builder) {
        builder
        .addCase(createProduct.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.isCreated = true;
            state.product = action.payload;
            state.isLoading = false;
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

    },
});

export const {productCreateReset} = productCreateSlice.actions;
export default productCreateSlice.reducer;
