import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";
import { mergeCart, getCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success, user } = useSelector((state) => state.auth);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    dispatch(registerUser(formData));
  };

  // Handle success + cart merge
  // Fixed version:
  useEffect(() => {
    const handleSuccessfulRegister = async () => {
      if (success && user) {
        try {
          toast.success("You are registered successfully");

          const guestId = localStorage.getItem("guestId");

          if (guestId) {
            try {
              // AWAIT the mergeCart dispatch
              await dispatch(mergeCart()).unwrap();
              toast.info("Your cart has been merged with your account");
            } catch (mergeError) {
              console.log("Cart merge failed, fetching user cart anyway");
            }
          }

          // Always fetch cart after registration
          await dispatch(getCart()).unwrap();

          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });

          navigate("/user/orders");
        } catch (err) {
          console.error("Registration flow error:", err);
          navigate("/user/orders");
        }
      } else if (error) {
        toast.error(error);
      }
    };

    handleSuccessfulRegister();
  }, [success, error, user, dispatch, navigate]);
  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-80 w-16 h-16 border-2 border-amber-500/30 rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 border-2 border-amber-500/20 rounded-full"></div>
        <div className="absolute top-1/3 right-20 w-8 h-8 border border-amber-500/30 rotate-12"></div>
      </div>

      {/* Register Card */}
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
              Create Account
            </h1>
            <p className="text-gray-400">Register to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-200/10 border border-gray-200/20 rounded-xl text-gray-200"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

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
                  className="w-full pl-12 pr-4 py-3 bg-gray-200/10 border border-gray-200/20 rounded-xl text-gray-200"
                  placeholder="Enter your email"
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
                  className="w-full pl-12 pr-12 py-3 bg-gray-200/10 border border-gray-200/20 rounded-xl text-gray-200"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-gray-200/10 border border-gray-200/20 rounded-xl text-gray-200"
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-500 text-black font-semibold rounded-xl"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-amber-500 cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
