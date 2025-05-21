import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// CREATE CATEGORY
export const createCategoryAction = createAsyncThunk(
  "categories/create",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(`${baseURL}/categories`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create category");
    }
  }
);
export const fetchCategoriesAction = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURL}/categories`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
    }
  }
);
export const deleteCategoryAction = createAsyncThunk(
  "categories/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(`${baseURL}/categories/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete category");
    }
  }
);
export const updateCategoryAction = createAsyncThunk(
  "categories/update",
  async ({ id, name }, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(`${baseURL}/categories/${id}`, { name }, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update category");
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    category: null,
    loading: false,
    error: null,
    isCreated: false,
  },
  reducers: {
    resetCategoryCreate: (state) => {
      state.isCreated = false;
      state.category = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategoryAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
        state.isCreated = true;
      })
      .addCase(createCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategoriesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = Array.isArray(action.payload)
      ? action.payload
      : action.payload.categories || []; // fallback if API returns { categories: [...] }
      })
      .addCase(fetchCategoriesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategoryAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategoryAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCategoryAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { resetCategoryCreate } = categorySlice.actions;
export default categorySlice.reducer;
