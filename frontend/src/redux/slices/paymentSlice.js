import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/API"; // axios instance

export const createCheckoutSession = createAsyncThunk(
  "payment/createCheckoutSession",
  async (_, { rejectWithValue }) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
      const token = userInfo?.token;

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await API.post(
        "/payment/checkout-session",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Payment failed");
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    checkoutUrl: null,
    error: null,
  },
  reducers: {
    clearPaymentState: (state) => {
      state.loading = false;
      state.checkoutUrl = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutUrl = action.payload.url;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
