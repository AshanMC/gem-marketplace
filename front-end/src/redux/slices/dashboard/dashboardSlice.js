import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// Fetch order stats (sum, today)
export const fetchOrderStatsAction = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get(`${baseURL}/orders/sales/sum`, config);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch users count
export const fetchAllUsersAction = createAsyncThunk(
  "dashboard/fetchUsers",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get(`${baseURL}/users`, config);
      return data.length; // just count
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch all orders
export const fetchAllOrdersAction = createAsyncThunk(
  "dashboard/fetchOrders",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get(`${baseURL}/orders`, config);
      return data.orders;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: null,
    todaySales: 0,
    usersCount: 0,
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderStatsAction.fulfilled, (state, action) => {
        state.stats = action.payload.orders[0];
        state.todaySales = action.payload.saleToday?.[0]?.totalSales || 0;
      })
      .addCase(fetchAllUsersAction.fulfilled, (state, action) => {
        state.usersCount = action.payload;
      })
      .addCase(fetchAllOrdersAction.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
