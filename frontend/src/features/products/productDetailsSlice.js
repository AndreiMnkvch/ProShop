import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios' 


const initialState = {
  productDetails: { reviews: [] },
  product: null,
  error: null,
  isLoading: false,
}

const config = {
  headers: {
      "Content-type": "application/json", 
  },
};

export const fetchProductById = createAsyncThunk('products/fetchProductByID', async (id)=> {
    const response = await axios.get(
      `/api/v1/products/${id}`,
      config
      )
    return response.data
  })

const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    extraReducers(builder) {
        builder
          .addCase(fetchProductById.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchProductById.fulfilled, (state, action) => {
            state.product = action.payload;
            state.error =  null;
            state.isLoading = false;
          })
          .addCase(fetchProductById.rejected, (state, action) => {
          state.error = action.error.message;
          })

          }
        })
    
  
export default productDetailsSlice.reducer
