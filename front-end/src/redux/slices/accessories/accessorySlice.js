import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

const initialState = {
  accessories: [],
  accessory: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// Create accessory
export const createAccessoryAction = createAsyncThunk(
  "accessory/create",
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
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

// Fetch all accessories
export const fetchAccessoriesAction = createAsyncThunk(
  "accessory/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURL}/accessories`);
      return data.accessories;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

// Fetch single accessory
export const fetchAccessoryAction = createAsyncThunk(
  "accessory/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURL}/accessories/${id}`);
      return data.accessory;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

// Update accessory
export const updateAccessoryAction = createAsyncThunk(
  "accessory/update",
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
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

// Delete accessory
export const deleteAccessoryAction = createAsyncThunk(
  "accessory/delete",
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
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

// Create review for accessory
export const createAccessoryReviewAction = createAsyncThunk(
  "accessory/review",
  async ({ accessoryID, message, rating }, { rejectWithValue, getState }) => {
    try {
      const token = getState().users.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseURL}/reviews/accessory/${accessoryID}`,
        { message, rating },
        config
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const accessorySlice = createSlice({
  name: "accessory",
  initialState,
  reducers: {
    resetAccessoryCreate: (state) => {
      state.isAdded = false;
    },
    resetAccessoryState: (state) => {
      state.accessory = {};
      state.isUpdated = false;
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
        state.accessories.push(action.payload);
        state.isAdded = true;
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
        state.accessories = action.payload;
      })
      .addCase(fetchAccessoriesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAccessoryAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccessoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.accessory = action.payload;
      })
      .addCase(fetchAccessoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateAccessoryAction.fulfilled, (state) => {
        state.isUpdated = true;
      })
      .addCase(updateAccessoryAction.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteAccessoryAction.fulfilled, (state) => {
        state.isDeleted = true;
      })
      .addCase(deleteAccessoryAction.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetAccessoryCreate, resetAccessoryState } = accessorySlice.actions;
export default accessorySlice.reducer;
