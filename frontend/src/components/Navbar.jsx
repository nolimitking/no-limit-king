import { useState } from "react";
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

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Clear localStorage and head the user to the home page
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsMenuOpen(false);
  };

  // Handle dynamic routes
  const handleDashboardNavigation = () => {
    navigate("/user/dashboard");
    setIsMenuOpen(false);
  };

  const menuItems = [
    { id: "home", label: "Home", path: "/", icon: Home },
    { id: "about", label: "About", path: "/about", icon: Info },
    { id: "contact", label: "Contact", path: "/contact", icon: Phone },
  ];

  return (
    <nav>
      <div className="container mx-auto sm:px-8 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              className="w-24 rounded-xl cursor-pointer"
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
            <ShoppingBag
              className="cursor-pointer text-amber-500 hover:text-amber-600"
              size={20}
            />
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
          <div className="md:hidden flex items-center gap-4">
            <ShoppingBag className="cursor-pointer text-amber-500" size={20} />
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
              className="p-2 rounded-lg text-amber-500 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X size={24} className="text-amber-500" />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - With Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute inset-y-0 right-0 w-full max-w-sm bg-black/80 shadow-2xl transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-amber-500/20">
              <div className="flex items-center justify-between">
                <img className="w-24" src={logo} alt="Logo" />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-amber-500/20 transition-colors"
                >
                  <X size={24} className="text-amber-500" />
                </button>
              </div>
              {/* User info in mobile menu header */}
              {user && (
                <div className="mt-4 flex items-center gap-3 p-3 bg-amber-500/20 rounded-lg">
                  <div className="font-bold text-black w-8 h-8 flex justify-center items-center text-sm rounded-full bg-amber-500">
                    {user.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-amber-500 font-semibold">{user.name}</p>
                    <p className="text-amber-500/70 text-sm">{user.email}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-6 px-4">
              <div className="flex flex-col gap-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `cursor-pointer px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] ${
                          isActive
                            ? "bg-amber-500 text-black shadow-lg"
                            : "hover:bg-amber-600 text-amber-500"
                        }`
                      }
                    >
                      <Icon size={22} />
                      <span className="text-lg font-semibold">
                        {item.label}
                      </span>
                    </NavLink>
                  );
                })}
              </div>

              {/* User Actions */}
              <div className="mt-8 pt-6 border-t border-amber-500/20">
                <div className="flex flex-col gap-2">
                  {user ? (
                    <>
                      {/* Dashboard Button */}
                      <div
                        onClick={handleDashboardNavigation}
                        className="cursor-pointer px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-amber-600 text-amber-500"
                      >
                        <User size={22} />
                        <span className="text-lg font-semibold">Dashboard</span>
                      </div>
                      {/* Logout Button */}
                      <div
                        onClick={handleLogout}
                        className="cursor-pointer px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-amber-600 text-amber-500"
                      >
                        <LogOut size={22} />
                        <span className="text-lg font-semibold">Logout</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        onClick={() => {
                          navigate("/login");
                          setIsMenuOpen(false);
                        }}
                        className="cursor-pointer px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-amber-600 text-amber-500"
                      >
                        <LogIn size={22} />
                        <span className="text-lg font-semibold">Login</span>
                      </div>
                      <div
                        onClick={() => {
                          navigate("/register");
                          setIsMenuOpen(false);
                        }}
                        className="cursor-pointer px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-amber-600 text-amber-500"
                      >
                        <UserPlus size={22} />
                        <span className="text-lg font-semibold">Register</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-amber-500/20">
              <div className="text-center text-amber-500/60 text-sm">
                <p>© 2024 Your Brand</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
