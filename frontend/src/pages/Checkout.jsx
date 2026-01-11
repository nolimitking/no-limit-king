import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../redux/slices/cartSlice";
import {
  createCheckoutSession,
  clearPaymentState,
} from "../redux/slices/paymentSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-amber-500 animate-pulse">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black p-4 md:p-0">
      <div className="max-w-md mx-auto py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-medium text-white mb-2">Checkout</h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">Your cart is empty</div>
            <button onClick={() => navigate("/")} className="text-amber-500 hover:text-amber-400 transition">
              Return to shop →
            </button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="mb-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-800">
                      <img
                        src={item.product.images}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-white font-medium">
                        {item.product.name}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {item.quantity} x ${item.price}
                      </div>
                    </div>
                  </div>
                  <div className="text-white font-medium">
                    ${(item.quantity * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-800 mb-6"></div>

            {/* Total */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-gray-400">Total</div>
              <div className="text-2xl font-medium text-amber-500">
                ${totalPrice.toFixed(2)}
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={paymentLoading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {paymentLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Continue to Payment"
              )}
            </button>

            {/* Error */}
            {error && (
              <div className="mt-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <div className="text-gray-500 text-xs text-center space-y-2">
                <div>Secure payment powered by Stripe</div>
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                    <span>Encrypted</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                    <span>Secure</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
