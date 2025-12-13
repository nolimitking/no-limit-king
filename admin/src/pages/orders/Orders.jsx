import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/Slices/orderSlice";
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
    docs,
    loading,
    error,
    page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(fetchOrders({ page: newPage, limit: 10 }));
  };

  const handleSelect = (id) => {
    navigate(`/admin/dashboard/orderDetails/${id}`);
  };

  const handleBackToDashboard = () => {
    navigate("/admin/dashboard");
  };

  const StatusBadge = ({ status }) => {
    const config = {
      succeeded: {
        class: "bg-green-100 text-green-800",
        icon: FiCheckCircle,
        text: "Succeeded",
      },
      pending: {
        class: "bg-yellow-100 text-yellow-800",
        icon: FiClock,
        text: "Pending",
      },
      failed: {
        class: "bg-red-100 text-red-800",
        icon: RiCloseCircleFill,
        text: "Failed",
      },
    };
    const {
      class: className,
      icon: Icon,
      text,
    } = config[status] || {
      class: "bg-gray-100 text-gray-800",
      icon: RiCloseCircleFill,
      text: status,
    };
    return (
      <div
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${className}`}
      >
        <Icon className="w-4 h-4 mr-2" />
        {text}
      </div>
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-40 text-lg font-semibold">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-medium mt-6">
        Failed to fetch orders: {error}
      </div>
    );

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
          {docs?.length > 0 ? (
            docs.map((order) => (
              <div
                key={order._id}
                onClick={() => handleSelect(order._id)}
                className="bg-white rounded-2xl shadow hover:shadow-md border border-gray-100 p-6 cursor-pointer transition-all duration-300"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                  {order.courseName}
                </h2>
                <p className="text-sm text-gray-600 mb-2 truncate">
                  {order.userEmail}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-gray-900">
                    ${order.amount}
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
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 font-medium">
              Page <span className="font-semibold text-gray-900">{page}</span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">{totalPages}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                disabled={!hasPrevPage}
                onClick={() => handlePageChange(prevPage)}
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
                onClick={() => handlePageChange(nextPage)}
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
