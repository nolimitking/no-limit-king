import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/API";

// Load user info from localStorage on page load
const userInfoFromStorage = JSON.parse(
  localStorage.getItem("userInfo") || "null"
);

// -------------------- REGISTER USER --------------------
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/register", userData);

      // Combine user infos + token into one object
      const userWithToken = {
        ...response.data.user,
        token: response.data.token,
      };

      // Save in localStorage
      localStorage.setItem("userInfo", JSON.stringify(userWithToken));

      return userWithToken;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// -------------------- LOGIN USER --------------------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/login", credentials);

      // Combine user info + token into one object
      const userWithToken = {
        ...response.data.user,
        token: response.data.token,
      };

      // Save in localStorage
      localStorage.setItem("userInfo", JSON.stringify(userWithToken));

      return userWithToken;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid credentials"
      );
    }
  }
);

// -------------------- SLICE --------------------
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userInfoFromStorage,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER USER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN USER
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
