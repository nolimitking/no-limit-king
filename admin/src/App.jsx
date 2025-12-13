import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import AdminDashboardLayout from "./layout/adminDashboardLayout";
import AddProducts from "./pages/AddProducts";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AdminDashboardLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProducts />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
