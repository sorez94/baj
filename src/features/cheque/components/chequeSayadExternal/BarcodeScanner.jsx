import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

export default function QRCodeReader() {
  const [value, setValue] = useState("");

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">QR Code Scanner</h1>

      <Scanner
        onScan={ ()=> {} }
        onDecode={(result) => setValue(result)}
        onError={(error) => console.error(error?.message)}
        constraints={{ facingMode: "environment" }} // back camera if available
      />

      <div className="mt-4">
        <p className="font-medium">Decoded value:</p>
        <pre className="p-2 bg-gray-100 rounded">{value || "—"}</pre>
      </div>
    </div>
  );
}
