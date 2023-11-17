import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {store} from '../../store'


const initialState = {
    orders: [],
    isLoading: false,
    error: null,
}

const ordersListAdminSlice = createSlice({
    name: 'ordersListAdmin', 
    initialState,
    reducers:{
        clearOrdersListAdmin: (state) => {
            state.orders = null;         
            state.isLoading = false;
            state.error = null;    
        }  
    },    
    extraReducers(builder) {
        builder
        .addCase(getOrdersAdmin.pending, (state) => {
            console.log("pending")
            state.isLoading = true;
        })
        .addCase(getOrdersAdmin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
        })
        .addCase(getOrdersAdmin.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }})

export default ordersListAdminSlice.reducer;
export const {clearOrdersListAdmin} = ordersListAdminSlice.actions;


export const getOrdersAdmin = createAsyncThunk(
    'ordersListAdmin/getOrdersAdmin',
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
