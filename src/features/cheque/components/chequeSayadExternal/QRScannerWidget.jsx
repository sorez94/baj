// Quick setup:
// 1) npm i react-qr-reader
// 2) Import and render <QRScannerWidget /> anywhere in your app.
// No APIs are called.

import React, { useState, useCallback } from "react";
import { QrReader } from "react-qr-reader";

export default function QRScannerWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleOpen = () => {
    setErrorMsg("");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleResult = useCallback((res, err) => {
    if (!!res) {
      // Newer versions of react-qr-reader provide a ZXing Result
      const text = res?.text ?? String(res);
      setResult(text);
      setIsOpen(false); // auto-close after a successful scan
    }
    if (!!err) {
      // Common non-fatal decode errors will spam; show only meaningful ones
      const benign = [
        "NotFoundException",
        "ChecksumException",
        "FormatException",
      ];
      const name = err?.name || err?.constructor?.name || "Error";
      if (!benign.includes(name)) {
        setErrorMsg(err?.message || String(err));
      }
    }
  }, []);

  return (
    <div className="min-h-[60vh] w-full grid place-items-center p-6">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">QR Code Scanner</h1>
          <p className="text-sm text-gray-500">Powered by <code>react-qr-reader</code>. Click the button to open your camera and scan a QR code. No API calls.</p>
        </div>

        {/* Result Card */}
        <div className="mb-6">
          <div className="rounded-2xl border p-4 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-gray-500">Last Scan</div>
            {result ? (
              <div className="mt-2 break-words">
                <p className="text-base">{result}</p>
              </div>
            ) : (
              <p className="mt-2 text-gray-500">No result yet.</p>
            )}
          </div>
        </div>

        {/* Open Scanner Button */}
        {!isOpen && (
          <button
            type="button"
            onClick={handleOpen}
            className="px-4 py-2 rounded-2xl shadow border hover:shadow-md transition"
          >
            Scan QR Code
          </button>
        )}

        {/* Scanner Modal-ish Inline Panel */}
        {isOpen && (
          <div className="mt-6 rounded-2xl border shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
              <div className="font-medium">Scanner</div>
              <button
                type="button"
                onClick={handleClose}
                className="text-sm px-3 py-1 rounded-xl border hover:shadow"
              >
                Close
              </button>
            </div>
            <div className="p-4">
              {/* QrReader renders the camera stream and scans continuously */}
              <QrReader
                constraints={{ facingMode: "environment" }}
                onResult={handleResult}
                containerStyle={{ width: "100%" }}
                videoStyle={{ width: "100%", borderRadius: "0.75rem" }}
              />
              {errorMsg && (
                <p className="mt-3 text-sm text-red-600">{errorMsg}</p>
              )}
              <p className="mt-3 text-xs text-gray-500">
                Tip: If your device has multiple cameras, try switching the system default to the rear camera.
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        {result && !isOpen && (
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setResult("")}
              className="px-3 py-2 text-sm rounded-xl border hover:shadow"
            >
              Clear Result
            </button>
            <button
              type="button"
              onClick={handleOpen}
              className="px-3 py-2 text-sm rounded-xl border hover:shadow"
            >
              Scan Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
