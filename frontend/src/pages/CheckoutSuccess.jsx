import { useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="relative mb-8 sm:mt-24">
          <div className="w-32 h-32 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Pulsing effect */}
          <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-amber-500/20"></div>
        </div>

        {/* Success Message */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white">Success!</h1>

          <p className="text-gray-300 text-lg leading-relaxed">
            Your purchase has been confirmed. Thank you for your order!
          </p>

          {/* Divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-transparent mx-auto"></div>

          <p className="text-gray-400">
            Head over to your Dashboard to have full details about your order
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-12 space-y-4">
          <button
            onClick={() => navigate("/user")}
            className="w-full bg-amber-500 text-black font-bold py-4 px-6 rounded-lg hover:bg-amber-400 transition duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
          >
            Go To Your Dashboard
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full border-2 border-amber-500/30 text-amber-500 font-semibold py-4 px-6 rounded-lg hover:bg-amber-500/10 transition duration-300"
          >
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </div>
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            Questions?{" "}
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

export default CheckoutSuccess;
