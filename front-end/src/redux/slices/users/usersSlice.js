import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import baseURL from "../../../utils/baseURL.js";
import { resetErrAction } from '../globalActions/globalAction.js';

// Load user info from localStorage if available
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Initial state
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: userInfoFromStorage,
  },
};

// REGISTER USER
export const registerUserAction = createAsyncThunk(
  "users/register",
  async ({ email, password, fullname }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/register`, {
        email,
        password,
        fullname,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// LOGIN USER
export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// LOGOUT USER
export const logoutUserAction = createAsyncThunk("users/logout", async () => {
  localStorage.removeItem("userInfo");
});

// GET USER PROFILE
export const getUserProfileAction = createAsyncThunk(
  "users/profile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        users: {
          userAuth: { userInfo },
        },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/users/profile`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// UPDATE SHIPPING ADDRESS
export const updateShippingAddressAction = createAsyncThunk(
  "users/update-shipping",
  async (addressData, { rejectWithValue, getState }) => {
    try {
      const {
        users: {
          userAuth: { userInfo },
        },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${baseURL}/users/update/shipping`,
        addressData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// FETCH ALL USERS
export const fetchAllUsersAction = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        users: {
          userAuth: { userInfo },
        },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`${baseURL}/users`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// USERS SLICE
const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(loginUserAction.pending, (state) => {
      state.userAuth.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
      state.userAuth.error = null;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });

    // LOGOUT
    builder.addCase(logoutUserAction.fulfilled, (state) => {
      state.userAuth.userInfo = null;
    });

    // REGISTER
    builder.addCase(registerUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // RESET ERROR
    builder.addCase(resetErrAction.pending, (state) => {
      state.error = null;
    });

    // GET USER PROFILE
    builder.addCase(getUserProfileAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getUserProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // UPDATE SHIPPING ADDRESS
    builder.addCase(updateShippingAddressAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateShippingAddressAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload.user;
    });
    builder.addCase(updateShippingAddressAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // FETCH ALL USERS
    builder.addCase(fetchAllUsersAction.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

// EXPORT REDUCER
const usersReducer = usersSlice.reducer;
export default usersReducer;