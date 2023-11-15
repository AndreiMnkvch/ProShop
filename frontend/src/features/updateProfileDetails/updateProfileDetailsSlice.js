import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";  
import {store} from '../../store'


const initialState = {
    updatedProfileInfo: "",
    isUpdating: false,
    error: null,
    isUpdated: ''
};  

export const updateMyProfile = createAsyncThunk(
    "updateProfileDetails/update",
    async (
        data,
    ) => {
    const state = store.getState()
    

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.loginUser.userInfo.access_token}`
        }
    };
    const response = await axios.patch(
        `/api/v1/users/${state.loginUser.userInfo.id}/`,
        data,    
        config
    );

    return response.data       
});


const updateProfileDetailsSlice = createSlice({
    name: "updateProfileDetails",
    initialState,
    reducers: {
        updateProfileReset: (state) => {
            state.updatedProfileInfo = ''
            state.isUpdated = false;
            state.isUpdating = false;
        } 
    },
    extraReducers(builder) {
        builder
        .addCase(updateMyProfile.pending, (state, action) => {
            state.isUpdating = true;
        })
        .addCase(updateMyProfile.fulfilled, (state, action) => {
            state.isUpdating = false;
            state.isUpdated = true;
            state.updatedProfileInfo = action.payload;
        })
        .addCase(updateMyProfile.rejected, (state, action) => {
            state.isUpdating = false;
            state.error = action.error.message;
        })
    },
});

export const {updateProfileReset} = updateProfileDetailsSlice.actions;

export default updateProfileDetailsSlice.reducer;
