import { API_BASE_URL } from "@celestial/shared";
import type { SharedAuth } from "@celestial/shared/src/lib/auth";
import { createAuthClient } from "better-auth/client";
import { emailOTPClient, inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    plugins: [emailOTPClient(), inferAdditionalFields<SharedAuth>()],
    baseURL: API_BASE_URL,
});
