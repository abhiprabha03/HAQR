import QRCodeGenerator from '../components/QRCodeGenerator';

const QrCode = () => {
  return (
    <div>
      <h1>QR Code Generator</h1>
      <QRCodeGenerator />  {/* Ensure this is rendered here */}
    </div>
  );
};

export default QrCode;
