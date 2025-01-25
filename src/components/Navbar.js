import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Home, BarChart2, UserPlus } from 'lucide-react';

const NavLink = ({ to, icon, text, className = "" }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-gray-200 hover:text-white transition-colors text-lg ${className}`}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-md shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <QrCode size={40} className="text-blue-500" />
            <span className="text-2xl font-extrabold text-white">HaQR</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            <NavLink to="/" icon={<Home size={28} />} text="Home" />
            <NavLink to="/qr-code" icon={<QrCode size={28} />} text="QR Code" />
            <NavLink to="/analytics" icon={<BarChart2 size={28} />} text="Analytics" />
            <NavLink to="/signup" icon={<UserPlus size={28} />} text="Sign Up" className="bg-blue-600 hover:bg-blue-700" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
