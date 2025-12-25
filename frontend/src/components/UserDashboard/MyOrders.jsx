import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiClock, FiRefreshCw } from "react-icons/fi";
import { RiCloseCircleFill } from "react-icons/ri";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { myOrders, myOrdersLoading, myOrdersError } = useSelector(
    (state) => state.order
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getMyOrders());
    }
  }, [dispatch, user]);

  const handleSelect = (id) => {
    navigate(`/user/orderDetails/${id}`);
  };

  const StatusBadge = ({ status }) => {
    const config = {
      pending: {
        class: "bg-yellow-100 text-yellow-800",
        icon: FiClock,
        label: "Pending",
      },
      processing: {
        class: "bg-purple-100 text-purple-800",
        icon: FiClock,
        label: "Processing",
      },
      shipped: {
        class: "bg-blue-100 text-blue-800",
        icon: FiClock,
        label: "Shipped",
      },
      delivered: {
        class: "bg-green-100 text-green-800",
        icon: FiCheckCircle,
        label: "Delivered",
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
    } = config[status] || config.failed;

    return (
      <div
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${className}`}
      >
        <Icon className="w-4 h-4 mr-2" />
        {label}
      </div>
    );
  };

  /* -------------------- LOADING STATE -------------------- */
  if (myOrdersLoading) {
    return (
      <div className="flex items-center justify-center h-60 text-lg font-semibold text-gray-600">
        Loading your orders...
      </div>
    );
  }

  /* -------------------- ERROR STATE -------------------- */
  if (myOrdersError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-md text-center">
          <RiCloseCircleFill className="text-red-500 text-5xl mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Unable to load orders
          </h2>
          <p className="text-gray-600 mb-6">
            Something went wrong while fetching your orders.
            <br />
            Please check your connection and try again.
          </p>

          <button
            onClick={() => dispatch(getMyOrders())}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition"
          >
            <FiRefreshCw />
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* -------------------- NORMAL STATE -------------------- */
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600 mb-8">Track and manage your orders</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myOrders.length > 0 ? (
            myOrders.map((order) => (
              <div
                key={order._id}
                onClick={() => handleSelect(order._id)}
                className="bg-white rounded-2xl shadow border border-gray-100 p-6 cursor-pointer transition hover:shadow-lg hover:-translate-y-1"
              >
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  Order #{order._id.slice(-6)}
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Price</span>
                    <span className="text-xl font-bold text-gray-900">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Shipping Status
                    </span>
                    <StatusBadge status={order.shippingStatus} />
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-6">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-24 text-gray-500">
              You don’t have any orders yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
