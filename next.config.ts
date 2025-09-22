import type { NextConfig } from "next";
import createNextPWA from "@ducanh2912/next-pwa";

const withPWA = createNextPWA({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,

  // ✅ Let the plugin wire up the offline document fallback (and precache it)
  fallbacks: {
    document: "/offline",
  },

  workboxOptions: {
    // Remove navigateFallback if you set fallbacks.document
    // navigateFallback: "/offline",

    // ✅ Ensure /offline is in the precache manifest
    additionalManifestEntries: [
      { url: "/offline", revision: "2" },
    ],

    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.destination === "document",
        handler: "NetworkFirst",
        options: {
          cacheName: "pages",
          networkTimeoutSeconds: 3,
          expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 },
        },
      },
      {
        urlPattern: ({ request }) =>
          ["script", "style", "worker"].includes(request.destination),
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "assets",
          expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 7 },
        },
      },
      {
        urlPattern: ({ request }) => request.destination === "image",
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "images",
          expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },
      {
        urlPattern: ({ url, request }) =>
          request.method === "GET" && url.pathname.startsWith("/cqms/api/"),
        handler: "NetworkFirst",
        options: {
          cacheName: "api-cqms",
          networkTimeoutSeconds: 4,
          expiration: { maxEntries: 50, maxAgeSeconds: 60 * 5 },
          cacheableResponse: { statuses: [200] },
        },
      },
      {
        urlPattern: ({ request }) => request.destination === "font",
        handler: "CacheFirst",
        options: {
          cacheName: "fonts",
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
          },
          // some CDNs return opaque responses when requested no-cors
          cacheableResponse: { statuses: [0, 200] },
        },
      },
      {
        urlPattern: /^\/fonts\/.*\.(?:woff2?|ttf|otf|eot)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "custom-fonts",
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
          },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
    ],
  },
});

const nextConfig: NextConfig = {
  /* config options here */
  
  // Proxy API requests to avoid CORS in development
  
 
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: "/cqms/api/:path*",
          destination: process.env.NEXT_PUBLIC_TEST_API_URL + "/cqms/api/:path*",
        },
      ];
    }
    // No rewrites in non-development environments
    return [];
  },

  // Configure webpack to handle SVG files as React components
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default withPWA(nextConfig);
