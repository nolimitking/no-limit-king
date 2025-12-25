import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { mergeCart, getCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success, user } = useSelector((state) => state.auth);

  // Update form value
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    const handleSuccessfulLogin = async () => {
      if (success && user) {
        try {
          toast.success(success);

          // Check if there is a guest cart
          const guestCart = JSON.parse(
            localStorage.getItem("guestCart") || "[]"
          );

          if (guestCart.length > 0) {
            // Merge guest cart with user cart
            const result = await dispatch(mergeCart(guestCart)).unwrap();

            if (mergeCart.fulfilled.match(result)) {
              toast.info("Your cart has been merged with your account");
            } else {
              toast.warn("Could not merge guest cart. Loading your cart...");
            }
          }

          // Fetch user cart after merge or if no guest cart
          dispatch(getCart());

          // Navigate to orders/dashboard
          navigate("/user/orders");
        } catch (err) {
          console.error("Cart merge error:", err);
          toast.error("Error merging cart. Proceeding to your orders.");
          navigate("/user/orders");
        }
      } else if (error) {
        toast.error(error);
      }
    };

    handleSuccessfulLogin();
  }, [success, error, user, navigate, dispatch]);

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-80 w-16 h-16 border-2 border-amber-500/30 rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 border-2 border-amber-500/20 rounded-full"></div>
        <div className="absolute top-1/3 right-20 w-8 h-8 border border-amber-500/30 rotate-12"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="border border-amber-500/30 px-3 py-2 rounded-xl mb-8 text-white hover:bg-amber-500/10"
        >
          Back To Home
        </button>

        <div className="bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-amber-500/20">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-200 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Mail className="w-5 h-5 text-amber-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-200/10 border border-gray-200/20 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-500 text-gray-200"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-400">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-amber-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-gray-200/10 border border-gray-200/20 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-500 text-gray-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-amber-500 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="font-semibold text-amber-500 cursor-pointer hover:text-amber-400 transition-colors"
              >
                Register
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
