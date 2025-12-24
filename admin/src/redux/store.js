import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import productsReducer from "../redux/slices/productSlice";
import ordersReducer from "../redux/slices/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    orders: ordersReducer,
  },
});

export default store;
