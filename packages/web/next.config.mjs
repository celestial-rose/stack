// next.config.ts

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */

const nextConfig = {
    /* config options here */
    reactStrictMode: true,
    transpilePackages: ["@celestial/shared"],
    images: {
        domains: ["images.unsplash.com"],
    },
    env: {},
};

export default nextConfig;
