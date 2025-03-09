import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.token);

  const links = [
    { href: "/", label: "Home" },
    { href: "/calculator", label: "Food conservation Calculator" },
    { href: "/volunteer", label: "Volunteer" },
    { href: "/quiz", label: "Quiz" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-ocean-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-ocean-600">
                foodWise
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-ocean-100 text-ocean-600"
                    : "text-gray-600 hover:bg-ocean-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <Button variant="outline" className="ml-4" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="ml-4">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.href)
                    ? "bg-ocean-100 text-ocean-600"
                    : "text-gray-600 hover:bg-ocean-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-ocean-50"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-ocean-50"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
