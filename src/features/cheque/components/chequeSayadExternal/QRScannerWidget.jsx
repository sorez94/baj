// Quick setup:
// 1) npm i react-qr-reader
// 2) Import and render <QRScannerWidget /> anywhere in your app.
// Notes:
// - Must be served over HTTPS (or localhost) for camera access.
// - If embedded in an iframe, it must have allow="camera".
// - No API calls are made.

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { QrReader } from "react-qr-reader";

export default function QRScannerWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");

  // Discover cameras when the panel opens
  useEffect(() => {
    let isMounted = true;
    async function getCams() {
      try {
        // Ensure permission prompt appears on user gesture
        if (isOpen && navigator?.mediaDevices?.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          // Immediately stop tracks; QrReader will manage its own stream
          stream.getTracks().forEach((t) => t.stop());
        }
        const all = await navigator.mediaDevices?.enumerateDevices?.();
        const cams = (all || []).filter((d) => d.kind === "videoinput");
        if (isMounted) {
          setDevices(cams);
          // Prefer a back camera if available
          const backCam = cams.find((d) => /back|rear|environment/i.test(d.label));
          setSelectedDeviceId((backCam || cams[0])?.deviceId || "");
        }
      } catch (err) {
        if (!isMounted) return;
        setErrorMsg(
          err?.message ||
            "Couldn't access the camera. Make sure the site is on HTTPS and camera permission is granted."
        );
      }
    }
    if (isOpen) getCams();
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const handleOpen = () => {
    setErrorMsg("");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleResult = useCallback((res, err) => {
    if (!!res) {
      const text = res?.text ?? String(res);
      setResult(text);
      setIsOpen(false); // auto-close after a successful scan
    }
    if (!!err) {
      const benign = ["NotFoundException", "ChecksumException", "FormatException"]; // non-fatal scan misses
      const name = err?.name || err?.constructor?.name || "Error";
      if (!benign.includes(name)) setErrorMsg(err?.message || String(err));
    }
  }, []);

  // Compute constraints based on selected device, with a graceful fallback
  const constraints = useMemo(() => {
    if (selectedDeviceId) return { deviceId: { exact: selectedDeviceId } };
    return { facingMode: { ideal: "environment" } };
  }, [selectedDeviceId]);

  const hasMediaSupport = typeof navigator !== "undefined" && !!navigator.mediaDevices;

  return (
    <div className="min-h-[60vh] w-full grid place-items-center p-6">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">QR Code Scanner</h1>
          <p className="text-sm text-gray-500">
            Uses <code>react-qr-reader</code>. Click the button to open your camera and scan a QR code. No API calls.
          </p>
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

        {/* Scanner Panel */}
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
              {!hasMediaSupport && (
                <p className="text-red-600 text-sm mb-3">
                  This browser doesn't support camera access (navigator.mediaDevices is missing).
                </p>
              )}

              {/* Camera selector if multiple cameras exist */}
              {devices.length > 1 && (
                <div className="mb-3 flex items-center gap-2">
                  <label className="text-sm text-gray-600" htmlFor="camSel">Camera:</label>
                  <select
                    id="camSel"
                    className="border rounded-xl px-3 py-2 text-sm"
                    value={selectedDeviceId}
                    onChange={(e) => setSelectedDeviceId(e.target.value)}
                  >
                    {devices.map((d) => (
                      <option key={d.deviceId} value={d.deviceId}>
                        {d.label || `Camera ${d.deviceId.slice(0, 6)}`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <QrReader
                onResult={handleResult}
                constraints={constraints}
                scanDelay={250}
                containerStyle={{ width: "100%" }}
                videoStyle={{ width: "100%", borderRadius: "0.75rem" }}
              />

              {errorMsg && <p className="mt-3 text-sm text-red-600">{errorMsg}</p>}
              <div className="mt-3 text-xs text-gray-500 space-y-1">
                <p>• Use HTTPS or localhost for camera access.</p>
                <p>• If this is inside an iframe, it needs <code>allow="camera"</code>.</p>
                <p>• On iOS Safari, camera only works in the main page (not cross-origin iframes).</p>
              </div>
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
