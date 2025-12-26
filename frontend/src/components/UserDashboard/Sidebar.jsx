import { FiHome, FiShoppingCart, FiChevronRight } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  const menuItems = [
    {
      label: "My Orders",
      icon: FiShoppingCart,
      path: "/user/orders",
    },
    {
      label: "Back Home",
      icon: FiHome,
      path: "https://www.nolimitking.com",
      external: true,
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
          <h1
            onClick={() => navigate("/user/orders")}
            className="text-xl font-bold text-white cursor-pointer"
          >
            Client Dashboard
          </h1>
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
    </aside>
  );
};

export default Sidebar;
