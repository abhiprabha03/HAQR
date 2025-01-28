import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PremiumPlans = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const plans = [
    {
      title: "Basic Plan",
      price: "20",
      description: "Perfect for individuals starting their journey with our platform.",
      features: ["Basic Analytics", "5 QR Codes", "Email Support", "Core Features   "]
    },
    {
      title: "Standard Plan",
      price: "50",
      description: "Ideal for growing businesses with advanced needs.",
      features: ["Advanced Analytics", "15 QR Codes", "24/7 Support", "API Access", "Premium Features   "]
    },
    {
      title: "Premium Plan",
      price: "100",
      description: "Enterprise-grade solution with unlimited access.",
      features: ["Custom Analytics", "Unlimited QR Codes", "24/7 Priority Support", "API Access", "Custom Integration", "Dedicated Manager   "]
    }
  ];

  const handlePurchase = (planTitle) => {
    console.log(`${planTitle} selected`);
    // Add purchase logic here
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium text-gray-700">Loading plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-200 py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Choose Your Perfect Plan
          </h1>
          <p className="text-lg text-gray-700">
            Select a plan that best suits your needs and start generating professional QR codes today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg transition duration-300 hover:shadow-2xl hover:scale-105">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-center mb-4">{plan.title}</h2>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-indigo-600">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mb-6 text-center">{plan.description}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePurchase(plan.title)}
                  className="w-full bg-indigo-600 text-white py-4 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-6"
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-4 rounded-md hover:bg-indigo-50 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlans;