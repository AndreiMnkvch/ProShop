import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";  
import {store} from '../../store'


const initialState = {
    updatedProfileInfo: "",
    isUpdating: false,
    error: null,
    isUpdated: false,
};  

export const updateProfileDetailsByAdmin = createAsyncThunk(
    "updateProfileByAdmin/update",
    async (
        data,
    ) => {
    const state = store.getState()
    const profileId = data.id
    

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.loginUser.userInfo.access_token}`
        }
    };
    const response = await axios.patch(
        `/api/v1/users/${profileId}/`,
        data,    
        config
    );

    return response.data       
});


const updateProfileByAdminSlice = createSlice({
    name: "updateProfileByAdmin",
    initialState,
    reducers: {
        updateProfileByAdminReset: (state) => {
            state.updatedProfileInfo = ''
            state.isUpdated = false;
            state.isUpdating = false;
        } 
    },
    extraReducers(builder) {
        builder
        .addCase(updateProfileDetailsByAdmin.pending, (state, action) => {
            state.isUpdating = true;
        })
        .addCase(updateProfileDetailsByAdmin.fulfilled, (state, action) => {
            state.isUpdating = false;
            state.isUpdated = true;
            state.updatedProfileInfo = action.payload;
        })
        .addCase(updateProfileDetailsByAdmin.rejected, (state, action) => {
            state.isUpdating = false;
            state.error = action.error.message;
        })

    },
});

export const {updateProfileByAdminReset} = updateProfileByAdminSlice.actions;

export default updateProfileByAdminSlice.reducer;
