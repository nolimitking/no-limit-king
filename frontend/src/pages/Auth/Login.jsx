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

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  // Handle login success + cart merge + redirect
  useEffect(() => {
    if (!success || !user) return;

    const afterLoginFlow = async () => {
      try {
        toast.success(success);

        const guestId = localStorage.getItem("guestId");

        if (guestId) {
          // 🔥 WAIT for merge to finish
          await dispatch(mergeCart()).unwrap();
        }

        // 🔥 ALWAYS fetch updated cart
        await dispatch(getCart()).unwrap();

        // ✅ Redirect AFTER everything
        navigate("/checkout");
      } catch (err) {
        console.error("Login / Cart merge error:", err);

        // Fallback redirect
        navigate("/checkout");
      }
    };

    afterLoginFlow();
  }, [success, user, dispatch, navigate]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-80 w-16 h-16 border-2 border-amber-500/30 rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 border-2 border-amber-500/20 rounded-full"></div>
        <div className="absolute top-1/3 right-20 w-8 h-8 border border-amber-500/30 rotate-12"></div>
      </div>

      {/* Login Card */}
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
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-200/10 border border-gray-200/20 rounded-xl text-gray-200 focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-gray-200/10 border border-gray-200/20 rounded-xl text-gray-200 focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500"
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
              className="w-full py-3 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-600 transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-amber-500 cursor-pointer font-semibold"
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
