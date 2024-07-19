import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  visibility: false,
  logedin: false,
  username: null
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
    setUserrName: (state, action) => {
      state.username = action.payload;
    }
  },
});

export const { toggleVis, isLogedIn, isLogedOut,setUserrName } = visSlice.actions;
export default visSlice.reducer;
