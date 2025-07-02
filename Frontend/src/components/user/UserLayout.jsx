import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Optional: Lucide icons

const UserLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 sticky top-0 z-50">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-gray-700">RentMate</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
            <Link to="/user/dashboard" className="hover:text-indigo-600">Home</Link>
            <Link to="/user/properties" className="hover:text-indigo-600">Properties</Link>
            <Link to="/user/wishlist" className="hover:text-indigo-600">Wishlist</Link>
          </div>

          {/* Search Input */}
          <div className="hidden md:flex items-center gap-3">
            <input
              type="text"
              placeholder="Search properties..."
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm w-48 focus:outline-none focus:ring focus:border-indigo-400"
            />
            <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition text-sm">
              Search
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="mt-4 md:hidden flex flex-col gap-4 text-gray-700 font-medium">
            <Link to="/user/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">
              Home
            </Link>
            <Link to="/user/properties" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">
              Properties
            </Link>
            <Link to="/user/wishlist" onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">
              Wishlist
            </Link>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm w-full focus:outline-none focus:ring focus:border-indigo-400"
              />
              <button className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm">Go</button>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main className="pt-6">{children}</main>
    </div>
  );
};

export default UserLayout;

