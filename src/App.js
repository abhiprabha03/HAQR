<<<<<<< HEAD
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import QrCode from "./pages/QrCode";
import AnalyticsPage from "./pages/AnalyticsPage";
import Signup from "./components/Signup";
import QRCodeGenerator from "./components/QRCodeGenerator";
import PremiumPage from "./components/PurschasePlans";
import Dashboard from "./pages/Dashboard";
import Login from "./components/LoginPage"; // ✅ Import Login Page
=======
import React,{useState} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import QrCode from './pages/QrCode';
import AnalyticsPage from './pages/AnalyticsPage'; // Updated import
import Signup from './pages/Signup';
import QRCodeGenerator from './components/QRCodeGenerator';
>>>>>>> 98ab272f02e28411d01471a2f82f9b0f4eb496a2

const router = createBrowserRouter([
  {
    
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/qr-code", element: <QRCodeGenerator /> },
      { path: "/analytics", element: <AnalyticsPage /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> }, // ✅ Login Page Route
      { path: "/pricing", element: <PremiumPage /> },
      { path: "/dashboard", element: <Dashboard /> }, 
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
