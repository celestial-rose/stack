// Common types used across the application

import type { Kysely } from "kysely";

// API response types
export interface ApiResponse<T> {
    data?: T;
    error?: string;
    status: "success" | "error";
}

export type TypedEnv = {
    DB: Kysely<D1Database>;
    BETTER_AUTH_COOKIES_DOMAIN: string;
    BETTER_AUTH_COOKIES_PREFIX: string;
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
    RESEND_FROM_EMAIL: string;
    RESEND_API_KEY: string;
    ENV: string;
};
