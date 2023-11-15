import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";  
import { useSelector } from "react-redux";
import {store} from '../../store'

const initialState = {
    profileInfo: "",
    isLoading: false,
    error: null,
};  

export const getMyProfileDetails = createAsyncThunk(
    "profileDetails/getMyProfileDetails",
    async (
    ) => {
    const state = store.getState()
    
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.loginUser.userInfo.access_token}`
        }
    };

    const response = await axios.get(`/api/v1/users/${state.loginUser.userInfo.id}`,
        config
    );

    return response.data         
});
export const getProfileDetails = createAsyncThunk(
    "profileDetails/getProfileDetails",
    async (id) => {
    const state = store.getState()
    
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.loginUser.userInfo.access_token}`
        }
    };

    const response = await axios.get(`/api/v1/users/${id}`,
        config
    );

    return response.data         
});


const profileDetailsSlice = createSlice({
    name: "profileDetails",
    initialState,
    reducers: {
        profileDetailsReset: (state) => {
            state.profileInfo = ''
        }
    },
    extraReducers(builder) {
        builder
        .addCase(getMyProfileDetails.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getMyProfileDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.profileInfo = action.payload;
            state.error = null;
        })
        .addCase(getMyProfileDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(getProfileDetails.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getProfileDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.profileInfo = action.payload;
            state.error = null;
        })
        .addCase(getProfileDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    },
});
export const {profileDetailsReset} = profileDetailsSlice.actions;

export default profileDetailsSlice.reducer;
