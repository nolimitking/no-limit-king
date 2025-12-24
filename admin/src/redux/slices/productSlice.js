import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/API";

/* =========================
   Helper: Get JWT Token
========================= */
const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || null);
  return userInfo?.token;
};

/* =========================
   THUNKS
========================= */

// Get all products (paginated)
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async ({ page = 1, limit = 12 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await API.get(
        `/products/get-all/?page=${page}&limit=${limit}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Get single product
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/products/get-details/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Create product (admin)
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No authentication token found");

      const { data } = await API.post("/products/create", productData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Update product (admin)
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No authentication token found");

      const response = await API.put(`/products/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Delete product (admin)
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No authentication token found");

      await API.delete(`/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// Publish / Unpublish product (admin)
export const togglePublishProduct = createAsyncThunk(
  "products/togglePublish",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) return rejectWithValue("No authentication token found");

      const { data } = await API.put(
        `/products/publish/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* =========================
   SLICE
========================= */

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
    operationLoading: false,
    error: null,
  },

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---------- FETCH ALL ---------- */
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

      /* ---------- FETCH DETAILS ---------- */
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- CREATE ---------- */
      .addCase(createProduct.pending, (state) => {
        state.operationLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.items.unshift(action.payload);
        state.totalProducts += 1;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateProduct.pending, (state) => {
        state.operationLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.operationLoading = false;

        const index = state.items.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;

        if (state.product?._id === action.payload._id) {
          state.product = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteProduct.pending, (state) => {
        state.operationLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.items = state.items.filter((p) => p._id !== action.payload);
        state.totalProducts = Math.max(0, state.totalProducts - 1);

        if (state.product?._id === action.payload) {
          state.product = null;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      })

      /* ---------- PUBLISH / UNPUBLISH ---------- */
      .addCase(togglePublishProduct.pending, (state) => {
        state.operationLoading = true;
        state.error = null;
      })
      .addCase(togglePublishProduct.fulfilled, (state, action) => {
        state.operationLoading = false;

        const updatedProduct = action.payload;

        const index = state.items.findIndex(
          (p) => p._id === updatedProduct._id
        );
        if (index !== -1) state.items[index] = updatedProduct;

        if (state.product?._id === updatedProduct._id) {
          state.product = updatedProduct;
        }
      })
      .addCase(togglePublishProduct.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearProduct } = productSlice.actions;

export default productSlice.reducer;
