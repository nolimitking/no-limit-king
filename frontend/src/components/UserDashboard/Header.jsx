import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  // Get user info from Redux store
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // Extract user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return "AU";

    const nameParts = user.name.trim().split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    return (
      nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
    ).toUpperCase();
  };
  return (
    <header className="w-full bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center">
        <button
          className="md:hidden text-amber-500 hover:text-amber-400 mr-4 transition-colors"
          onClick={toggleSidebar}
        >
          <FiMenu className="w-6 h-6" />
        </button>
        <h2
          onClick={() => navigate("/user/dashboard")}
          className="text-xl font-bold text-white cursor-pointer"
        >
          Overview
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        {/* User Profile */}
        <div className="flex items-center ml-2 pl-4 border-l border-gray-700">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
            <span className="text-black font-bold text-sm">
              {getUserInitials()}
            </span>
          </div>
          <div className="ml-3 hidden md:block">
            <p className="text-sm font-medium text-white">
              {user?.name || "Admin User"}
            </p>
            <p className="text-xs text-gray-400">
              {user?.role === "admin"
                ? "Administrator"
                : user?.role
                ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                : "User"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
