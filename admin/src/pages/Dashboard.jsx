import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiChevronRight,
} from "react-icons/fi";
import { getAllOrders } from "../redux/Slices/orderSlice";
import { fetchProducts } from "../redux/Slices/productSlice";

// Fancy icons import
import { FaShoppingBag, FaBoxOpen, FaDollarSign } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access orders from the updated slice
  const { orders, loading: ordersLoading } = useSelector(
    (state) => state.orders
  );

  // Access products from the product slice
  const { items: products, loading: productsLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getAllOrders({ page: 1, limit: 3 }));
    dispatch(fetchProducts({ page: 1, limit: 3 }));
  }, [dispatch]);

  const handleSelectAllOrders = () => navigate("/admin/orders");
  const handleSelectOrderById = (id) => navigate(`/admin/orderDetails/${id}`);
  const handleSelectAllProducts = () => navigate("/admin/products");
  const handleSelectProductById = (id) =>
    navigate(`/admin/product/details/${id}`);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl p-4 sm:p-6 hover:shadow transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
            {title}
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-gray-900 truncate">
            {value}
          </p>
        </div>
        <div
          className={`p-2 sm:p-3 rounded-md ${color} flex-shrink-0 ml-3 shadow`}
        >
          <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { color: "bg-yellow-200/80 text-yellow-900", icon: FiClock },
      paid: { color: "bg-green-200/80 text-green-900", icon: FiCheckCircle },
      completed: {
        color: "bg-green-200/80 text-green-900",
        icon: FiCheckCircle,
      },
      cancelled: { color: "bg-red-200/80 text-red-900", icon: FiXCircle },
      processing: {
        color: "bg-blue-200/80 text-blue-900",
        icon: FiAlertCircle,
      },
      review: {
        color: "bg-yellow-200/80 text-yellow-900",
        icon: FiAlertCircle,
      },
      default: { color: "bg-gray-200/80 text-gray-900", icon: FiAlertCircle },
    };

    const normalizedStatus = status?.toLowerCase() || "default";
    const config = statusConfig[normalizedStatus] || statusConfig.default;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium ${config.color} flex-shrink-0`}
      >
        <Icon className="w-3 h-3 mr-1" />
        <span className="hidden xs:inline capitalize">{normalizedStatus}</span>
        <span className="xs:hidden capitalize">{normalizedStatus}</span>
      </span>
    );
  };

  const RecentOrders = () => (
    <div className="bg-white rounded-xl shadow-xs mb-1 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700">
          Recent Orders
        </h3>
        <button
          onClick={handleSelectAllOrders}
          className="text-blue-600 cursor-pointer hover:text-blue-800 text-xs sm:text-sm font-medium inline-flex items-center"
        >
          View all
          <FiChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {ordersLoading ? (
        <div className="flex justify-center py-6 sm:py-8">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {orders?.slice(0, 3).map((order) => (
            <div
              key={order._id}
              onClick={() => handleSelectOrderById(order._id)}
              className="flex items-center justify-between p-3 sm:p-4 rounded-lg shadow bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
            >
              <div className="flex-1 min-w-0 mr-3">
                <p className="font-medium text-gray-700 text-sm sm:text-base truncate">
                  Order #{order._id?.slice(-6)}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  ${order.totalPrice || "0.00"}
                </p>
              </div>
              <StatusBadge status={order.paymentStatus} />
            </div>
          ))}
          {!orders?.length && (
            <p className="text-center text-gray-500 py-4 text-sm sm:text-base">
              No orders found
            </p>
          )}
        </div>
      )}
    </div>
  );

  const RecentProducts = () => (
    <div className="bg-white rounded-xl shadow-xs mb-1 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700">
          Recent Products
        </h3>
        <button
          onClick={handleSelectAllProducts}
          className="text-blue-600 cursor-pointer hover:text-blue-800 text-xs sm:text-sm font-medium inline-flex items-center"
        >
          View all
          <FiChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {productsLoading ? (
        <div className="flex justify-center py-6 sm:py-8">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {products?.slice(0, 3).map((product) => (
            <div
              key={product._id}
              onClick={() => handleSelectProductById(product._id)}
              className="flex items-center justify-between p-3 sm:p-4 shadow rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
            >
              <div className="flex-1 min-w-0 mr-3">
                <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                  {product.name || `Product ${product._id?.slice(-6)}`}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  ${product.price || "0.00"}
                </p>
              </div>
            </div>
          ))}
          {!products?.length && (
            <p className="text-center text-gray-500 py-4 text-sm sm:text-base">
              No products found
            </p>
          )}
        </div>
      )}
    </div>
  );

  // Stats calculations
  const totalOrders = orders?.length || 0;
  const totalProducts = products?.length || 0;
  const pendingOrders =
    orders?.filter((o) => o.paymentStatus?.toLowerCase() === "pending")
      .length || 0;

  // Calculate total sales for the current month
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const totalSalesThisMonth = orders
    ?.filter((o) => {
      const orderDate = new Date(o.createdAt);
      return (
        orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0)
    .toFixed(2);

  return (
    <div className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={FaShoppingBag}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={FaBoxOpen}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
        <StatCard
          title="Pending Orders"
          value={pendingOrders}
          icon={MdPendingActions}
          color="bg-gradient-to-r from-amber-500 to-amber-600"
        />
        <StatCard
          title="Total Sales (Month)"
          value={`$${totalSalesThisMonth}`}
          icon={FaDollarSign}
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 overflow-hidden">
        <RecentOrders />
        <RecentProducts />
      </div>
    </div>
  );
};

export default Dashboard;
