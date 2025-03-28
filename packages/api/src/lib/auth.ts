import { db } from "../../src/db";
import { sharedAuth } from "@celestial/shared/src/lib/auth";
import { typedEnv } from "./env";

export const auth = sharedAuth({
    DB: db,
    BETTER_AUTH_COOKIES_PREFIX: typedEnv.BETTER_AUTH_COOKIES_PREFIX,
    BETTER_AUTH_COOKIES_DOMAIN: typedEnv.BETTER_AUTH_COOKIES_DOMAIN,
    BETTER_AUTH_SECRET: typedEnv.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: typedEnv.BETTER_AUTH_URL,
    RESEND_API_KEY: typedEnv.RESEND_API_KEY,
    RESEND_FROM_EMAIL: typedEnv.RESEND_FROM_EMAIL,
    ENV: typedEnv.ENV,
});

export type Auth = typeof auth;
// Export auth-related types
export type { Session, User } from "better-auth";
