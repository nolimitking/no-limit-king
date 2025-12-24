import { useState, useEffect } from "react";
import logo from "../assets/Logo_And_Name.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  Home,
  Info,
  Phone,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import CartSidebar from "./CartSidebar";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Prevent body scroll when mobile menu OR cart is open
  useEffect(() => {
    if (isMenuOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isCartOpen]);

  // Clear localStorage and head the user to the home page
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsMenuOpen(false);
  };

  // Handle dynamic routes
  const handleDashboardNavigation = () => {
    navigate("/user/orders");
    setIsMenuOpen(false);
  };

  const menuItems = [
    { id: "home", label: "Home", path: "/", icon: Home },
    { id: "about", label: "About", path: "/about", icon: Info },
    { id: "contact", label: "Contact", path: "/contact", icon: Phone },
  ];

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav>
      {/* Cart Sidebar Component */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <div className="container mx-auto sm:px-8 px-4 py-3 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center z-50">
            <img
              className={`w-24 rounded-xl cursor-pointer ${
                isCartOpen && "hidden"
              }`}
              src={logo}
              alt="Logo"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 border border-amber-500/40 shadow-2xl font-semibold rounded-xl px-2 py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
                      isActive
                        ? "bg-amber-500 text-black"
                        : "hover:bg-black hover:text-amber-600 text-amber-500"
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Icon with Badge */}
            <div className="relative">
              <ShoppingBag
                onClick={() => setIsCartOpen(true)}
                className="cursor-pointer text-amber-500 hover:text-amber-600"
                size={20}
              />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQuantity}
                </span>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2 cursor-pointer group relative">
              {user ? (
                <span
                  onClick={handleDashboardNavigation}
                  className="font-bold text-black w-5 h-5 p-4 flex justify-center items-center text-xs rounded-full bg-amber-500 hover:bg-amber-600 transition-all cursor-pointer"
                >
                  {user.name[0].toUpperCase()}
                </span>
              ) : (
                <User
                  className="text-amber-500 hover:text-amber-600"
                  size={20}
                />
              )}
              <div className="absolute top-full right-0 pt-2 z-20 hidden group-hover:block">
                <div className="flex flex-col bg-amber-500/80 gap-3 p-4 rounded-lg shadow-md w-48">
                  {user ? (
                    <div
                      onClick={handleLogout}
                      className="hover:text-amber-500 text-black cursor-pointer py-2 px-2 rounded-lg hover:bg-black flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </div>
                  ) : (
                    <>
                      <div
                        onClick={() => navigate("/login")}
                        className="hover:text-amber-500 text-black cursor-pointer py-2 px-2 rounded-lg hover:bg-black flex items-center gap-2"
                      >
                        <LogIn size={16} />
                        <span>Login</span>
                      </div>
                      <div
                        onClick={() => navigate("/register")}
                        className="hover:text-amber-500 hover:bg-black py-2 px-2 rounded-lg text-black cursor-pointer flex items-center gap-2"
                      >
                        <UserPlus size={16} />
                        <span>Register</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div
            className={`md:hidden flex items-center gap-4 z-50 ${
              isCartOpen ? "hidden" : ""
            }`}
          >
            {/* Cart Icon with Badge for Mobile */}
            <div className="relative">
              <ShoppingBag
                onClick={() => setIsCartOpen(true)}
                className="cursor-pointer text-amber-500 hover:text-amber-600"
                size={20}
              />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQuantity}
                </span>
              )}
            </div>

            {/* Show user badge in mobile header when logged in */}
            {user && (
              <span
                onClick={handleDashboardNavigation}
                className="font-bold text-black w-5 h-5 p-4 flex justify-center items-center text-xs rounded-full bg-amber-500 hover:bg-amber-600 transition-all cursor-pointer"
              >
                {user.name[0].toUpperCase()}
              </span>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-amber-500 hover:bg-gray-100 transition-colors duration-200 z-50"
            >
              {isMenuOpen ? (
                <X size={24} className="text-amber-500" />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop overlay - prevents interaction with page behind */}
            <div
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu Content */}
            <div className="md:hidden fixed top-10 left-0 right-0 bottom-0 z-40 pt-20 overflow-y-auto">
              <div className="container mx-auto sm:px-8 px-4">
                {/* Mobile Navigation Menu */}
                <div className="flex flex-col gap-2 border border-amber-500/40 shadow-2xl font-semibold rounded-xl p-2 mb-4 bg-black">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.id}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          `cursor-pointer px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
                            isActive
                              ? "bg-amber-500 text-black"
                              : "hover:bg-black hover:text-amber-600 text-amber-500"
                          }`
                        }
                      >
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>

                {/* Mobile User Actions */}
                <div className="border border-amber-500/40 shadow-2xl font-semibold rounded-xl p-4 bg-black">
                  {user ? (
                    <>
                      {/* User Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-bold text-black w-8 h-8 p-5 flex justify-center items-center text-sm rounded-full bg-amber-500">
                          {user.name[0].toUpperCase()}
                        </span>
                        <div>
                          <p className="text-amber-500 font-bold">
                            {user.name}
                          </p>
                          <p className="text-amber-500/80 text-sm">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      {/* Dashboard Button */}
                      <div
                        onClick={handleDashboardNavigation}
                        className="cursor-pointer px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 text-amber-500 hover:bg-black hover:text-amber-600 mb-2"
                      >
                        <User size={18} />
                        <span>Dashboard</span>
                      </div>

                      {/* Logout Button */}
                      <div
                        onClick={handleLogout}
                        className="cursor-pointer px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 bg-amber-500 text-black hover:bg-amber-600"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Login Button */}
                      <div
                        onClick={() => {
                          navigate("/login");
                          setIsMenuOpen(false);
                        }}
                        className="cursor-pointer px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 text-amber-500 hover:bg-black hover:text-amber-600 mb-2"
                      >
                        <LogIn size={18} />
                        <span>Login</span>
                      </div>

                      {/* Register Button */}
                      <div
                        onClick={() => {
                          navigate("/register");
                          setIsMenuOpen(false);
                        }}
                        className="cursor-pointer px-4 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 bg-amber-500 text-black hover:bg-amber-600"
                      >
                        <UserPlus size={18} />
                        <span>Register</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
