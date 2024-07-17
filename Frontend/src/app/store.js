import { configureStore } from "@reduxjs/toolkit";
import visReducer from "../features/MyChannel/visibilitySlice.js";

export const store = configureStore({
  reducer: visReducer,
});
