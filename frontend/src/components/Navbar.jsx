import { useState } from "react";
import logo from "../assets/Logo_And_Name.JPG";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  Home,
  Package,
  Info,
  Phone,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  const menuItems = [
    { id: "home", label: "Home", path: "/", icon: Home },
    { id: "kit", label: "Kit", path: "/kit", icon: Package },
    { id: "about", label: "About", path: "/about", icon: Info },
    { id: "contact", label: "Contact", path: "/contact", icon: Phone },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    if (item.path) navigate(item.path);
    setIsMenuOpen(false);
  };

  const isActive = (itemId) => activeItem === itemId;

  return (
    <nav>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              className="w-16 rounded-xl cursor-pointer"
              src={logo}
              alt="Logo"
              onClick={() => {
                setActiveItem("home");
                navigate("/");
              }}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 border border-black/10 shadow font-semibold rounded-xl px-2 py-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
                    isActive(item.id)
                      ? "bg-black text-yellow-400"
                      : "hover:bg-black hover:text-amber-300"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ShoppingBag
              className="cursor-pointer hover:text-black"
              size={20}
            />
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <User className="hover:text-black" size={20} />
              <div className="absolute top-full right-0 pt-2 z-20 hidden group-hover:block">
                <div className="flex flex-col gap-3 p-4 rounded-lg shadow-md w-48">
                  <div
                    onClick={() => navigate("/login")}
                    className="hover:text-black cursor-pointer py-1 flex items-center gap-2"
                  >
                    <LogIn size={16} />
                    <span>Login</span>
                  </div>
                  <div
                    onClick={() => navigate("/register")}
                    className="hover:text-black cursor-pointer py-1 flex items-center gap-2"
                  >
                    <UserPlus size={16} />
                    <span>Register</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ShoppingBag className="cursor-pointer" size={20} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`cursor-pointer px-4 py-3 text-center font-bold rounded-lg transition-colors duration-200 flex items-center justify-center gap-1 ${
                      isActive(item.id)
                        ? "bg-black text-yellow-400"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>
                );
              })}
              <div className="flex font-bold flex-col items-center gap-3 px-4 pt-4 border-t">
                <div
                  onClick={() => navigate("/login")}
                  className="cursor-pointer py-2 hover:text-black flex items-center gap-1"
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </div>
                <div
                  onClick={() => navigate("/register")}
                  className="cursor-pointer py-2 hover:text-black flex items-center gap-1"
                >
                  <UserPlus size={16} />
                  <span>Register</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
