import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// ================= CREATE PRODUCT =================
// ADD PRODUCT
export const createProductAction = createAsyncThunk(
  "products/create",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(`${baseURL}/products`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Product creation failed");
    }
  }
);

// ================= FETCH PRODUCTS =================
export const fetchProductsAction = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURL}/products`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
  }
);
// ================= UPDATE PRODUCT =================
export const updateProductAction = createAsyncThunk(
  "products/update",
  async ({ id, formData }, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(`${baseURL}/products/${id}`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Product update failed");
    }
  }
);

// ================= SLICE =================
const productSlice = createSlice({
  name: "products",
  initialState: {
  products: [],
  accessories: [],
  allItems: [],
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  product: null,
  },
  reducers: {
    resetAddState: (state) => {
      state.isAdded = false;
      state.product = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ==== CREATE PRODUCT ====
    builder
      .addCase(createProductAction.pending, (state) => {
      state.loading = true;
      })
      .addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.product = action.payload;
      })
      .addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      });

    // ==== FETCH PRODUCTS ====
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.products || [];
      })
      .addCase(fetchProductsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllItemsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.accessories = action.payload.accessories;
        state.allItems = [...action.payload.products, ...action.payload.accessories];
      })
      // ==== UPDATE PRODUCT ====
    builder
      .addCase(updateProductAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductAction.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.isUpdated = true;
      })
      .addCase(updateProductAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
// Delete product
export const deleteProductAction = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.delete(`${baseURL}/products/${id}/delete`, config);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

export const fetchAllItemsAction = createAsyncThunk(
  "items/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURL}/items`);
      return data; // should return { products: [...], accessories: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch items");
    }
  }
);






export const { resetAddState } = productSlice.actions;
export default productSlice.reducer;
