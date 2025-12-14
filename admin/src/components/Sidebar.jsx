import {
  FiHome,
  FiShoppingCart,
  FiPackage,
  FiChevronRight,
  FiPlus,
} from "react-icons/fi";
import { HiViewfinderCircle } from "react-icons/hi2";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  const menuItems = [
    {
      label: "Overview",
      icon: HiViewfinderCircle,
      path: "/admin/dashboard",
    },
    {
      label: "All Products",
      icon: FiPackage,
      path: "/admin/products",
    },
    {
      label: "All Orders",
      icon: FiShoppingCart,
      path: "/admin/orders",
    },
    {
      label: "Back Home",
      icon: FiHome,
      path: "http://localhost:5173",
      external: true,
    },
  ];

  const quickActions = [
    {
      label: "Add New Product",
      icon: FiPlus,
      path: "/admin/add/product",
    },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 w-64 bg-gray-900 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:translate-x-0 md:static`}
    >
      {/* Header */}
      <div className="pb-6 pt-8 px-6 flex justify-between items-center border-b border-gray-800">
        <div>
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-xs text-gray-400 mt-1">Management Panel</p>
        </div>
        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={toggleSidebar}
        >
          ✕
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-3">
          Main Navigation
        </p>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.external) {
                  window.location.href = item.path;
                } else {
                  navigate(item.path);
                  if (toggleSidebar) toggleSidebar();
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-amber-500 text-black shadow-lg"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <div className="flex items-center">
                <item.icon
                  className={`w-5 h-5 ${
                    isActive(item.path) ? "text-black" : "text-gray-400"
                  }`}
                />
                <span className="ml-3 font-medium">{item.label}</span>
              </div>
              <FiChevronRight
                className={`w-4 h-4 ${
                  isActive(item.path) ? "text-black" : "text-gray-500"
                }`}
              />
            </button>
          ))}
        </div>
      </nav>

      {/* Add product Button */}
      <div className="mt-8 px-4">
        <div className="space-y-2">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => {
                navigate(action.path);
                if (toggleSidebar) toggleSidebar();
              }}
              className="w-full flex items-center px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200 group border border-gray-700 hover:border-amber-500"
            >
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center mr-3 group-hover:bg-amber-500/30 transition-colors">
                <action.icon className="w-4 h-4 text-amber-500" />
              </div>
              <span className="font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
