import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  visibility: false,
};

export const visSlice = createSlice({
  name: "isVisible",
  initialState,
  reducers: {
    toggleVis: (state, action) => {
      state.visibility = !state.visibility;
    },
  },
});

export const { toggleVis } = visSlice.actions;
export default visSlice.reducer;
