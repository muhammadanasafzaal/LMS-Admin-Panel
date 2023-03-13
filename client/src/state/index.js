import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    userId: "63701cc1f03239b7f700000e", //user id in mock data
    isLoggedIn: false
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        },
        isLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        }
    },
})

export const { setMode, isLoggedIn } = globalSlice.actions;

export default globalSlice.reducer;