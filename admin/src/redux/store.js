import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import productsReducer from "../redux/slices/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});

export default store;
