// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

// Star Component
const Star = ({ style }) => (
  <div
    className="absolute rounded-full bg-white"
    style={{
      width: style.size || '2px',
      height: style.size || '2px',
      boxShadow: `0 0 ${parseInt(style.size || '2')}px rgba(255, 255, 255, 0.8)`,
      opacity: style.opacity || 0.5,
      ...style,
    }}
  />
);

// StarField Component
const StarField = () => {
  React.useEffect(() => {
    // Ensure keyframes are added to the document head
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes starFall {
        0% { transform: translateY(-100vh); opacity: 0; }
        10% { opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => document.head.removeChild(styleSheet);
  }, []);

  // Generate stars with properties for animation
  const stars = React.useMemo(() => 
    Array.from({ length: 200 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * -100}vh`, // Start off-screen
      size: `${Math.random() * 2 + 1}px`,
      animationDuration: `${Math.random() * 20 + 30}s`,
      animationDelay: `-${Math.random() * 30}s`,
      opacity: Math.random() * 0.7 + 0.3,
    })), []
  );

  return (
    <div className="fixed inset-0 bg-slate-900 -z-10 overflow-hidden">
      {stars.map((style, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            ...style,
            width: style.size,
            height: style.size,
            animation: `starFall ${style.animationDuration} linear infinite`,
          }}
        />
      ))}
    </div>
  );
};

const Layout = () => {
  return (
    <div className="min-h-screen relative">
      <StarField />
      <Navbar />
      <main className="relative pt-20">
        <Outlet /> {/* Renders the child route component */}
      </main>
      <footer>
        {/* Footer Content */}
      </footer>
    </div>
  );
};


export default Layout;
