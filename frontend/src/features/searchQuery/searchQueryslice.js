import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    query: '',
};  


const searchQuerySlice = createSlice({
    name: "searchQuery",
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload
        },
        resetQuery: (state) => {
            state.query = '';
        },
}})
export const {setQuery, resetQuery} = searchQuerySlice.actions;
export default searchQuerySlice.reducer;
