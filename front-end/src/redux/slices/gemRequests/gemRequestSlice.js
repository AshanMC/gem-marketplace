import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// Create gem request
export const createGemRequestAction = createAsyncThunk(
  "gemRequest/create",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const token = getState().users.userAuth.userInfo.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.post(`${baseURL}/requests`, payload, config);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

// Fetch user's own requests
export const fetchMyGemRequestsAction = createAsyncThunk(
  "gemRequest/fetchMy",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().users.userAuth.userInfo.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(`${baseURL}/requests/my`, config);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

// Fetch all requests (admin)
export const fetchAllGemRequestsAction = createAsyncThunk(
  "gemRequest/fetchAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().users.userAuth.userInfo.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(`${baseURL}/requests`, config);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

// Update request status (admin)
export const updateGemRequestStatusAction = createAsyncThunk(
  "gemRequest/updateStatus",
  async ({ id, status }, { rejectWithValue, getState }) => {
    try {
      const token = getState().users.userAuth.userInfo.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.put(`${baseURL}/requests/${id}/status`, { status }, config);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);
export const deleteGemRequestAction = createAsyncThunk(
  "gemRequest/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState().users.userAuth.userInfo.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.delete(`${baseURL}/requests/${id}`, config);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message);
    }
  }
);

const gemRequestSlice = createSlice({
  name: "gemRequest",
  initialState: {
    loading: false,
    error: null,
    success: false,
    requests: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGemRequestAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGemRequestAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createGemRequestAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchMyGemRequestsAction.fulfilled, (state, action) => {
        state.requests = action.payload;
      })

      .addCase(fetchAllGemRequestsAction.fulfilled, (state, action) => {
        state.requests = action.payload;
      })

      .addCase(updateGemRequestStatusAction.fulfilled, (state) => {
        state.success = true;
      });
  },
});

export default gemRequestSlice.reducer;
