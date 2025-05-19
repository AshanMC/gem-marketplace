import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// CREATE ARTICLE
export const createArticleAction = createAsyncThunk(
  "articles/create",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(`${baseURL}/articles`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create article");
    }
  }
);

const articleSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    article: null,
    loading: false,
    error: null,
    isCreated: false,
  },
  reducers: {
    resetArticleCreate: (state) => {
      state.isCreated = false;
      state.article = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createArticleAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createArticleAction.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
        state.isCreated = true;
      })
      .addCase(createArticleAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetArticleCreate } = articleSlice.actions;
export default articleSlice.reducer;
