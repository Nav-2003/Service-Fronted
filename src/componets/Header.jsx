import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { NavLink } from "react-router-dom";
import SignInOverlay from "../AuthComponent/SignInOverlay";
import { AuthContext } from "../config/AuthContext";
import ProfileMenu from "../HeaderComponent/ProfileMenue";

const navClass = ({ isActive }) =>
  `font-medium transition-colors relative
   ${
     isActive
       ? "text-blue-600 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-600"
       : "text-gray-600 hover:text-blue-500"
   }`;

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const { folkEmail } = useContext(AuthContext);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white border-b sticky top-0 z-[1100] shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">LS</span>
          </div>
          <span className="text-xl font-bold text-gray-900">
            LocalServices
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/services" className={navClass}>
            Services
          </NavLink>

          <NavLink to="/howitwork" className={navClass}>
            How It Works
          </NavLink>

          <NavLink to="/about" className={navClass}>
            About Us
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {folkEmail ? (
            <ProfileMenu />
          ) : (
            <button
              onClick={() => setShowSignIn(true)}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500 hover:bg-blue-50 px-3 py-2 rounded-md transition-all"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {showSignIn && (
          <SignInOverlay onClose={() => setShowSignIn(false)} />
        )}
      </div>
    </motion.header>
  );
};

export default Header;
