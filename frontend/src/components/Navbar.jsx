import { useState, useEffect, useRef, useCallback } from "react";
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const cartButtonRef = useRef(null);

  // Optimized body scroll prevention
  useEffect(() => {
    const updateBodyScroll = () => {
      if (isMenuOpen || isCartOpen) {
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
      } else {
        document.body.style.overflow = "unset";
        document.body.style.touchAction = "unset";
      }
    };

    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(updateBodyScroll);

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "unset";
    };
  }, [isMenuOpen, isCartOpen]);

  // Optimized click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        requestAnimationFrame(() => {
          setIsUserMenuOpen(false);
        });
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  // Optimized menu toggle
  const toggleMenu = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    requestAnimationFrame(() => {
      setIsMenuOpen((prev) => !prev);
      setTimeout(() => setIsAnimating(false), 300);
    });
  }, [isAnimating]);

  // Optimized cart toggle for mobile
  const toggleCart = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    requestAnimationFrame(() => {
      setIsCartOpen((prev) => !prev);
      setTimeout(() => setIsAnimating(false), 300);
    });
  }, [isAnimating]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  const handleDashboardNavigation = () => {
    navigate("/user/orders");
    setIsUserMenuOpen(false);
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
      {/* Updated CartSidebar with smoother animations */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => {
          requestAnimationFrame(() => {
            setIsCartOpen(false);
          });
        }}
      />

      <div className="container mx-auto sm:px-8 px-4 py-3 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center z-50">
            <img
              className={`w-24 rounded-xl cursor-pointer transition-opacity duration-200 ${
                isCartOpen ? "opacity-0" : "opacity-100"
              }`}
              src={logo}
              alt="Logo"
              onClick={() => navigate("/")}
              style={{
                willChange: "opacity",
                transform: "translateZ(0)",
              }}
            />
          </div>

          {/* ================= DESKTOP MENU ================= */}
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

          {/* ================= DESKTOP USER ACTIONS ================= */}
          <div className="hidden md:flex items-center gap-4 relative">
            {/* Cart */}
            <div className="relative">
              <div
                ref={cartButtonRef}
                onClick={toggleCart}
                className="cursor-pointer"
                style={{
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              >
                <ShoppingBag
                  className="text-amber-500 hover:text-amber-600 transition-colors duration-200"
                  size={20}
                />
                {totalQuantity > 0 && (
                  <span
                    className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transition-transform duration-200"
                    style={{
                      willChange: "transform",
                      transform: "translateZ(0)",
                    }}
                  >
                    {totalQuantity}
                  </span>
                )}
              </div>
            </div>

            {/* User (CLICKABLE) */}
            <div className="relative" ref={userMenuRef}>
              <div
                onClick={() => {
                  requestAnimationFrame(() => {
                    setIsUserMenuOpen((prev) => !prev);
                  });
                }}
                className="cursor-pointer"
                style={{
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              >
                {user ? (
                  <span className="font-bold text-black w-5 h-5 p-4 flex justify-center items-center text-xs rounded-full bg-amber-500 hover:bg-amber-600 transition-all duration-200">
                    {user.name[0].toUpperCase()}
                  </span>
                ) : (
                  <User
                    className="text-amber-500 hover:text-amber-600 transition-colors duration-200"
                    size={20}
                  />
                )}
              </div>

              {isUserMenuOpen && (
                <div className="absolute top-full right-0 pt-2 z-20">
                  <div
                    className="flex flex-col bg-amber-500/80 gap-3 p-4 rounded-lg shadow-md w-48 transform-gpu"
                    style={{
                      willChange: "transform, opacity",
                      animation: "slideDown 0.2s ease-out forwards",
                    }}
                  >
                    {user ? (
                      <>
                        <div
                          onClick={handleDashboardNavigation}
                          className="hover:text-amber-500 text-black cursor-pointer py-2 px-2 rounded-lg hover:bg-black flex items-center gap-2 transition-colors duration-200"
                        >
                          <User size={16} />
                          <span>Dashboard</span>
                        </div>

                        <div
                          onClick={handleLogout}
                          className="hover:text-amber-500 text-black cursor-pointer py-2 px-2 rounded-lg hover:bg-black flex items-center gap-2 transition-colors duration-200"
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          onClick={() => {
                            navigate("/login");
                            setIsUserMenuOpen(false);
                          }}
                          className="hover:text-amber-500 text-black cursor-pointer py-2 px-2 rounded-lg hover:bg-black flex items-center gap-2 transition-colors duration-200"
                        >
                          <LogIn size={16} />
                          <span>Login</span>
                        </div>

                        <div
                          onClick={() => {
                            navigate("/register");
                            setIsUserMenuOpen(false);
                          }}
                          className="hover:text-amber-500 text-black cursor-pointer py-2 px-2 rounded-lg hover:bg-black flex items-center gap-2 transition-colors duration-200"
                        >
                          <UserPlus size={16} />
                          <span>Register</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ================= MOBILE HEADER ================= */}
          <div
            className={`md:hidden flex items-center gap-4 z-50 transition-opacity duration-200 ${
              isCartOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            style={{ willChange: "opacity" }}
          >
            <div className="relative">
              <div
                onClick={toggleCart}
                className="cursor-pointer"
                style={{
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              >
                <ShoppingBag
                  className="text-amber-500 hover:text-amber-600 transition-colors duration-200"
                  size={20}
                />
                {totalQuantity > 0 && (
                  <span
                    className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full transition-transform duration-200"
                    style={{
                      willChange: "transform",
                      transform: "translateZ(0)",
                    }}
                  >
                    {totalQuantity}
                  </span>
                )}
              </div>
            </div>

            {user && (
              <span
                className="font-bold text-black w-5 h-5 p-4 flex justify-center items-center text-xs rounded-full bg-amber-500 hover:bg-amber-600 transition-all duration-200 cursor-pointer"
                style={{
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              >
                {user.name[0].toUpperCase()}
              </span>
            )}

            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-amber-500 hover:bg-gray-100 transition-all duration-200"
              style={{
                willChange: "transform, background-color",
                transform: "translateZ(0)",
              }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {isMenuOpen && (
          <>
            {/* Overlay with optimized animation */}
            <div
              className="md:hidden fixed inset-0 bg-black z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile menu container */}
            <div
              ref={mobileMenuRef}
              className="md:hidden fixed top-10 left-0 right-0 bottom-0 z-40 pt-20 overflow-y-auto"
              style={{
                willChange: "transform, opacity",
                animation: "slideIn 0.3s ease-out forwards",
              }}
            >
              <div className="container mx-auto sm:px-8 px-4">
                <div className="flex flex-col gap-2 border border-amber-500/40 shadow-2xl font-semibold rounded-xl p-2 mb-4 bg-black">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.id}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          `cursor-pointer px-4 py-3 rounded-lg transition-colors duration-200 
                          flex items-center justify-center gap-2 text-center transform-gpu ${
                            isActive
                              ? "bg-amber-500 text-black"
                              : "hover:bg-black hover:text-amber-600 text-amber-500"
                          }`
                        }
                        style={{ willChange: "background-color, color" }}
                      >
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>

                <div
                  className="border border-amber-500/40 shadow-2xl font-semibold rounded-xl p-4 bg-black transform-gpu"
                  style={{ willChange: "transform" }}
                >
                  {user ? (
                    <>
                      <div
                        onClick={handleDashboardNavigation}
                        className="cursor-pointer px-4 py-3 rounded-lg transition-colors duration-200 
                        flex items-center justify-center gap-2 text-amber-500 hover:bg-black hover:text-amber-600 mb-2 transform-gpu"
                        style={{ willChange: "background-color, color" }}
                      >
                        <User size={18} />
                        <span>Dashboard</span>
                      </div>

                      <div
                        onClick={handleLogout}
                        className="cursor-pointer px-4 py-3 rounded-lg transition-colors duration-200 
                        flex items-center justify-center gap-2 bg-amber-500 text-black hover:bg-amber-600 transform-gpu"
                        style={{ willChange: "background-color, color" }}
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        onClick={() => {
                          navigate("/login");
                          setIsMenuOpen(false);
                        }}
                        className="cursor-pointer px-4 py-3 rounded-lg transition-colors duration-200 
                        flex items-center justify-center gap-2 text-amber-500 hover:bg-black hover:text-amber-600 mb-2 transform-gpu"
                        style={{ willChange: "background-color, color" }}
                      >
                        <LogIn size={18} />
                        <span>Login</span>
                      </div>

                      <div
                        onClick={() => {
                          navigate("/register");
                          setIsMenuOpen(false);
                        }}
                        className="cursor-pointer px-4 py-3 rounded-lg transition-colors duration-200 
                        flex items-center justify-center gap-2 bg-amber-500 text-black hover:bg-amber-600 transform-gpu"
                        style={{ willChange: "background-color, color" }}
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

      {/* Add these styles for smooth animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.5;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Force GPU acceleration for smoother animations */
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Optimize transition performance */
        .transition-all,
        .transition-colors,
        .transition-opacity,
        .transition-transform {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-font-smoothing: subpixel-antialiased;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
