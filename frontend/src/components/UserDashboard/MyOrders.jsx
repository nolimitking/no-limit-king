import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiClock } from "react-icons/fi";
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

  if (myOrdersLoading) {
    return (
      <div className="flex items-center justify-center h-40 text-lg font-semibold text-gray-700">
        Loading your orders...
      </div>
    );
  }

  if (myOrdersError) {
    return (
      <div className="text-center text-red-600 font-medium mt-6">
        Failed to fetch orders: {myOrdersError}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>

        <p className="text-gray-600 mb-8">Track and manage your orders</p>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myOrders?.length > 0 ? (
            myOrders.map((order) => (
              <div
                key={order._id}
                onClick={() => handleSelect(order._id)}
                className="bg-white rounded-2xl shadow border border-gray-100 p-6 cursor-pointer transition-all duration-300 hover:shadow hover:-translate-y-1"
              >
                {/* Order ID */}
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  Order #{order._id.slice(-6)}
                </h2>

                {/* Price & Status */}
                <div className="mt-6 space-y-4">
                  {/* Total Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Total Price
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Shipping Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Shipping Status
                    </span>
                    <StatusBadge status={order.shippingStatus} />
                  </div>
                </div>

                {/* Date */}
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
            <div className="col-span-full text-center py-20 text-gray-500">
              You don’t have any orders yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
