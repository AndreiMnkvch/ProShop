import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";  
import { login } from "../loginUser/loginUserSlice";

const initialState = {
    userInfo: "",
    isLoading: false,
    error: null,
};  

export const register = createAsyncThunk(
    "registerUser/register",
    async (
        data,
        thunkAPI
    ) => {


    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };

    const response = await axios.post(
        "/api/v1/users/",
        { username: data.username, password: data.password, email: data.email },
        config
    );

    thunkAPI.dispatch(login(data))
    return response.data
});

const registerUserSlice = createSlice({
    name: "registerUser",
    initialState,
    extraReducers(builder) {
        builder
        .addCase(register.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userInfo = action.payload;
            state.error = null;
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    },
});

export default registerUserSlice.reducer;
