import React, { useEffect } from 'react';

const LandingPage = () => {
  useEffect(() => {
    // Get the unique ID from the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const qrId = params.get('id');

    // Collect visitor information
    const visitorInfo = {
      qrId,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };

    // Send visitor data to the backend
    fetch('https://your-backend-url.com/api/collect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitorInfo),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Visitor info collected successfully');
        } else {
          console.error('Failed to collect visitor info');
        }
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="landing-page">
      <h1>Welcome to Our Landing Page!</h1>
      <p>Thank you for scanning the QR code!</p>
    </div>
  );
};

export default LandingPage;
