// biome-ignore-all lint/style/noNonNullAssertion:
// TODO validate env using t3-oss/t3-env
import { API_BASE_URL } from "@celestial/shared";
import { sharedAuth } from "@celestial/shared/src/lib/auth";
import { initDbConnection } from "@celestial/shared/src/lib/db";

export const auth = (db: D1Database) =>
    sharedAuth({
        DB: initDbConnection(db),
        BETTER_AUTH_COOKIES_DOMAIN: process.env.BETTER_AUTH_COOKIES_DOMAIN!,
        BETTER_AUTH_COOKIES_PREFIX: process.env.BETTER_AUTH_COOKIES_PREFIX!,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || API_BASE_URL,
        RESEND_API_KEY: process.env.RESEND_API_KEY!,
        RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL!,
        ENV: process.env.ENV!,
    });
// Export auth-related types
export type { Session, User } from "better-auth";
