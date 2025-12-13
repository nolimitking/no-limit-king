import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderDetails } from "../../redux/Slices/orderSlice";
import { FiChevronLeft } from "react-icons/fi";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { FiCheckCircle, FiClock } from "react-icons/fi";
import { RiCloseCircleFill } from "react-icons/ri";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, orderDetails } = useSelector((state) => state.orders);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetails(id));
    }
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(-1);
  };

  const StatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
      const config = {
        succeeded: {
          class: "bg-green-100 text-green-800",
          icon: FiCheckCircle,
          text: "Succeeded",
        },
        processing: {
          class: "bg-blue-100 text-blue-800",
          icon: FiClock,
          text: "Processing",
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
          Loading order details...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center shadow-md mt-6">
        <RiCloseCircleFill className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <p className="text-red-700 font-semibold text-lg">
          Failed to fetch order details
        </p>
        <p className="text-red-600 mt-1">{error}</p>
      </div>
    );

  if (!orderDetails)
    return (
      <div className="text-center text-gray-500 mt-6 text-lg">
        No order details available.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center mb-6 text-gray-700 hover:text-gray-900 font-medium transition-colors"
        >
          <FiChevronLeft className="w-5 h-5 mr-2" />
          Back To Orders
        </button>

        {/* Order Card */}
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Order Details
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg hover:shadow transition-shadow duration-200">
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Order ID:</span>{" "}
                  {orderDetails._id}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg hover:shadow transition-shadow duration-200">
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">User Email:</span>{" "}
                  {orderDetails.userEmail}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg hover:shadow transition-shadow duration-200">
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Course Name:</span>{" "}
                  {orderDetails.courseName}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg hover:shadow transition-shadow duration-200 flex items-center justify-between">
                <span className="text-gray-700 text-sm font-semibold">
                  Payment Status:
                </span>
                <StatusBadge status={orderDetails.paymentStatus} />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg hover:shadow transition-shadow duration-200">
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Amount:</span> $
                  {orderDetails.amount} {orderDetails.currency?.toUpperCase()}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(orderDetails.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
