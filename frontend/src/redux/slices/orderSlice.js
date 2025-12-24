import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/API";

// Helper to get token from localStorage
const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || null);
  return userInfo?.token;
};

export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await API.get("/order/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch your orders"
      );
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/order/details/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch order details"
      );
    }
  }
);

// Create slice
const orderSlice = createSlice({
  name: "order",
  // Initial state
  initialState: {
    // For user: my orders
    myOrders: [],

    // Single order details
    currentOrder: null,

    // Loading states
    loading: false,
    myOrdersLoading: false,
    detailsLoading: false,

    // Error states
    error: null,
    myOrdersError: null,
    detailsError: null,

    // Success messages
    successMessage: null,
  },
  reducers: {
    clearOrderState: (state) => {
      state.error = null;
      state.myOrdersError = null;
      state.detailsError = null;
      state.successMessage = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearMyOrders: (state) => {
      state.myOrders = [];
    },
  },
  extraReducers: (builder) => {
    // Get my orders (user)
    builder
      .addCase(getMyOrders.pending, (state) => {
        state.myOrdersLoading = true;
        state.myOrdersError = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.myOrdersLoading = false;
        state.myOrders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.myOrdersLoading = false;
        state.myOrdersError = action.payload;
      });

    // Get order details
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.payload;
      });
  },
});

export const { clearOrderState, clearCurrentOrder, clearMyOrders } =
  orderSlice.actions;

export default orderSlice.reducer;
