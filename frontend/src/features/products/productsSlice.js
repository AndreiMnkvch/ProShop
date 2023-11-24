import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from'axios' 


const initialState = {
    products: [],
    isFulfilled: false,
    isLoading: false,
    error: null,
    lastPage: null,
    currentPage: null,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers(builder) {
        builder
        .addCase(fetchProducts.pending, (state, action) => {
        state.isLoading = true;
        console.log("pending")
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFulfilled = true;
        state.lastPage = action.payload.lastPage;
        state.currentPage = action.payload.current;
        state.products = action.payload.results;
        state.error = null;
        console.log("fullfilled")
    })
    .addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.isFulfilled = false;
            console.log("error")
        })
        }
            })
    
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params) => {
        console.log("fetch products: ")
    const response = await axios.get(`/api/v1/products`, { params })
    return response.data
})

export default productsSlice.reducer;
