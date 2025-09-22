'use client';

import React, { useState } from 'react';
import QRScanner from "@/features/cheque/components/chequeSayadExternal/QRScanner";

const ScanPage = () => {
  const [scannedData, setScannedData] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = (data) => {
    console.log('Scanned QR Code Data:', data);
    setScannedData(data);
    setShowScanner(false);

    // Here you can send the data to your backend or process it
    processQRData(data);
  };

  const processQRData = async (data) => {
    try {
      // Example: Send to your API
      const response = await fetch('/api/process-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrData: data }),
      });

      const result = await response.json();
      console.log('API Response:', result);

      // Update UI with processed data
      setScannedData(`${data} - Processed: ${result.message}`);
    } catch (error) {
      console.error('Error processing QR data:', error);
      setScannedData(`${data} - Error processing data`);
    }
  };

  return (
    <div className="scan-page">
      <div className="container">
        <h1 className="title">QR Code Scanner</h1>

        {!showScanner ? (
          <div className="main-content">
            <p className="description">
              Point your camera at a QR code to scan it. The scanner will automatically detect and read the code.
            </p>

            <div className="action-buttons">
              <button
                className="primary-button"
                onClick={() => setShowScanner(true)}
              >
                📷 Open Camera & Scan
              </button>
            </div>

            {scannedData && (
              <div className="result-container">
                <h3>Scanned Result:</h3>
                <div className="qr-result">
                  <code>{scannedData}</code>
                  <button
                    className="clear-button"
                    onClick={() => setScannedData('')}
                  >
                    Clear Result
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <QRScanner onScan={handleScan} />
        )}
      </div>

      <style jsx>{`
        .scan-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .container {
          max-width: 600px;
          width: 100%;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .title {
          text-align: center;
          padding: 30px 20px 20px;
          margin: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-size: 2rem;
          font-weight: 300;
        }

        .main-content {
          padding: 40px 30px;
        }

        .description {
          text-align: center;
          color: #666;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .action-buttons {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }

        .primary-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 50px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: transform 0.2s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
        }

        .primary-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .result-container {
          background: #f8f9ff;
          border: 2px solid #e1e8ff;
          border-radius: 12px;
          padding: 20px;
          margin-top: 30px;
        }

        .result-container h3 {
          margin: 0 0 15px 0;
          color: #333;
          font-size: 1.2rem;
        }

        .qr-result {
          position: relative;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .qr-result code {
          flex: 1;
          background: white;
          padding: 12px 16px;
          border-radius: 8px;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
          word-break: break-all;
          border: 1px solid #e1e8ff;
          max-height: 100px;
          overflow-y: auto;
        }

        .clear-button {
          background: #ff6b6b;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.2s ease;
        }

        .clear-button:hover {
          background: #ff5252;
        }

        @media (max-width: 768px) {
          .container {
            margin: 10px;
            border-radius: 15px;
          }
          
          .title {
            font-size: 1.5rem;
            padding: 20px 15px;
          }
          
          .main-content {
            padding: 30px 20px;
          }
          
          .primary-button {
            padding: 12px 25px;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ScanPage;