import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import AdminDashboardLayout from "./layout/adminDashboardLayout";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="admin/dashboard"
          element={<AdminDashboardLayout />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
