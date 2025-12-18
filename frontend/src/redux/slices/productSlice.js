import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/API";

// Fetch all published products (paginated)

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async ({ page = 1, limit = 12 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await API.get(
        `/products-get-all-publish?page=${page}&limit=${limit}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

//Fetch single published product

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/products/get-details-publish/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Product not found"
      );
    }
  }
);

// Product Slice

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    product: null,

    totalProducts: 0,
    totalPages: 1,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,

    loading: false,
    error: null,
  },

  reducers: {
    // Optional: reset product details when leaving page
    clearProductDetails: (state) => {
      state.product = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch all products

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.items = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.hasNextPage = action.payload.hasNextPage;
        state.hasPrevPage = action.payload.hasPrevPage;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch product details

      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductDetails } = productSlice.actions;
export default productSlice.reducer;
