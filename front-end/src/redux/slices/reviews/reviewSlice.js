import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

const initialState = {
  loading: false,
  error: null,
  isReviewAdded: false,
};

// Create review
export const createReviewAction = createAsyncThunk(
  "review/create",
  async ({ accessoryId, message, rating }, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${baseURL}/reviews/accessory/${accessoryId}`,
        { message, rating },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Review submission failed"
      );
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    resetReviewStatus: (state) => {
      state.isReviewAdded = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReviewAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReviewAction.fulfilled, (state) => {
        state.loading = false;
        state.isReviewAdded = true;
      })
      .addCase(createReviewAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetReviewStatus } = reviewSlice.actions;
export default reviewSlice.reducer;
