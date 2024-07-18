import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//action
export const fetchUserDetails = createAsyncThunk(
  "fetchUserDetails",
  async () => {
    const response = await axios.get("/api/users/current-user/");
    return response.data.data;
  }
);

const initialState = {
  isLoading: false,
  data: null,
  isError: false,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
      state.isLoading = false;
    });
  },
  reducers: {
    getX: async (state, action) => {},
  },
});

export const { getX } = userSlice.actions;
export default userSlice.reducer;
