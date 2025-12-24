import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getOrderDetails,
  updateOrderShippingStatus,
} from "../../redux/slices/orderSlice";
import { FiChevronLeft, FiCheckCircle, FiClock } from "react-icons/fi";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, orderDetails, updatingStatus } = useSelector(
    (state) => state.orders
  );

  const [shippingStatus, setShippingStatus] = useState("");

  useEffect(() => {
    if (id) dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (orderDetails?.shippingStatus) {
      setShippingStatus(orderDetails.shippingStatus);
    }
  }, [orderDetails]);

  const handleBack = () => navigate(-1);

  const handleUpdateStatus = () => {
    if (shippingStatus === orderDetails.shippingStatus) {
      toast.warning("This status is already active for this order.");
      return;
    }

    dispatch(
      updateOrderShippingStatus({
        orderId: id,
        status: shippingStatus,
      })
    )
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Shipping status updated successfully!");
        dispatch(getOrderDetails(id)); // refresh order details
      })
      .catch((err) => {
        toast.error(err.message || "Failed to update shipping status.");
      });
  };

  const StatusBadge = ({ status }) => {
    const config = {
      delivered: {
        class: "bg-green-100 text-green-800",
        icon: FiCheckCircle,
        text: "Delivered",
      },
      paid: {
        class: "bg-green-100 text-green-800",
        icon: FiCheckCircle,
        text: "Paid",
      },
      shipped: {
        class: "bg-blue-100 text-blue-800",
        icon: FiClock,
        text: "Shipped",
      },
      processing: {
        class: "bg-purple-100 text-purple-800",
        icon: FiClock,
        text: "Processing",
      },
      pending: {
        class: "bg-yellow-100 text-yellow-800",
        icon: FiClock,
        text: "Pending",
      },
    };

    const current = config[status] || {
      class: "bg-gray-100 text-gray-800",
      icon: RiCheckboxCircleFill,
      text: status,
    };

    const Icon = current.icon;
    return (
      <div
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${current.class}`}
      >
        <Icon className="w-4 h-4 mr-2" />
        {current.text}
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
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Order Details
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="font-semibold">Order ID:</span>{" "}
                {orderDetails._id}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="font-semibold">User:</span>{" "}
                {orderDetails.user?.email}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="font-semibold">Total Price:</span> $
                {orderDetails.totalPrice}
              </div>
            </div>

            {/* Right */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                <span className="font-semibold">Payment Status:</span>
                <StatusBadge status={orderDetails.paymentStatus} />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                <span className="font-semibold">Shipping Status:</span>
                <StatusBadge status={orderDetails.shippingStatus} />
              </div>

              {/* Admin Status Update */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Update Shipping Status
                </label>

                <select
                  value={shippingStatus}
                  onChange={(e) => setShippingStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>

                <button
                  onClick={handleUpdateStatus}
                  disabled={updatingStatus}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {updatingStatus ? "Updating..." : "Update Status"}
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="font-semibold">Created:</span>{" "}
                {new Date(orderDetails.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
