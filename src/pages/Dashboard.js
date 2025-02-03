import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/firebase"; // Ensure firebase is correctly configured
import { signOut } from "firebase/auth";

const Dashboard = () => {
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signup"); // Redirect to signup after logout
  };

  // Navigate to respective pages
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">HAQR Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <button
                onClick={() => handleNavigation('/')}
                className="block py-2 px-4 rounded hover:bg-blue-500"
              >
                Home
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => handleNavigation("/qr-code")}
                className="block py-2 px-4 rounded hover:bg-blue-500"
              >
                QR Code Generator
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => handleNavigation("/analytics")}
                className="block py-2 px-4 rounded hover:bg-blue-500"
              >
                Analytics
              </button>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 px-4 py-2 rounded w-full"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your QR codes and track analytics easily.
          </p>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-3 gap-6">
            <div
              onClick={() => handleNavigation("/qr-code")}
              className="bg-indigo-600 text-white p-6 rounded-lg shadow-lg cursor-pointer"
            >
              <h3 className="text-xl font-semibold">Generate QR Code</h3>
              <p className="mt-2">Create custom QR codes for your business.</p>
            </div>
            <div
              onClick={() => handleNavigation("/analytics")}
              className="bg-green-500 text-white p-6 rounded-lg shadow-lg cursor-pointer"
            >
              <h3 className="text-xl font-semibold">View Analytics</h3>
              <p className="mt-2">Track your QR code performance.</p>
            </div>
            <div
              onClick={() => handleNavigation("/pricing")}
              className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg cursor-pointer"
            >
              <h3 className="text-xl font-semibold">Upgrade Plan</h3>
              <p className="mt-2">Unlock premium features.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
