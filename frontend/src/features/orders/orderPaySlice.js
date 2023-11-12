import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {store} from '../../store'


const initialState = {
    success: null,
    isLoading: false,
    error: null,
}

const orderPaySlice = createSlice({
    name: 'orderPay', 
    initialState,
    reducers:{
        clearOrderPay: (state) => {
            state.success = null;
            state.isLoading = false;
            state.error = null;
        }  
    },    
    extraReducers(builder) {
        builder
        .addCase(payOrder.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(payOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.success = true;
            state.error = null;
        })
        .addCase(payOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }})

export default orderPaySlice.reducer;
export const {clearOrderPay} = orderPaySlice.actions;


export const payOrder = createAsyncThunk(
    'orderPay/payOrder',
    async(
        orderId
        ) => {
            const state = store.getState()
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${state.loginUser.userInfo.access_token}`
        }};

            const res = await axios.patch(
                `/api/v1/orders/${orderId}/pay/`,
                {}, 
                config
            );
            return res.data
})
