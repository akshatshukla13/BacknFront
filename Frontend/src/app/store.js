import { configureStore } from "@reduxjs/toolkit";
import visReducer from "../features/MyChannel/visibilitySlice.js";
import videoReducer from "../features/video/videoSlice.js";
import userReducer from "../features/User/userSlice.js";

export const store = configureStore({
  reducer: {
    vis: visReducer,
    video: videoReducer,
    user: userReducer,
  },
});
