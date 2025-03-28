"use client";

import { FeatureCard } from "@/components/FeatureCard";
import { Stars } from "@/components/Stars";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { trpc } from "@/trpc/client";
import { authClient } from "@/auth/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GradientButton } from "@/components/GradientButton";

export default function Home() {
    const [input, setInput] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState("");
    const [profileId, setProfileId] = useState("");
    const [otpError, setOtpError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [resendingOtp, setResendingOtp] = useState(false);
    const { data } = trpc.hello.useQuery();

    const verifyOtpMutation = trpc.users.verifyOtp.useMutation();
    const router = useRouter();
    const handleSendOTP = async () => {
        if (input.length === 0) {
            setOtpError("E-mail data missing");
            return;
        }
        try {
            setResendingOtp(true);
            setOtpError(""); // Clear any previous errors
            const otpResponse = await authClient.emailOtp.sendVerificationOtp({
                email: input,
                type: "sign-in",
            });
            if (otpResponse.error) throw otpResponse.error;

            setProfileId(input); // Using email as profile ID for now
            setShowOtpInput(true);
        } catch (error) {
            console.error("Error sending OTP:", error);
            setOtpError("Failed to send verification code. Please try again.");
            setShowOtpInput(false); // Don't show OTP input if there was an error
        } finally {
            setResendingOtp(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp || !profileId) {
            setOtpError("Please enter the verification code");
            return;
        }

        try {
            setIsLoading(true);
            const result = await verifyOtpMutation.mutateAsync({
                otp,
                profileId,
            });

            if (result.success) {
                // Redirect or update UI on successful verification
                console.log("OTP verified successfully");
                router.push("/dashboard");
                // You might want to redirect to a dashboard or home page
            } else {
                setOtpError("Invalid verification code. Please try again.");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            setOtpError("Failed to verify code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        await handleSendOTP();
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-indigo-950 via-violet-900/80 to-purple-950 items-center flex">
            <Stars />

            <div className="container relative z-10 mx-auto p-8 md:py-12">
                <div className="flex flex-col lg:flex-row gap-8 mb-12 justify-center items-center pt-0 lg:pt-24">
                    {/* Left Side: Hero, Title, and Auth */}
                    <div className="flex-1 md:pr-8 flex flex-col gap-5 w-full">
                        <h1 className="relative text-4xl font-bold tracking-tight sm:text-6xl text-white font-display">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-violet-400 to-purple-400">
                                @celestial-rose/stack
                            </span>
                        </h1>
                        <div className="flex items-center gap-10">
                            <Button
                                variant="outline"
                                size="lg"
                                asChild
                                className="border-purple-300/30 text-purple-100 hover:bg-purple-900/20 hover:text-white transition-all duration-500"
                            >
                                <a
                                    href="https://github.com/celestial-rose/stack"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-purple-100/80 hover:text-white transition-colors"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-labelledby="githubTitle"
                                    >
                                        <title id="githubTitle">GitHub</title>
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    Star us on GitHub
                                </a>
                            </Button>
                        </div>

                        <div className="space-y-4 mb-8">
                            <p className="text-2xl text-purple-100 max-w-2xl">
                                The Ultimate Full-Stack Meta-Framework for Cloudflare that lets you ship for{" "}
                                <span className="font-bold text-violet-300">free</span>
                            </p>
                            <p className="text-lg text-purple-100">The ultimate combination in a template that has never been made before:</p>
                            <ul className="list-disc list-inside text-purple-100 space-y-1 ml-4">
                                <li>
                                    <span className="font-semibold text-violet-300">Hono</span> with tRPC for type-safe API calls
                                </li>
                                <li>
                                    <span className="font-semibold text-violet-300">D1</span> with Drizzle for edge-native database
                                </li>
                                <li>
                                    <span className="font-semibold text-violet-300">NextJS 15</span> with Better Auth for secure authentication
                                </li>
                                <li>
                                    <span className="font-semibold text-violet-300">Bun</span> for ultra-fast package management and runtime
                                </li>
                            </ul>
                            <p className="text-purple-100/90 italic">Deploy on Cloudflare's free tier and scale only when you need to</p>
                        </div>

                        <div className="mb-8">
                            <strong className="text-purple-300">{data ? `${data} !` : "⏱️ Loading ..."}</strong>
                            <p className="text-purple-100 mb-4">
                                Sign up to access the showcase protected route — this is what you get when you deploy the template
                            </p>
                            {!showOtpInput ? (
                                <div className="w-full max-w-md mx-auto lg:mx-0 flex flex-col gap-y-2">
                                    <input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Enter your email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSendOTP();
                                            }
                                        }}
                                    />
                                    {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}

                                    <GradientButton onClick={handleSendOTP} disabled={resendingOtp}>
                                        {resendingOtp ? "Sending..." : "Send Verification Code"}
                                    </GradientButton>
                                </div>
                            ) : (
                                <div className="w-full max-w-md mx-auto lg:mx-0">
                                    <div className="space-y-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="otp" className="text-gray-100">
                                                Enter Verification Code
                                            </Label>
                                            <Input
                                                id="otp"
                                                type="text"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                placeholder="Enter the code from your email"
                                                className={`  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
 ${otpError ? "border-red-400" : "border-indigo-300"} focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 rounded-lg`}
                                                autoFocus
                                            />
                                            {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
                                        </div>

                                        <GradientButton onClick={handleVerifyOTP} disabled={isLoading}>
                                            {isLoading ? (
                                                <span className="flex items-center justify-center">
                                                    <svg
                                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        aria-hidden="true"
                                                    >
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        />
                                                    </svg>
                                                    Verifying...
                                                </span>
                                            ) : (
                                                "Verify & Continue"
                                            )}
                                        </GradientButton>

                                        <div className="flex flex-col gap-3 mt-4">
                                            <button
                                                type="button"
                                                onClick={handleResendOTP}
                                                disabled={resendingOtp}
                                                className="text-sm text-indigo-300 hover:text-indigo-100 font-medium disabled:text-indigo-400 disabled:cursor-not-allowed"
                                            >
                                                {resendingOtp ? "Sending..." : "Didn't receive a code? Send again"}
                                            </button>

                                            <div className="mt-1">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setShowOtpInput(false);
                                                        setOtp("");
                                                        setProfileId("");
                                                        setOtpError("");
                                                    }}
                                                    className="text-sm text-gray-300 hover:text-gray-100 font-medium"
                                                >
                                                    Use a different email
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Feature Cards */}
                    <div className="flex-1 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2 lg:px-0">
                            <FeatureCard
                                title="Edge-First Architecture"
                                description="Built from the ground up for Cloudflare's ecosystem, providing unmatched global performance and scalability."
                                icon="🚀"
                            />
                            <FeatureCard
                                title="Type-Safe End-to-End"
                                description="Full TypeScript support with tRPC for type-safe APIs, ensuring robust communication between frontend and backend."
                                icon="🔒"
                            />
                            <FeatureCard
                                title="Lightning Fast"
                                description="Optimized for performance at every level, from React 19's improved rendering to Hono's lightweight API framework."
                                icon="⚡"
                            />
                            <FeatureCard
                                title="Modular Design"
                                description="Use only what you need, extend what you want. The modular architecture allows your applications to grow without becoming unwieldy."
                                icon="🧩"
                            />
                            <FeatureCard
                                title="Built-in Auth"
                                description="Integrated Better Auth for secure authentication, with support for multiple authentication methods."
                                icon="🔐"
                            />
                            <FeatureCard
                                title="Database Ready"
                                description="Drizzle ORM with D1 for type-safe database access, making database operations simple and predictable."
                                icon="📊"
                            />
                        </div>
                    </div>
                </div>
                {/* Coming Soon Section */}
                <div className="mt-16 text-center px-4">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white font-display">Coming Soon ✨</h2>
                    <p className="text-purple-100/95 max-w-2xl mx-auto mb-6">
                        We're working on exciting new features to make your development experience even better. Stay tuned for updates!
                    </p>
                </div>
                {/* Tech Stack Section */}
                <div className="mt-12 md:mt-16 text-center px-4">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white font-display">Tech Stack</h2>
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto">
                        {[
                            { name: "Next.js 15.2.3", url: "https://github.com/vercel/next.js" },
                            { name: "React 19", url: "https://github.com/facebook/react" },
                            { name: "Tailwind CSS 4", url: "https://github.com/tailwindlabs/tailwindcss" },
                            { name: "shadcn/ui", url: "https://github.com/shadcn-ui/ui" },
                            { name: "tRPC 11", url: "https://github.com/trpc/trpc" },
                            { name: "Hono", url: "https://github.com/honojs/hono" },
                            { name: "Better Auth", url: "https://github.com/better-auth/better-auth" },
                            { name: "Drizzle ORM", url: "https://github.com/drizzle-team/drizzle-orm" },
                            { name: "Cloudflare D1", url: "https://developers.cloudflare.com/d1" },
                            { name: "TypeScript", url: "https://github.com/microsoft/TypeScript" },
                            { name: "Bun", url: "https://github.com/oven-sh/bun" },
                            { name: "Biome 2", url: "https://github.com/biomejs/biome" },
                            { name: "Wrangler", url: "https://github.com/cloudflare/workers-sdk" },
                        ].map((tech) => (
                            <a
                                key={tech.name}
                                href={tech.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 bg-purple-950/40 text-purple-100 border border-purple-800/20 rounded-full text-sm hover:bg-purple-900/50 hover:border-purple-700/40 transition-colors duration-300 font-mono flex items-center gap-1"
                            >
                                {tech.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Acknowledgements Section */}
                <div className="mt-12 md:mt-16  px-4">
                    <h2 className="text-2xl md:text-3xl text-center font-bold mb-4 text-white font-display">Acknowledgements</h2>
                    <p className="text-purple-100/95 max-w-2xl mx-auto mb-6 text-justify">
                        Special thanks to Theo{" "}
                        <a
                            href="https://twitter.com/theo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-300 hover:text-violet-200 underline"
                        >
                            (@theo)
                        </a>{" "}
                        for laying the foundation with the revolutionary{" "}
                        <a href="https://create.t3.gg/" target="_blank" rel="noopener noreferrer" className="text-violet-300 hover:text-violet-200 underline">
                            T3 Stack
                        </a>
                        . Also grateful to{" "}
                        <a href="https://trpc.io/" target="_blank" rel="noopener noreferrer" className="text-violet-300 hover:text-violet-200 underline">
                            tRPC
                        </a>{" "}
                        and{" "}
                        <a
                            href="https://tanstack.com/query"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-violet-300 hover:text-violet-200 underline"
                        >
                            Tanstack Query
                        </a>{" "}
                        for building such amazing libraries that make type-safe development a joy.
                    </p>
                </div>

                {/* Footer Section */}
                <div className="mt-16 mb-4 text-center">
                    <div className="border-t font-semibold border-purple-800/30 pt-6 text-sm text-purple-300/80">
                        <p>@celestial-rose/stack, an idea by Celestial &copy; 2025</p>
                    </div>
                </div>
            </div>

            {/* Add custom animations */}
            <style jsx global>{`
                @keyframes twinkle {
                    0%,
                    100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.3;
                    }
                }
                .animate-twinkle {
                    animation: twinkle 3s ease-in-out infinite;
                }

                @keyframes float {
                    0%,
                    100% {
                        transform: perspective(1000px) translateZ(20px) translateY(0) rotate(0deg);
                    }
                    25% {
                        transform: perspective(1000px) translateZ(40px) translateY(-20px) rotate(5deg);
                    }
                    50% {
                        transform: perspective(1000px) translateZ(60px) translateY(0) rotate(10deg);
                    }
                    75% {
                @keyframes pulse {
                    0%,
                    100% {
                        opacity: 0.1;
                        filter: blur(40px);
                    }
                    50% {
                        opacity: 0.2;
                        filter: blur(60px);
                    }
                }

                .perspective-container {
                    perspective: 1000px;
                    transform-style: preserve-3d;
                }
            `}</style>
        </div>
    );
}
