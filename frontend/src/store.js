import { configureStore} from '@reduxjs/toolkit'
import productsReducer from './features/products/productsSlice'
import productDetailsReducer from './features/products/productDetailsSlice'




export default configureStore({
    reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    },
});



// initialState,composeWithDevTools(applyMiddleware(...middleware)