import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// CREATE ACCESSORY
export const createAccessoryAction = createAsyncThunk(
  "accessories/create",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(`${baseURL}/accessories`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create accessory");
    }
  }
);

// FETCH ACCESSORIES
export const fetchAccessoriesAction = createAsyncThunk(
  "accessories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURL}/accessories`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch accessories");
    }
  }
);
export const deleteAccessoryAction = createAsyncThunk(
  "accessories/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(`${baseURL}/accessories/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete accessory");
    }
  }
);
export const updateAccessoryAction = createAsyncThunk(
  "accessories/update",
  async ({ id, formData }, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(`${baseURL}/accessories/${id}`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update accessory");
    }
  }
);
export const createAccessoryReviewAction = createAsyncThunk(
  "accessories/review",
  async ({ accessoryID, message, rating }, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${baseURL}/reviews/accessory/${accessoryID}`,
        { message, rating },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Review failed");
    }
  }
);

const accessorySlice = createSlice({
  name: "accessories",
  initialState: {
    accessories: [],
    accessory: null,
    loading: false,
    error: null,
    isCreated: false,
  },
  reducers: {
    resetAccessoryCreate: (state) => {
      state.isCreated = false;
      state.accessory = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccessoryAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAccessoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.accessory = action.payload;
        state.isCreated = true;
      })
      .addCase(createAccessoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAccessoriesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccessoriesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.accessories = action.payload.accessories; // ✅ Only the array
      })
      .addCase(fetchAccessoriesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAccessoryAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAccessoryAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteAccessoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAccessoryAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAccessoryAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateAccessoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { resetAccessoryCreate } = accessorySlice.actions;
export default accessorySlice.reducer;
