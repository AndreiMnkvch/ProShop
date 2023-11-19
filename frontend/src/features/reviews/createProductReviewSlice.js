import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";  
import {store} from '../../store'


const initialState = {
    isCreated: false,
    isLoading: false,
    error: null,
};  

export const createProductReview = createAsyncThunk(
    "createProductReview/createProductReview",
    async (review) => {
    const state = store.getState()
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.loginUser.userInfo.access_token}`
        }
    };
    console.log("config:", config)
    const response = await axios.post(
        `/api/v1/reviews/`,
        review,
        config
    );

    return response.data       
});


const createProductReviewSlice = createSlice({
    name: "productReviewCreate",
    initialState,
    reducers: {
        productReviewCreateReset: (state) => {
            state.isCreated = false;
            state.isLoading = false;
            state.error = null;
        } 
    },
    extraReducers(builder) {
        builder
        .addCase(createProductReview.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(createProductReview.fulfilled, (state, action) => {
            state.isCreated = true;
            state.product = action.payload;
            state.isLoading = false;
        })
        .addCase(createProductReview.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

    },
});

export const {productReviewCreateReset} = createProductReviewSlice.actions;
export default createProductReviewSlice.reducer;
