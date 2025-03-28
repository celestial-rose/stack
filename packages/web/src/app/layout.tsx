import type { Metadata } from "next";
import { Inconsolata, Raleway, Lora } from "next/font/google";
import "@/styles/globals.css";
import { TRPCProvider } from "@/trpc/client";
import {
    APP_TITLE,
    APP_DESCRIPTION,
    APP_KEYWORDS,
    APP_CREATOR,
    APP_PUBLISHER,
    APP_METADATA_BASE_URL,
    APP_ICONS,
    APP_OG,
    APP_TWITTER,
    APP_URL,
} from "@celestial/shared/src/constants";

const inconsolata = Inconsolata({
    subsets: ["latin"],
    variable: "--font-mono",
});

const raleway = Raleway({
    subsets: ["latin"],
    variable: "--font-display",
});

const lora = Lora({
    subsets: ["latin"],
    variable: "--font-serif",
});

export const metadata: Metadata = {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
    keywords: APP_KEYWORDS,
    authors: [{ name: APP_CREATOR, url: APP_URL }],
    creator: APP_CREATOR,
    publisher: APP_PUBLISHER,
    metadataBase: APP_METADATA_BASE_URL,
    alternates: {
        canonical: "/",
        languages: {
            "en-US": "/",
        },
    },
    applicationName: APP_TITLE,
    referrer: "origin-when-cross-origin",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    icons: APP_ICONS,
    manifest: "/site.webmanifest",
    openGraph: APP_OG,
    twitter: APP_TWITTER,
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    // verification: {
    //     google: "your-google-site-verification-code",
    //     yandex: "your-yandex-verification-code",
    //     yahoo: "your-yahoo-verification-code",
    //     other: {
    //         "msvalidate.01": "your-bing-verification-code",
    //     },
    // },
    category: "technology",
};

async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <TRPCProvider>
            <html lang="en" suppressHydrationWarning className={`${inconsolata.variable} ${raleway.variable} ${lora.variable}`}>
                <body className="font-sans">
                    <main>{children}</main>
                </body>
            </html>
        </TRPCProvider>
    );
}

export default RootLayout;
