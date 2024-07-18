import { createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  id: null,
  videoFile: null,
  thumbnail: null,
  title: null,
  discription: null,
  duration: null,
  views: null,
  isPublished: null,
  owner: null,
};

export const videoSlice = createSlice({
  name: "videoFiles",
  initialState,
  reducers: {
    getVideos: async(state, action) => {
      
    },
  },
});

export const { getVideos} = videoSlice.actions;
export default videoSlice.reducer;
