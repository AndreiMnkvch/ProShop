import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {store} from '../../store'


const initialState = {
    isDelivered: null,
    isLoading: false,
    error: null,
}

const orderDeliverSlice = createSlice({
    name: 'orderDeliver', 
    initialState,
    reducers:{
        clearOrderDeliver: (state) => {
            state.isDelivered = null;
            state.isLoading = false;
            state.error = null;
        }  
    },    
    extraReducers(builder) {
        builder
        .addCase(deliverOrder.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(deliverOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isDelivered = true;
            state.error = null;
        })
        .addCase(deliverOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }})

export default orderDeliverSlice.reducer;
export const {clearOrderDeliver} = orderDeliverSlice.actions;


export const deliverOrder = createAsyncThunk(
    'orderDeliver/deliverOrder',
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
                `/api/v1/orders/${orderId}/deliver/`,
                {}, 
                config
            );
            return res.data
})
