import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import AdminDashboardLayout from "./layout/adminDashboardLayout";
import AddProduct from "./pages/ManageProducts/CreateProduct";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/ManageProducts/Products";
import ProductDetails from "./pages/ManageProducts/ProductDetails";
import EditProduct from "./pages/ManageProducts/EditProduct";
import Orders from "./pages/orders/Orders";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add/product" element={<AddProduct />} />
          <Route path="product/edit/:id" element={<EditProduct />} />
          <Route path="product/details/:id" element={<ProductDetails />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
