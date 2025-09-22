import "./globals.scss";
import { ClientProviders } from "./providers";
import SimpleThemeProvider from '@/shared/theme/SimpleThemeProvider';
import { fontFamilies } from "@/shared/utils/fonts";
import {Metadata} from "next";

export const metadata: Metadata = {
  // PWA + basic meta
  applicationName: "BAJET",
  title: "BAJET",
  manifest: "/site.webmanifest",        // make sure the file is /public/site.webmanifest
  themeColor: "#000000",                 // matches your manifest
  appleWebApp: {
    capable: true,
    title: "BAJET",
    statusBarStyle: "black-translucent",
  },
  // Expose a couple of icons explicitly (the rest come from the manifest)
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body style={{fontFamily: fontFamilies.yekan400}}>
      <SimpleThemeProvider>
        <ClientProviders>
            {children}
          </ClientProviders>
      </SimpleThemeProvider>
      </body>
    </html>
  );
}
