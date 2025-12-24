import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/API";

// Helper to get token from localStorage
const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || null);
  return userInfo?.token;
};

/* ============================
   THUNKS
============================ */

// Get all orders (admin) with pagination
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

// Get single order details
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

// Update shipping status
export const updateOrderShippingStatus = createAsyncThunk(
  "order/updateShippingStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    if (!orderId || !status) {
      return rejectWithValue("Order ID and status are required");
    }

    try {
      const token = getToken();
      const response = await API.put(
        `/order/update-status-shipping/${orderId}`,
        { status },
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

/* ============================
   SLICE
============================ */

const orderSlice = createSlice({
  name: "order",
  initialState: {
    // Orders list (admin)
    orders: [],
    ordersPage: 1,
    ordersLimit: 10,
    ordersTotalPages: 1,
    ordersTotalDocs: 0,
    hasNextPage: false,
    hasPrevPage: false,

    // Single order
    orderDetails: null,

    // Loading states
    loading: false,
    detailsLoading: false,
    updateLoading: false,

    // Error states
    error: null,
    detailsError: null,
    updateError: null,

    // Success
    successMessage: null,
  },

  reducers: {
    clearOrderState: (state) => {
      state.error = null;
      state.detailsError = null;
      state.updateError = null;
      state.successMessage = null;
    },
    clearOrderDetails: (state) => {
      state.orderDetails = null;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.ordersPage = 1;
      state.ordersTotalPages = 1;
      state.ordersTotalDocs = 0;
      state.hasNextPage = false;
      state.hasPrevPage = false;
    },
  },

  extraReducers: (builder) => {
    /* ============================
       GET ALL ORDERS
    ============================ */
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.orders;
        state.ordersPage = action.payload.ordersPage;
        state.ordersTotalPages = action.payload.ordersTotalPages;
        state.ordersTotalDocs = action.payload.ordersTotalDocs;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPrevPage = action.payload.hasPrevPage;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /* ============================
       GET ORDER DETAILS
    ============================ */
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.payload;
      });

    /* ============================
       UPDATE SHIPPING STATUS
    ============================ */
    builder
      .addCase(updateOrderShippingStatus.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.successMessage = null;
      })
      .addCase(updateOrderShippingStatus.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.successMessage = action.payload.message;

        const updatedOrder = action.payload.order;

        // Update orders list
        const index = state.orders.findIndex(
          (order) => order._id === updatedOrder._id
        );
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }

        // Update order details
        if (state.orderDetails && state.orderDetails._id === updatedOrder._id) {
          state.orderDetails = updatedOrder;
        }
      })
      .addCase(updateOrderShippingStatus.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});

export const { clearOrderState, clearOrderDetails, clearOrders } =
  orderSlice.actions;

export default orderSlice.reducer;
