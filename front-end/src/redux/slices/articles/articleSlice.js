import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// ===== CREATE ARTICLE =====
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

// ===== FETCH ALL ARTICLES =====
export const fetchArticlesAction = createAsyncThunk(
  "articles/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURL}/articles`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch articles");
    }
  }
);

// ===== FETCH SINGLE ARTICLE BY ID =====
export const fetchArticleByIdAction = createAsyncThunk(
  "articles/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURL}/articles/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch article");
    }
  }
);
// ===== DELETE ARTICLE =====
export const deleteArticleAction = createAsyncThunk(
  "articles/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(`${baseURL}/articles/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete article");
    }
  }
  );
  // ===== UPDATE ARTICLE =====
export const updateArticleAction = createAsyncThunk(
  "articles/update",
  async ({ id, formData }, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(`${baseURL}/articles/${id}`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update article");
    }
  }
  );

// ===== SLICE =====
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
      // ===== CREATE =====
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
      })

      // ===== FETCH ALL =====
      .addCase(fetchArticlesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticlesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = Array.isArray(action.payload)
          ? action.payload
          : action.payload.articles || [];
      })
      .addCase(fetchArticlesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== FETCH ONE =====
      .addCase(fetchArticleByIdAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticleByIdAction.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload.article || action.payload; // ✅ handles both
      })
      .addCase(fetchArticleByIdAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ===== DELETE =====
      .addCase(deleteArticleAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteArticleAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteArticleAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ===== UPDATE =====
      .addCase(updateArticleAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateArticleAction.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
      })
      .addCase(updateArticleAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { resetArticleCreate } = articleSlice.actions;
export default articleSlice.reducer;
