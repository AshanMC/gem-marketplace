import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import axios from "axios";
import baseURL from "../../../utils/baseURL.js";
import { data } from 'autoprefixer';
import { resetErrAction } from '../globalActions/globalAction.js';
//initialState
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: userInfoFromStorage, // ✅ important
  },
};

export const registerUserAction = createAsyncThunk(
    "users/register", 
    async ({ email, password, fullname }, {rejectWithValue, getState, dispatch}) => {
        try {
            //make the http request
            const {data} = await axios.post(`${baseURL}/users/register`,{
                email,
                password,
                fullname,
            });
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error?.response?.data);
        }
    },
);

//login action
export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data)); // ✅ must be here
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
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


//users slice

const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        //handle actions
        //login
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.userAuth.loading = true;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action)=>{
            state.userAuth.userInfo = action.payload;
            state.userAuth.loading = false;

        });
        builder.addCase(loginUserAction.rejected, (state, action)=>{
            state.userAuth.error = action.payload;
            state.userAuth.loading = false;
        });
        //register
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action)=>{
            state.user = action.payload;
            state.loading = false;

        });
        builder.addCase(registerUserAction.rejected, (state, action)=>{
            state.error = action.payload;
            state.loading = false;
        });
        //reset error action
        builder.addCase(resetErrAction.pending, (state)=>{
            state.error = null;
        });
        // Get user profile
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
        builder.addCase(updateShippingAddressAction.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(updateShippingAddressAction.fulfilled, (state, action) => {
          state.loading = false;
          state.profile = action.payload.user; // ✅ update profile
        });
        builder.addCase(updateShippingAddressAction.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
});


//generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;