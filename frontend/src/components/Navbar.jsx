import logo from "../assets/Logo_And_Name.JPG";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const menuItems = ["Home", "Kit", "About", "Contact"];

  return (
    <nav className="w-full">
      <div className="mt-4 flex justify-between items-center px-4">
        {/* LOGO */}
        <img className="w-16 rounded-xl cursor-pointer" src={logo} alt="logo" />

        {/* MENU DESKTOP */}
        <div className="hidden md:flex gap-4 items-center border border-black/10 shadow font-semibold rounded-xl py-2 px-2">
          {menuItems.map((item) => (
            <p
              key={item}
              onClick={() => {
                setActive(item);
                navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`);
              }}
              className={`px-4 py-2 cursor-pointer rounded-xl ${
                active === item
                  ? "text-yellow-400 bg-black"
                  : "hover:text-yellow-400"
              }`}
            >
              {item}
            </p>
          ))}
        </div>

        {/* RIGHT ICONS */}
        <div className="flex gap-3 md:gap-2 md:flex">
          <ShoppingBag className="cursor-pointer" />

          {/* USER MENU */}
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <User />
            <div className="absolute top-0 right-0 pt-6 z-20 hidden group-hover:block">
              <div className="flex flex-col gap-4 p-4 rounded bg-yellow-600 w-48">
                <p
                  onClick={() => navigate("/login")}
                  className="hover:text-black cursor-pointer"
                >
                  Login
                </p>
                <p
                  onClick={() => navigate("/register")}
                  className="hover:text-black cursor-pointer"
                >
                  Register
                </p>
              </div>
            </div>
          </div>

          {/* HAMBURGER ICON - MOBILE ONLY */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="flex flex-col gap-4 mt-4 px-4 pb-4 border-t border-black/10 md:hidden">
          {menuItems.map((item) => (
            <p
              key={item}
              onClick={() => {
                setActive(item);
                setIsOpen(false);
                navigate(item === "Home" ? "/" : `/${item.toLowerCase()}`);
              }}
              className={`px-4 py-2 rounded-xl font-semibold cursor-pointer ${
                active === item
                  ? "text-yellow-400 bg-black"
                  : "hover:text-yellow-400"
              }`}
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
