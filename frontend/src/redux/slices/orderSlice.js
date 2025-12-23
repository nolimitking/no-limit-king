import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/API";

// Helper to get token from localStorage
const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || null);
  return userInfo?.token;
};

// Async thunks
export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await API.get("/order/all", {
        params: { page, limit },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch orders"
      );
    }
  }
);

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

export const updateOrderShippingStatus = createAsyncThunk(
  "order/updateShippingStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await API.put(
        `/order/update-status-shipping/${orderId}`,
        { orderId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update shipping status"
      );
    }
  }
);

// Initial state
const initialState = {
  // For admin: all orders with pagination
  orders: [],
  ordersPage: 1,
  ordersLimit: 10,
  ordersTotalPages: 1,
  ordersTotalDocs: 0,

  // For user: my orders
  myOrders: [],

  // Single order details
  currentOrder: null,

  // Loading states
  loading: false,
  myOrdersLoading: false,
  detailsLoading: false,
  updateLoading: false,

  // Error states
  error: null,
  myOrdersError: null,
  detailsError: null,
  updateError: null,

  // Success messages
  successMessage: null,
};

// Create slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.error = null;
      state.myOrdersError = null;
      state.detailsError = null;
      state.updateError = null;
      state.successMessage = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.ordersPage = 1;
      state.ordersTotalPages = 1;
      state.ordersTotalDocs = 0;
    },
    clearMyOrders: (state) => {
      state.myOrders = [];
    },
  },
  extraReducers: (builder) => {
    // Get all orders (admin)
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.docs || action.payload;
        state.ordersPage = action.payload.page || 1;
        state.ordersTotalPages = action.payload.totalPages || 1;
        state.ordersTotalDocs =
          action.payload.totalDocs || action.payload.length || 0;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

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

    // Update shipping status
    builder
      .addCase(updateOrderShippingStatus.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.successMessage = null;
      })
      .addCase(updateOrderShippingStatus.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.successMessage = action.payload.message;

        // Update order in orders list if exists
        if (state.orders.length > 0) {
          const index = state.orders.findIndex(
            (order) => order._id === action.meta.arg.orderId
          );
          if (index !== -1) {
            state.orders[index].shippingStatus = action.meta.arg.status;
          }
        }

        // Update order in myOrders list if exists
        if (state.myOrders.length > 0) {
          const index = state.myOrders.findIndex(
            (order) => order._id === action.meta.arg.orderId
          );
          if (index !== -1) {
            state.myOrders[index].shippingStatus = action.meta.arg.status;
          }
        }

        // Update current order if it's the same order
        if (
          state.currentOrder &&
          state.currentOrder._id === action.meta.arg.orderId
        ) {
          state.currentOrder.shippingStatus = action.meta.arg.status;
        }
      })
      .addCase(updateOrderShippingStatus.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});

export const {
  clearOrderState,
  clearCurrentOrder,
  clearOrders,
  clearMyOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
