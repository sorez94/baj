'use client';

import React, { useState } from 'react';
import QRScannerWidget from "../components/chequeSayadExternal/QRScannerWidget";

const ChequeBarcodeScanner = () => {
  const [scannedResult, setScannedResult] = useState<string>("");

  return (
    <div>
      <p>Parent Result: {scannedResult}</p>
      <QRScannerWidget onScan={(result: string) => setScannedResult(result)} />
    </div>
  );
};

export default ChequeBarcodeScanner;
