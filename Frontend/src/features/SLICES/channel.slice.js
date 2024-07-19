import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../User/userSlice";

//action

export const fetchUserChannelDetails = createAsyncThunk(
  "fetchUserChannelDetails",
  async (_,{ dispatch, rejectWithValue }) => {
    try {
      dispatch(fetchUserDetails());
      const userName = useSelector((state) => state.user.data.userName);
      const response = await axios.get("/api/users/c/" + userName);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  data: null,
};

export const channelSlice = createSlice({
  name: "Channel",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserChannelDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserChannelDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUserChannelDetails.rejected, (state, action) => {
      console.log("Error channel", action.payload);
      state.isError = true;
      state.isLoading = false;
    });
  },
  reducers: {},
});

export default channelSlice.reducer;
