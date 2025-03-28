// Constants used across the application

// API endpoints
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
export const TRPC_ENDPOINT = `${API_BASE_URL}/api/trpc`;
export const THEME_COLOR = "#2d1e5e";
// Application
export const APP_NAME = "@celestial-rose/stack";
export const APP_TITLE = "@celestial-rose/stack";
export const APP_DESCRIPTION = "The Ultimate Full-Stack Meta-Framework for Cloudflare";
export const APP_VERSION = "0.1.0";
export const APP_URL = "https://your-domain.dev";
export const APP_METADATA_BASE_URL = new URL(APP_URL);

// Creator and publisher info
export const APP_CREATOR = "Your Name";
export const APP_PUBLISHER = "your-domain.dev";
export const APP_TWITTER_HANDLE = "@your-handle";

// Keywords for SEO
export const APP_KEYWORDS = [
    "Cloudflare Workers",
    "tRPC",
    "type-safe API",
    "fullstack",
    "metaframework",
    "Hono",
    "D1",
    "Drizzle",
    "edge-native database",
    "NextJS 15",
    "Better Auth",
    "authentication",
    "Bun",
    "package management",
    "Cloudflare",
    "free tier",
    "scalable",
    "serverless",
    "edge computing",
    "full-stack development",
    "cloud deployment",
];

// OpenGraph metadata
export const APP_OG = {
    title: `${APP_TITLE} - ${APP_DESCRIPTION}`,
    description: "Type-safe • Serverless • Developer-friendly • Cloudflare Deployed. The first full-stack meta-framework that lets you ship for FREE.",
    url: APP_URL,
    siteName: APP_TITLE,
    locale: "en_US",
    type: "website",
    images: [
        {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: `${APP_TITLE} - The ultimate full-stack meta-framework`,
        },
    ],
};

// Twitter metadata
export const APP_TWITTER = {
    card: "summary_large_image" as const,
    title: `${APP_TITLE} - ${APP_DESCRIPTION}`,
    description: "Type-safe • Serverless • Developer-friendly • Cloudflare Deployed. The first full-stack meta-framework that lets you ship for FREE.",
    creator: APP_TWITTER_HANDLE,
    site: APP_TWITTER_HANDLE,
    images: [
        {
            url: "/twitter-card.png",
            width: 1200,
            height: 600,
            alt: `${APP_TITLE} - The ultimate full-stack meta-framework`,
        },
    ],
};

// Icons configuration
export const APP_ICONS = {
    icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
        { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: THEME_COLOR },
        { rel: "msapplication-TileImage", url: "/mstile-144x144.png" },
    ],
};

// Feature flags
export const FEATURES = {
    darkMode: true,
    notifications: true,
    analytics: false,
};

export const ALLOWED_ORIGINS = ["http://localhost:3000", APP_URL];
