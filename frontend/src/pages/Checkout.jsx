import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../redux/slices/cartSlice";
import {
  createCheckoutSession,
  clearPaymentState,
} from "../redux/slices/paymentSlice";

const Checkout = () => {
  const dispatch = useDispatch();

  const {
    items,
    totalPrice,
    loading: cartLoading,
  } = useSelector((state) => state.cart);

  const {
    loading: paymentLoading,
    checkoutUrl,
    error,
  } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
      dispatch(clearPaymentState());
    }
  }, [checkoutUrl, dispatch]);

  const handleCheckout = () => {
    dispatch(createCheckoutSession());
  };

  if (cartLoading)
    return <p className="text-white text-center mt-10">Loading cart...</p>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-300">Your cart is empty</p>
      ) : (
        <div className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
          {items.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2"
            >
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-gray-400 text-sm">
                  {item.quantity} × ${item.price}
                </p>
                <img className="w-20" src={item.product.images} alt="" />
              </div>
              <p className="font-semibold text-white">
                ${item.quantity * item.price}
              </p>
            </div>
          ))}

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
            <h3 className="text-xl font-bold">Total:</h3>
            <p className="text-xl font-bold text-green-400">${totalPrice}</p>
          </div>

          <button
            onClick={handleCheckout}
            disabled={paymentLoading}
            className="w-full mt-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {paymentLoading ? "Redirecting..." : "Pay with Stripe"}
          </button>

          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Checkout;
