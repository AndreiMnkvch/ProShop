import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {store} from '../../store'
import { clearCart } from '../cart/cartSlice'


const initialState = {
    order: '',
    isLoading: false,
    isCreated: false,
    error: null,
}

const orderCreateSlice = createSlice({
    name: 'orderCreate', 
    initialState,
    reducers:{
        clearOrderCreate: (state) => { 
            state.isCreated = false;
            state.error = null;
        }  
    },    

    extraReducers(builder) {
        builder
        .addCase(createOrder.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.order = action.payload;
            state.isCreated = true;
            state.error = null;
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }})

export default orderCreateSlice.reducer;
export const { clearOrderCreate } = orderCreateSlice.actions;

export const createOrder = createAsyncThunk(
    'orderCreate/createOrder',
    async(
        order, thunkAPI
        ) => {
        const state = store.getState()
        const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.loginUser.userInfo.access_token}`
        }
    };
    console.log("order to place is: ", order, "config:", config)
            const res = await axios.post(
                "/api/v1/orders/",
                order,
                config
            );
            if (res.data){
                thunkAPI.dispatch(clearCart())}
            return res.data
})
