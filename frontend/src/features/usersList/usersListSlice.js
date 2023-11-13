import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";  
import {store} from '../../store'


const initialState = {
    users: [],
    isLoading: false,
    error: null,
};  

export const getUsersList = createAsyncThunk(
    "usersList/getUsersList",
    async () => {
    const state = store.getState()
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.loginUser.userInfo.access_token}`
        }
    };
    const response = await axios.get(
        `/api/v1/users/`,
        config
    );

    return response.data       
});


const usersListSlice = createSlice({
    name: "usersList",
    initialState,
    reducers: {
        usersListReset: (state) => {
            state = initialState;
        } 
    },
    extraReducers(builder) {
        builder
        .addCase(getUsersList.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getUsersList.fulfilled, (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
        })
        .addCase(getUsersList.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })

    },
});

export const {usersListReset} = usersListSlice.actions;
export default usersListSlice.reducer;
