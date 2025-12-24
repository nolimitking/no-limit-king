import { useNavigate } from "react-router-dom";

const CheckoutCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Cancel Icon */}
        <div className="relative mb-8 sm:mt-24">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mx-auto shadow-2xl border-4 border-gray-700">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white">Checkout Cancelled</h1>

          <p className="text-gray-300 text-lg leading-relaxed">
            Your order was not completed. No charges were made.
          </p>

          {/* Divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-transparent mx-auto"></div>

          <p className="text-gray-400">
            You can try again whenever you're ready
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 space-y-4">
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-amber-500 text-black font-bold py-4 px-6 rounded-lg hover:bg-amber-400 transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
          >
            Retry Checkout
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full border-2 border-amber-500/30 text-amber-500 font-semibold py-4 px-6 rounded-lg hover:bg-amber-500/10 transition duration-300"
          >
            Continue Shopping
          </button>
        </div>

        {/* Support */}
        <div className="mt-12 pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            Need help?{" "}
            <a
              href="#"
              className="text-amber-500 hover:text-amber-400 transition"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancel;
