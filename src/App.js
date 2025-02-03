import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import QrCode from "./pages/QrCode";
import AnalyticsPage from "./pages/AnalyticsPage";
import Signup from "./components/Signup";
import QRCodeGenerator from "./components/QRCodeGenerator";
import PremiumPage from "./components/PurschasePlans";
import Dashboard from "./pages/Dashboard"; // Import Dashboard

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/qr-code", element: <QRCodeGenerator /> },
      { path: "/analytics", element: <AnalyticsPage /> },
      { path: "/signup", element: <Signup /> },
      { path: "/pricing", element: <PremiumPage /> },
      { path: "/dashboard", element: <Dashboard /> }, // ✅ Added Dashboard Route
      {
        path: "/sms",
        element: (
          <div>
            <h1>Send SMS</h1>
            <script src="/sms.js"></script>
          </div>
        ),
      },
    ],
  },
]);

// Main App component rendering RouterProvider with the defined router
function App() {
  return <RouterProvider router={router} />;
}

export default App;
