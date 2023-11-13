import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {store} from '../../store'


const initialState = {
    orders: [],
    isLoading: false,
    error: null,
}

const ordersListMySlice = createSlice({
    name: 'ordersList', 
    initialState,
    reducers:{
        clearOrdersListMy: (state) => {
            state.orders = [];         
            state.isLoading = false;
            state.error = null;    
        }  
    },    
    extraReducers(builder) {
        builder
        .addCase(getOrdersMy.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getOrdersMy.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
        })
        .addCase(getOrdersMy.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }})

export default ordersListMySlice.reducer;
export const {clearOrdersListMy} = ordersListMySlice.actions;


export const getOrdersMy = createAsyncThunk(
    'ordersListMy/getOrdersList',
    async() => {
            const state = store.getState()
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${state.loginUser.userInfo.access_token}`
        }};

            const res = await axios.get(
                "/api/v1/orders/",
                config
            );
            return res.data
})
