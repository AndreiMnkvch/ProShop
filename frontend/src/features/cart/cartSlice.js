import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    cartItems: [],
    isLoading: true,
    error: null,
    shippingAddress: {},
    paymentMethod: ''
}

const cartSlice = createSlice({
    name: 'cart', 
    initialState,
    reducers: {
        addItem: {
            reducer(state, action) {
                const item = action.payload;
                const existItem = state.cartItems.find( x => x.product === item.product);

                if (existItem) {
                    return {
                        ...state,
                        cartItems: state.cartItems.map( x => 
                            x.product === existItem.product
                            ? item: x)
                    }
                } else {
                    return {
                        ...state,
                        cartItems: [...state.cartItems, item] 
                    }}

                }, 
            prepare: (data) => ({
                payload: {
                    qty: data.qty,
                    product: data.id,
                    name: data.name,
                    image: data.image,
                    price: data.price,
                    countInStock: data.countInStock
            }
        })
        },
        removeItem: {
            reducer(state, action){
                return {
                    ...state,
                    cartItems: state.cartItems.filter(x=> x.product !== action.payload ) 
                }
            }
        },
        saveShippingInfo: {
            reducer(state, action){
                return {
                    ...state,
                    shippingAddress: action.payload
                }
            }
        },
        savePaymentMethod: {
            reducer(state, action){
                return {
                    ...state,
                    paymentMethod: action.payload,
                }
            }
        }
    },
    extraReducers(builder) {
        builder
        .addCase(addToCart.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
});
export default cartSlice.reducer;
export const {addItem, removeItem, saveShippingInfo, savePaymentMethod} = cartSlice.actions;

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async(
            {productId, qty},
            thunkAPI
        ) => {
        const res = await axios.get(`/api/v1/products/${productId}`);
        const data = await res.data;
        if (data){
            const dataWithQuantity = {...data, qty} 
            thunkAPI.dispatch(addItem(dataWithQuantity))}
})
