import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import { RiCloseCircleFill } from "react-icons/ri";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    orders,
    loading,
    error,
    ordersPage,
    ordersTotalPages,
    hasNextPage,
    hasPrevPage,
  } = useSelector((state) => state.orders);

  const limit = 10;

  useEffect(() => {
    dispatch(getAllOrders({ page: ordersPage, limit }));
  }, [dispatch, ordersPage]);

  const handleSelect = (id) => {
    navigate(`/admin/orderDetails/${id}`);
  };

  const handleBackToDashboard = () => {
    navigate("/admin/dashboard");
  };

  const StatusBadge = ({ status }) => {
    const config = {
      paid: {
        class: "bg-green-100 text-green-800",
        icon: FiCheckCircle,
        label: "paid",
      },
      pending: {
        class: "bg-yellow-100 text-yellow-800",
        icon: FiClock,
        label: "Pending",
      },
      failed: {
        class: "bg-red-100 text-red-800",
        icon: RiCloseCircleFill,
        label: "Failed",
      },
    };

    const {
      class: className,
      icon: Icon,
      label,
    } = config[status] || {
      class: "bg-gray-100 text-gray-800",
      icon: RiCloseCircleFill,
      label: status,
    };

    return (
      <div
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${className}`}
      >
        <Icon className="w-4 h-4 mr-2" />
        {label}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-medium mt-6">
        Failed to fetch orders: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Orders Management
        </h1>
        <p className="text-gray-600 mb-8">
          Manage and track all customer orders in one place.
        </p>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={handleBackToDashboard}
            className="bg-gray-200 py-1 px-3 rounded-full sm:hidden"
          >
            Back To Dashboard
          </button>

          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order._id}
                onClick={() => handleSelect(order._id)}
                className="bg-white rounded-2xl shadow hover:shadow-md border border-gray-100 p-6 cursor-pointer transition-all duration-300"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                  Order #{order._id.slice(-6)}
                </h2>

                <p className="text-sm text-gray-600 mb-2 truncate">
                  {order.user?.email || "No email"}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-gray-900">
                    ${order.totalPrice}
                  </span>
                  <StatusBadge status={order.paymentStatus} />
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500">
              No orders found.
            </div>
          )}
        </div>

        {/* Pagination */}
        {ordersTotalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 font-medium">
              Page{" "}
              <span className="font-semibold text-gray-900">{ordersPage}</span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {ordersTotalPages}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                disabled={!hasPrevPage}
                onClick={() =>
                  dispatch(getAllOrders({ page: ordersPage - 1, limit }))
                }
                className={`flex items-center px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  hasPrevPage
                    ? "bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:shadow-md"
                    : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                }`}
              >
                <FiChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              <button
                disabled={!hasNextPage}
                onClick={() =>
                  dispatch(getAllOrders({ page: ordersPage + 1, limit }))
                }
                className={`flex items-center px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  hasNextPage
                    ? "bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:shadow-md"
                    : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                }`}
              >
                Next
                <FiChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
