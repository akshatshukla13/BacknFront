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
      state.logedin = !state.logedin;
    },
  },
});

export const { toggleVis, isLogedIn } = visSlice.actions;
export default visSlice.reducer;
