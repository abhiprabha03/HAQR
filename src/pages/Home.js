import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-200 to-indigo-200 text-gray-900 h-[70vh] w-full py-12 px-6 md:px-16 rounded-xl overflow-hidden mt-12">
        <div className="container mx-auto text-center z-10 relative grid md:grid-cols-2 gap-8 items-center">
          {/* Call-to-Action Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 mb-6 shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Transform Your Business Today
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Get started with our unique platform to design.
            </p>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/pricing')}
                className="w-full bg-indigo-600 text-white py-4 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2"
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
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
                Try Freemium
              </button>
              <button 
                onClick={() => navigate('/demo')}
                className="w-full bg-white text-indigo-600 border-2 border-indigo-600 py-4 rounded-md hover:bg-indigo-50 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-2"
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
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Feature Preview */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Why Choose Us?
              </h2>
              <ul className="space-y-4 text-left">
                <li className="flex items-center gap-3">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Advanced Features</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">24/7 Support</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Regular Updates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-16 bg-gray-100 mt-10">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Welcome to Our Platform</h2>
          <p className="text-lg md:text-xl mb-8">
            Discover all the amazing features we offer to help grow your business.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6 transition duration-300 hover:bg-gray-100 hover:shadow-2xl hover:border-2 hover:border-blue-500 hover:rounded-xl">
              <h3 className="text-xl font-bold mb-2">Feature 1</h3>
              <p className="text-gray-700">
                Highlight the key features of your service. This could include unique selling points or key functionalities.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 transition duration-300 hover:bg-gray-100 hover:shadow-2xl hover:border-2 hover:border-blue-500 hover:rounded-xl">
              <h3 className="text-xl font-bold mb-2">Feature 2</h3>
              <p className="text-gray-700">
                Provide more details about another feature. Make sure each feature card is visually appealing.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 transition duration-300 hover:bg-gray-100 hover:shadow-2xl hover:border-2 hover:border-blue-500 hover:rounded-xl">
              <h3 className="text-xl font-bold mb-2">Feature 3</h3>
              <p className="text-gray-700">
                Add as many feature cards as needed to give users a comprehensive view of what you offer.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;