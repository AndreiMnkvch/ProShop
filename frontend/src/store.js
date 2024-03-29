import { configureStore} from '@reduxjs/toolkit'
import productsReducer from './features/products/productsSlice'
import cartReducer from './features/cart/cartSlice'
import registerUserReducer from './features/registerUser/registerUserSlice'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"
import loginUserReducer from "./features/loginUser/loginUserSlice"
import profileDetailsReducer from "./features/profileDetails/profileDetailsSlice"
import updateProfileDetailsReducer from "./features/updateProfileDetails/updateProfileDetailsSlice"
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
    cart: cartReducer,
    loginUser: loginUserReducer,
    registerUser: registerUserReducer,
    profileDetails: profileDetailsReducer,
    updateProfileDetails: updateProfileDetailsReducer,
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

