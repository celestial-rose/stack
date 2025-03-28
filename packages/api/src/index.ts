import { type Context, Hono } from "hono";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./trpc/router";
import * as schema from "./db/schema";
import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import type { Request } from "@cloudflare/workers-types";
import { ALLOWED_ORIGINS } from "@celestial/shared";
import { type Auth, auth } from "./lib/auth";

// This ensures c.env.DB is correctly typed
export type Bindings = {
    DB: D1Database;
};
export type HonoContext = {
    orm: DrizzleD1Database<typeof schema>;
    req: Request;
    honoCtx: Context;
    auth: Auth;
};
// Create the main Hono app
const app = new Hono<{
    Bindings: Bindings;
    Variables: {
        user: typeof auth.$Infer.Session.user | null;
        session: typeof auth.$Infer.Session.session | null;
    } & HonoContext;
}>();

// Apply CORS middleware
// CORS should be called before the route
app.use(
    "*",
    cors({
        origin: ALLOWED_ORIGINS,
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["POST", "GET", "OPTIONS"],
        exposeHeaders: ["Content-Length"],
        maxAge: 600,
        credentials: true,
    })
);

// // Mount the tRPC router
app.use("/api/trpc/*", async (c, next) => {
    const middleware = trpcServer({
        router: appRouter,
        endpoint: "/api/trpc",
        onError({ error }) {
            console.error(error);
        },
        createContext: (opts) => ({
            ...opts,
            honoCtx: c,
            orm: drizzle(c.env?.DB, { schema }),
            auth: auth,
        }),
    });
    return await middleware(c, next);
});

app.use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
        c.set("user", null);
        c.set("session", null);
        return next();
    }

    c.set("user", session.user);
    c.set("session", session.session);
    return next();
});

// Mount the auth handler
app.on(["POST", "GET"], "/api/auth/*", (c) => {
    return auth.handler(c.req.raw);
});

// Health check endpoint
app.get("/health", (c) => {
    return c.json({
        status: "ok",
        timestamp: new Date().toISOString(),
    });
});

// // Session info endpoint
// app.get("/session", async (c) => {
//     const session = c.get("session");
//     const user = c.get("user");

//     if (!user) {
//         return c.json({ authenticated: false }, 401);
//     }

//     return c.json({
//         authenticated: true,
//         user,
//         session,
//     });
// });

// Export the app as the default export
export default app;
