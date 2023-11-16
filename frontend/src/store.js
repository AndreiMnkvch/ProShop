import { configureStore} from '@reduxjs/toolkit'
import productsReducer from './features/products/productsSlice'
import cartReducer from './features/cart/cartSlice'
import registerUserReducer from './features/registerUser/registerUserSlice'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"
import loginUserReducer from "./features/loginUser/loginUserSlice"
import profileDetailsReducer from "./features/profileDetails/profileDetailsSlice"
import updateProfileDetailsReducer from "./features/updateProfileDetails/updateProfileDetailsSlice"
import updateProfileByAdminReducer from "./features/updateProfileDetailsAdmin/updateProfileDetailsAdminSlice"
import orderCreateReducer from "./features/orders/orderCreateSlice"
import orderDetailsReducer from "./features/orders/orderDetailsSlice"
import orderPayReducer from "./features/orders/orderPaySlice"
import ordersListReducer from "./features/orders/ordersListMySlice"
import usersListReducer from "./features/usersList/usersListSlice"
import userDeleteReducer from "./features/userDelete/userDeleteSlice"
import productDeleteReducer from "./features/products/productDeleteSlice"
import productCreateReducer from "./features/products/productCreateSlice"
import updateProductReducer from "./features/products/productUpdateSlice"
import productDetailsReducer from "./features/products/productDetailsSlice"
import { 
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER 
} from 'redux-persist'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'loginUser']
}

const rootReducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    loginUser: loginUserReducer,
    registerUser: registerUserReducer,
    profileDetails: profileDetailsReducer,
    updateProfileDetails: updateProfileDetailsReducer,
    updateProfileByAdmin: updateProfileByAdminReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    ordersList: ordersListReducer,
    usersList: usersListReducer,
    userDelete: userDeleteReducer,
    productDelete: productDeleteReducer,
    updateProduct: updateProductReducer,
    productCreate: productCreateReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


export const persistor = persistStore(store);

