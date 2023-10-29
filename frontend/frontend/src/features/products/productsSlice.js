import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from'axios' 


const initialState = {
    products: [],
    isLoading: true,
    error: null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ()=> {

    const response = await axios.get('/api/products/')
    return response.data
})



 const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers(builder) {
        builder
          .addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true;
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message
          })
          }
        })
    

export default productsSlice.reducer
