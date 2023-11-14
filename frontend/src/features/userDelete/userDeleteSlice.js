import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";  
import {store} from '../../store'


const initialState = {
    isDeleted: false,
    isLoading: false,
    error: null,
};  

export const deleteUser = createAsyncThunk(
    "userDelete/deleteUser",
    async (id) => {
    const state = store.getState()
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.loginUser.userInfo.access_token}`
        }
    };
    const response = await axios.delete(
        `/api/v1/users/${id}`,
        config
    );

    return response.data       
});


const userDeleteSlice = createSlice({
    name: "userDelete",
    initialState,
    reducers: {
        userDeleteReset: (state) => {
            state = initialState;
        } 
    },
    extraReducers(builder) {
        builder
        .addCase(deleteUser.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.isDeleted = true;
            state.isLoading = false;
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

    },
});

export const {userDeleteReset} = userDeleteSlice.actions;
export default userDeleteSlice.reducer;
