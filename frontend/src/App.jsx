import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCart } from "./redux/slices/cartSlice";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products/Products";
import ProductsDetails from "./pages/Products/ProductsDetails";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";
import OrderSuccess from "./pages/OrderSuccess";

import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import UserDashboardLayout from "./layouts/UserDashboardLayout";
import MyOrders from "./components/UserDashboard/MyOrders";
import OrderDetails from "./components/UserDashboard/OrderDetails";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductsDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/checkout-cancel" element={<CheckoutCancel />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Route>

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* User Dashboard */}
        <Route path="/user" element={<UserDashboardLayout />}>
          <Route path="orders" element={<MyOrders />} />
          <Route path="orderDetails/:id" element={<OrderDetails />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
