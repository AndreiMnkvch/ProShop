import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    userInfo: "",
    isSigningIn: false,
    error: null,
};  

export const login = createAsyncThunk("loginUser/login", async (data) => {

    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    const response = await axios.post(
        "/api/v1/users/login/",
        { username: data.username, password: data.password },
        config
    );

    return response.data;
});

const loginUserSlice = createSlice({
    name: "loginUser",
    initialState,
    reducers:{
        logout: (state) => { 
            state.userInfo = '';
            state.error = null;
        }  
    },
    extraReducers(builder) {
        builder
        .addCase(login.pending, (state, action) => {
            state.isSigningIn = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isSigningIn = false;
            state.userInfo = action.payload;
            state.error = null;
        })
        .addCase(login.rejected, (state, action) => {
            state.isSigningIn = false;
            state.error = action.error.message;
        })
    },
});
export const {logout} = loginUserSlice.actions;
export default loginUserSlice.reducer;
