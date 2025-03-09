import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axiosInstance";
import {API_URL} from "../constants/keys"

const API_URL1 = "/auth";

export const loginUser = createAsyncThunk("auth/loginUser", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL1}/login`, userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL1}/register`, userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
