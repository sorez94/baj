import { useEffect, useRef, useState } from "react";
import styles from "@/features/cheque/components/chequeSayadExternal/QRScannerWidget.module.scss";
import QrScanner from "qr-scanner";

type QRScannerWidgetProps = {
  onScan?: (result: string) => void; // 👈 add prop
};

const QRScannerWidget =({ onScan }: QRScannerWidgetProps) => {
  // QR States
  const scanner = useRef<QrScanner>(null);
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  // Result
  const [scannedResult, setScannedResult] = useState<string | undefined>("");
  const [data, setData] = useState<any>('')
  const [success, setSuccess] = useState<any>('')

  // Success
  const onScanSuccess = (result: QrScanner.ScanResult) => {
    onScan?.(result?.data);
    setSuccess('success')
    setData(result?.data)
    console.log(result?.data);
    setScannedResult(result?.data);
  };

  // Fail
  const onScanFail = (err: string | Error) => {
    // 🖨 Print the "err" to browser console.
    setSuccess('fail')
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <div className={styles.qrReader}>
      {data && (
        <p>
          data Result: {data}
        </p>
      )}
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className={styles.qrBox}>
        {!videoEl?.current && (
          <img
            src="/assets/images/icons/ui/barcode.svg"
            alt="Qr Frame"
            className={styles.qrFrame}
          />
        )}
      </div>
      {scannedResult && (
        <p
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 99999,
            color: "white",
          }}>
          Scanned Result: {scannedResult}
        </p>
      )}
    </div>
  );
};

export default QRScannerWidget;
