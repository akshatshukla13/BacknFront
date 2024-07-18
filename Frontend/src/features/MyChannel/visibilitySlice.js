import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  visibility: false,
  logedin: false,
};

export const visSlice = createSlice({
  name: "isVisible",
  initialState,
  reducers: {
    toggleVis: (state, action) => {
      state.visibility = !state.visibility;
    },
    isLogedIn: (state, action) => {
      state.logedin = true;
    },
    isLogedOut: (state, action) => {
      state.logedin = false;
    },
  },
});

export const { toggleVis, isLogedIn, isLogedOut } = visSlice.actions;
export default visSlice.reducer;
