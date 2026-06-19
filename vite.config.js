import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
    base: './',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['caravan.svg', 'apple-touch-icon.png'],
            manifest: {
                name: 'מסע צפוני · מתכנן מסע קרוואן',
                short_name: 'מסע צפוני',
                description: 'מתכנן מסע קרוואן בצפון-מזרח ארה"ב וקנדה הצרפתית — מסלולים, חניוני לילה, אטרקציות וטיפים.',
                lang: 'he',
                dir: 'rtl',
                start_url: './',
                scope: './',
                display: 'standalone',
                orientation: 'portrait',
                theme_color: '#2d6e37',
                background_color: '#f1f8f2',
                icons: [
                    { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
                    { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
                    {
                        src: 'maskable-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
                navigateFallback: 'index.html',
                runtimeCaching: [
                    {
                        // OpenStreetMap tiles — recently viewed areas stay available offline.
                        urlPattern: /^https:\/\/[abc]\.tile\.openstreetmap\.org\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'osm-tiles',
                            expiration: { maxEntries: 400, maxAgeSeconds: 60 * 60 * 24 * 30 },
                            cacheableResponse: { statuses: [0, 200] },
                        },
                    },
                    {
                        // Location photos from Wikimedia Commons / upload.wikimedia.org.
                        urlPattern: /^https:\/\/[^/]*\.wikimedia\.org\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'wikimedia-photos',
                            expiration: { maxEntries: 150, maxAgeSeconds: 60 * 60 * 24 * 60 },
                            cacheableResponse: { statuses: [0, 200] },
                        },
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'StaleWhileRevalidate',
                        options: { cacheName: 'google-fonts-stylesheets' },
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-webfonts',
                            expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
                            cacheableResponse: { statuses: [0, 200] },
                        },
                    },
                ],
            },
        }),
    ],
});
