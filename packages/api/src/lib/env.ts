import type { TypedEnv } from "@celestial/shared";
import { env } from "cloudflare:workers";

export const typedEnv = env as TypedEnv;
