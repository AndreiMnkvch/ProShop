import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {store} from '../../store'


const initialState = {
    order: '',
    isLoading: false,
    error: null,
}

const orderDetailsSlice = createSlice({
    name: 'orderDetails', 
    initialState,
    extraReducers(builder) {
        builder
        .addCase(getOrderDetails.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getOrderDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.order = action.payload;
            state.error = null;
        })
        .addCase(getOrderDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }})

export default orderDetailsSlice.reducer;

export const getOrderDetails = createAsyncThunk(
    'orderDetails/getOrderDetails',
    async(
        orderId
        ) => {
            const state = store.getState()
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${state.loginUser.userInfo.access_token}`
        }
    };
            const res = await axios.get(
                `/api/v1/orders/${orderId}`,
                config
            );
            return res.data
})
