// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { VitePWA } from 'vite-plugin-pwa';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(), 
//     VitePWA({ 
//       registerType: 'autoUpdate',
//       includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
//       manifest: {
//         name: 'Vite PWA Project',
//         short_name: 'Vite PWA Project',
//         theme_color: '#ffffff',
//         icons: [
//             {
//                 src: 'pwa-64x64.png',
//                 sizes: '64x64',
//                 type: 'image/png'
//             },
//             {
//                 src: 'pwa-192x192.png',
//                 sizes: '192x192',
//                 type: 'image/png'
//             },
//             {
//                 src: 'pwa-512x512.png',
//                 sizes: '512x512',
//                 type: 'image/png',
//                 purpose: 'any'
//             },
//             {
//                 src: 'maskable-icon-512x512.png',
//                 sizes: '512x512',
//                 type: 'image/png',
//                 purpose: 'maskable'
//             }
//         ],
//       }, 
//     })
//   ],
// })

import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
  registerType: "prompt",
  devOptions: {
    enabled: true,
  },
  manifest: {
    name: "React Vite PWA App",
    short_name: "Pwa App",
    description: "Trying PWA app with vite",
    icons: [
      {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png'
      },
      {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
      },
      {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
      },
      {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
      }
  ],
    theme_color: "#171717",
    background_color: "#e8ebf2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

export default {
  base: "./",
  plugins: [react(), VitePWA(manifestForPlugin)],
};
