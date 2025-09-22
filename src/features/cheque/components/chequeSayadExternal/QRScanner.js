'use client';

import React, { useState, useRef, useEffect } from 'react';
import QrReader from 'react-qr-reader';

const QRScanner = ({ onScan }) => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [cameraPermission, setCameraPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const qrRef = useRef(null);

  useEffect(() => {
    checkCameraAvailability();
  }, []);

  const checkCameraAvailability = async () => {
    try {
      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Camera API not supported in this browser');
        setCameraPermission(false);
        setIsLoading(false);
        return;
      }

      // Check if we're in a secure context (HTTPS or localhost)
      if (typeof window !== 'undefined' && window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        setError('Camera access requires HTTPS or localhost');
        setCameraPermission(false);
        setIsLoading(false);
        return;
      }

      // Test camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      }).catch(err => {
        console.log('Camera permission check failed:', err.name, err.message);
        return null;
      });

      if (stream) {
        // Stop the test stream
        stream.getTracks().forEach(track => track.stop());
        setCameraPermission(true);
        setError('');
      } else {
        setCameraPermission(false);
        setError('Camera access denied or unavailable');
      }
    } catch (err) {
      console.error('Error checking camera availability:', err);
      setCameraPermission(false);

      if (err.name === 'NotAllowedError') {
        setError('Camera permission denied. Please allow camera access.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found on this device.');
      } else if (err.name === 'NotSupportedError') {
        setError('Camera not supported in this browser.');
      } else {
        setError('Unable to access camera. Please check your device and browser settings.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleScan = (data) => {
    if (data) {
      console.log('QR Code scanned:', data);
      setScanning(false);
      setError('');
      onScan(data);
    }
  };

  const handleError = (err) => {
    console.error('QR Scanner Error:', err);

    if (scanning) {
      if (err.name === 'NotAllowedError') {
        setError('Camera permission denied. Please allow camera access to continue scanning.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera available. Please connect a camera.');
      } else if (err.name === 'NotSupportedError') {
        setError('Camera resolution not supported. Please try a different setting.');
      } else {
        setError('Scanning error. Please try again.');
      }
    }
  };

  const handleStartScan = async () => {
    if (!cameraPermission) {
      await checkCameraAvailability();
      return;
    }

    try {
      setScanning(true);
      setError('');
    } catch (err) {
      console.error('Error starting scan:', err);
      setError('Failed to start camera. Please try again.');
    }
  };

  const handleStopScan = () => {
    setScanning(false);
    setError('');
    // Stop any active tracks if they exist
    if (qrRef.current) {
      try {
        const stream = qrRef.current.getStream();
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      } catch (e) {
        console.log('No active stream to stop');
      }
    }
  };

  const getScannerConstraints = () => {
    // More flexible constraints for better compatibility
    return {
      video: {
        facingMode: { ideal: 'environment' },
        width: { ideal: 1280, max: 1920 },
        height: { ideal: 720, max: 1080 },
      },
    };
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="qr-scanner-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Checking camera availability...</p>
        </div>
      </div>
    );
  }

  // Show initial state (not scanning)
  if (!scanning) {
    return (
      <div className="qr-scanner-container">
        <div className="scan-info">
          {cameraPermission === false && (
            <div className="permission-warning">
              <p>⚠️ Camera Access Required</p>
              <p>{error || 'Please enable camera access in your browser settings'}</p>
              <button
                onClick={checkCameraAvailability}
                className="retry-button"
              >
                🔄 Retry Camera Check
              </button>
            </div>
          )}

          <div className="scan-button-container">
            <button
              onClick={handleStartScan}
              className={`scan-button ${cameraPermission === false ? 'disabled' : ''}`}
              disabled={cameraPermission === false || isLoading}
            >
              {isLoading ? '🔄 Loading...' : '📷 Scan QR Code'}
            </button>
          </div>

          {cameraPermission === true && (
            <div className="permission-info">
              <p>✅ Camera ready</p>
            </div>
          )}
        </div>

        {error && cameraPermission !== false && (
          <div className="error-message">
            <p>{error}</p>
            <button
              onClick={checkCameraAvailability}
              className="retry-button"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    );
  }

  // Show scanning state
  return (
    <div className="qr-scanner-container">
      <div className="scanner-header">
        <div className="header-content">
          <h3>Scanning QR Code</h3>
          <p>Hold steady and position the QR code within the frame</p>
        </div>
        <button
          onClick={handleStopScan}
          className="stop-button"
          title="Stop scanning"
        >
          ✕
        </button>
      </div>

      <div className="scanner-viewport">
        <QrReader
          ref={qrRef}
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
          constraints={getScannerConstraints()}
        />
        <div className="scanner-overlay">
          <div className="scanner-frame"></div>
          <div className="scanner-instruction">
            Position QR code here
          </div>
        </div>
      </div>

      <div className="scanner-footer">
        <p>Keep your camera steady and ensure good lighting</p>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button
            onClick={handleStopScan}
            className="retry-button"
          >
            Stop & Retry
          </button>
        </div>
      )}
      <style jsx>{`
  .qr-scanner-container {
    width: 100%;
    max-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #000;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  /* Loading State */
  .loading-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    text-align: center;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-container p {
    margin: 0;
    font-size: 1rem;
    color: white;
  }

  /* Permission Warning */
  .permission-warning {
    background: rgba(255, 193, 7, 0.15);
    border: 1px solid rgba(255, 193, 7, 0.3);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 24px;
    color: #fff3cd;
    text-align: center;
  }

  .permission-warning p {
    margin: 0 0 12px 0;
    font-size: 0.95rem;
    line-height: 1.4;
  }

  .permission-warning p:last-child {
    margin-bottom: 0;
  }

  /* Permission Info */
  .permission-info {
    margin-top: 16px;
    padding: 8px 16px;
    background: rgba(76, 175, 80, 0.15);
    border: 1px solid rgba(76, 175, 80, 0.3);
    border-radius: 20px;
    font-size: 0.85rem;
  }

  .permission-info p {
    margin: 0;
    color: #4caf50;
  }

  /* Scan Button */
  .scan-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    text-align: center;
  }

  .scan-button-container {
    width: 100%;
    max-width: 320px;
    margin: 24px 0;
  }

  .scan-button {
    width: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 18px 24px;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    position: relative;
    overflow: hidden;
  }

  .scan-button:hover:not(.disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
  }

  .scan-button:active:not(.disabled) {
    transform: translateY(0);
  }

  .scan-button.disabled,
  .scan-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #666;
    transform: none;
    box-shadow: none;
  }

  /* Scanner Header */
  .scanner-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    z-index: 10;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .header-content {
    flex: 1;
  }

  .header-content h3 {
    margin: 0 0 4px 0;
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.3;
  }

  .header-content p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.8;
    line-height: 1.4;
  }

  .stop-button {
    background: rgba(255, 255, 255, 0.15);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    font-weight: bold;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .stop-button:hover {
    background: rgba(255, 107, 107, 0.8);
    border-color: rgba(255, 107, 107, 0.3);
    transform: scale(1.05);
  }

  /* Scanner Viewport */
  .scanner-viewport {
    position: relative;
    flex: 1;
    width: 100%;
    overflow: hidden;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Scanner Overlay */
  .scanner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background: 
      linear-gradient(45deg, transparent 48%, rgba(0, 255, 0, 0.1) 50%, rgba(0, 255, 0, 0.1) 51%, transparent 52%),
      linear-gradient(-45deg, transparent 48%, rgba(0, 255, 0, 0.1) 50%, rgba(0, 255, 0, 0.1) 51%, transparent 52%);
  }

  .scanner-frame {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(280px, 70vw);
    height: min(280px, 70vw);
    border: 3px solid #00ff00;
    border-radius: 12px;
    box-shadow: 
      0 0 0 3px rgba(0, 0, 0, 0.5),
      inset 0 0 0 3px rgba(0, 0, 0, 0.5),
      0 0 20px rgba(0, 255, 0, 0.3);
    background: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 0, 0.05) 2px,
        rgba(0, 255, 0, 0.05) 4px
      );
  }

  .scanner-instruction {
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
    color: #00ff00;
    font-size: 0.95rem;
    font-weight: 500;
    text-align: center;
    text-shadow: 0 0 8px rgba(0, 255, 0, 0.6);
    white-space: nowrap;
  }

  /* Scanner Footer */
  .scanner-footer {
    padding: 16px 20px;
    background: rgba(0, 0, 0, 0.8);
    text-align: center;
    font-size: 0.85rem;
    opacity: 0.8;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .scanner-footer p {
    margin: 0;
    line-height: 1.4;
  }

  /* Error Messages */
  .error-message {
    padding: 16px 20px;
    background: rgba(244, 67, 54, 0.15);
    border: 1px solid rgba(244, 67, 54, 0.3);
    border-radius: 12px;
    margin: 16px 20px;
    color: #ffcdd2;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .error-message p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  /* Retry Button */
  .retry-button {
    background: rgba(255, 193, 7, 0.8);
    color: #333;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.2s ease;
    align-self: flex-start;
  }

  .retry-button:hover {
    background: rgba(255, 193, 7, 1);
    transform: translateY(-1px);
  }

  /* Responsive Design */
  @media (max-width: 480px) {
    .scanner-frame {
      width: 220px;
      height: 220px;
    }
    
    .header-content h3 {
      font-size: 1.1rem;
    }
    
    .header-content p {
      font-size: 0.85rem;
    }
    
    .scanner-instruction {
      font-size: 0.85rem;
      bottom: 15%;
    }
    
    .scan-button {
      padding: 16px 20px;
      font-size: 1rem;
    }
    
    .loading-container {
      padding: 30px 15px;
    }
  }

  @media (max-width: 360px) {
    .scanner-frame {
      width: 200px;
      height: 200px;
    }
    
    .permission-warning,
    .error-message {
      margin: 12px 12px;
      padding: 16px;
    }
  }
`}</style>
    </div>
  );
};

export default QRScanner;