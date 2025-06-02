import React from "react";
import { User, Code, LogOut, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-gray-900 to-gray-800 shadow-xl">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="../../public/leetlab.svg" 
                className="h-10 w-10 bg-blue-500/20 text-blue-500 p-1.5 rounded-lg" 
                alt="LeetLab Logo"
              />
              <span className="text-xl font-bold text-white hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                LeetLab
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {authUser?.role === "ADMIN" && (
                <Link
                  to="/add-problem"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors duration-200"
                >
                  <Code className="w-4 h-4" />
                  Add Problem
                </Link>
              )}
              <Link
                to="/profile"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors duration-200"
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
              
              {/* User Profile Dropdown */}
              <div className="relative ml-3">
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500">
                      <img
                        src={
                          authUser?.image ||
                          "https://avatar.iran.liara.run/public/boy"
                        }
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-gray-300 text-sm font-medium hidden lg:inline">
                      {authUser?.name}
                    </span>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-800 rounded-box w-52 space-y-1 border border-gray-700"
                  >
                    <li className="px-4 py-2 text-sm text-gray-400">
                      Signed in as <div className="font-medium text-white">{authUser?.name}</div>
                    </li>
                    <li className="border-t border-gray-700"></li>
                    <li>
                      <LogoutButton className="hover:bg-red-500 hover:text-white text-gray-300 w-full text-left">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </LogoutButton>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {authUser?.role === "ADMIN" && (
              <Link
                to="/add-problem"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Code className="w-5 h-5" />
                Add Problem
              </Link>
            )}
            <Link
              to="/profile"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User className="w-5 h-5" />
              Profile
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full border-2 border-blue-500"
                  src={
                    authUser?.image ||
                    "https://avatar.iran.liara.run/public/boy"
                  }
                  alt="User Avatar"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">
                  {authUser?.name}
                </div>
                <div className="text-sm font-medium text-gray-400">
                  {authUser?.email}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <LogoutButton
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <LogOut className="w-5 h-5" />
                  Sign out
                </div>
              </LogoutButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;