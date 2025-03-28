import "server-only"; // <-- ensure this file cannot be imported from the client
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { makeQueryClient } from "./query-client";
import { type appRouter, createCallerFactory } from "@celestial/api/src/trpc/router";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../../../api/src/db/schema";
import { auth } from "@/lib/auth";

export const getQueryClient = cache(makeQueryClient);
// @ts-ignore
export const createCaller = createCallerFactory(async () => {
    const db = ((await getCloudflareContext({ async: true })).env as { DB: D1Database }).DB;

    return {
        orm: drizzle(db, { schema }),
        auth: auth(db),
    };
});
export const { trpc: api, HydrateClient } = createHydrationHelpers<typeof appRouter>(createCaller, getQueryClient);
