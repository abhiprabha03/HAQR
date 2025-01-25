import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SMSPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const number = urlParams.get('number');
    const msg = urlParams.get('message');

    if (number && msg) {
      setPhoneNumber(number);
      setMessage(msg);
    }
  }, [location.search]);

  const handleSMSRedirect = () => {
    if (phoneNumber && message) {
      const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
      window.location.href = smsUrl; // This opens the SMS app with the pre-filled message
    } else {
      alert('Phone number or message is missing.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Send SMS with QR Code</h1>
      
      {phoneNumber && message ? (
        <>
          <p>Phone Number: {phoneNumber}</p>
          <p>Message: {message}</p>
          <button onClick={handleSMSRedirect} style={styles.button}>
            Open SMS App
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    background: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default SMSPage;
