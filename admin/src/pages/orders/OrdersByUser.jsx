import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrdersUser } from "../../redux/Slices/orderSlice";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { FiCheckCircle, FiClock } from "react-icons/fi";
import { RiCloseCircleFill } from "react-icons/ri";

const OrdersByUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { docs, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrdersUser());
  }, [dispatch]);

  const handleBackToDashboard = () => {
    navigate("/user/dashboard/");
  };

  const StatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
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
        default: {
          class: "bg-gray-100 text-gray-800",
          icon: RiCheckboxCircleFill,
          text: status,
        },
      };
      return config[status] || config.default;
    };

    const { class: className, icon: Icon, text } = getStatusConfig(status);
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
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-600 font-medium text-lg">
          Loading your orders...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={handleBackToDashboard}
            className="py-1 px-2 bg-gray-200 rounded-full mb-3 w-full sm:hidden"
          >
            Back To Dashboard
          </button>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center shadow-md">
            <RiCloseCircleFill className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <p className="text-red-700 font-semibold text-lg">
              Failed to fetch orders
            </p>
            <p className="text-red-600 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );

  if (!loading && docs.length === 0)
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={handleBackToDashboard}
            className="py-1 px-2 bg-gray-200 rounded-full mb-3 w-full sm:hidden"
          >
            Back To Dashboard
          </button>
          <div className="text-center text-gray-500 text-lg">
            You have no orders yet.
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>

        {/* Orders List */}
        <div className="space-y-6">
          <button
            onClick={handleBackToDashboard}
            className="py-1 px-2 bg-gray-200 rounded-full mb-3 w-full sm:hidden"
          >
            Back To Dashboard
          </button>
          {docs.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg hover:shadow transition-shadow duration-200">
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Order ID:</span>{" "}
                      {order._id}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg hover:shadow transition-shadow duration-200">
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">User Email:</span>{" "}
                      {order.userEmail}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg hover:shadow transition-shadow duration-200">
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Course Name:</span>{" "}
                      {order.courseName}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg hover:shadow transition-shadow duration-200 flex items-center justify-between">
                    <span className="text-gray-700 text-sm font-semibold">
                      Payment Status:
                    </span>
                    <StatusBadge status={order.paymentStatus} />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg hover:shadow transition-shadow duration-200">
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Amount:</span> $
                      {order.amount} {order.currency?.toUpperCase()}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg hover:shadow transition-shadow duration-200">
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Created:</span>{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersByUser;
