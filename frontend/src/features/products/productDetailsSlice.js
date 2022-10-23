import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios' 


const initialState = {
    productDetails: { reviews: [] },

}

export const fetchProductById = createAsyncThunk('products/fetchProductByID', async (id)=> {

    const response = await axios.get(`/api/products/${id}`)
    return response.data
  })

 const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    extraReducers(builder) {
        builder
          .addCase(fetchProductById.pending, (state, action) => {
            state.productDetails = action.payload
          })
          .addCase(fetchProductById.fulfilled, (state, action) => {
            state.productDetails = action.payload
          })
          }
        })
    
export const getProductDetails = (state) => {
    return state.productDetails
  }
  
export default productDetailsSlice.reducer
