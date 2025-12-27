import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Menu, User } from "lucide-react";
import SignInOverlay from "../AuthComponent/SignInOverlay";
import { useState } from "react";
import { AuthContext } from "../config/AuthContext";
import ProfileMenu from "../HeaderComponent/ProfileMenue";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const {folkEmail}=useContext(AuthContext);

  const handleSignIn = () => {
    setShowSignIn(true);
  };

  const handleClick = () => {};

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-[1000]">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">LS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              LocalServices
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={handleClick}
              className="text-gray-600 hover:text-blue-500 font-medium transition-colors"
            >
              Services
            </button>
            <button
              onClick={handleClick}
              className="text-gray-600 hover:text-blue-500 font-medium transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={handleClick}
              className="text-gray-600 hover:text-blue-500 font-medium transition-colors"
            >
              About Us
            </button>
            <button
              onClick={handleClick}
              className="text-gray-600 hover:text-blue-500 font-medium transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Sign In */}
            {(folkEmail)?<ProfileMenu/>:
            <button
              onClick={handleSignIn}
              className=" sm:flex items-center gap-2 text-gray-700 hover:text-blue-500 hover:bg-blue-50 px-3 py-2 rounded-md transition-all"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </button>
             }            
            {showSignIn && (
              <SignInOverlay
                onClose={() => setShowSignIn(false)}
                onSubmit={({ email, password }) => {
                  console.log(email, password);
                  setShowSignIn(false);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
