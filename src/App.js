import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import QrCode from './pages/QrCode';
import AnalyticsPage from './pages/AnalyticsPage'; // Updated import
import Signup from './pages/Signup';
import QRCodeGenerator from './components/QRCodeGenerator';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/qr-code",
        element: <QRCodeGenerator />,
      },
      {
        path: "/analytics",
        element: <AnalyticsPage />, // Ensure AnalyticsPage fetches analytics data
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      // Add a route for /sms that will serve the sms.js file from public directory
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
