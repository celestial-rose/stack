import type { HonoContext } from "./../index";
import { initTRPC } from "@trpc/server";
import * as schema from "../db/schema";
// Import route definitions
import { z } from "zod";
import { userRouter } from "./routes/users";

// Create a new tRPC instance
export const t = initTRPC.context<HonoContext>().create();
// Export reusable router and procedure helpers
export const router = t.router;

export const publicProcedure = t.procedure;
// Create the app router
export const appRouter = router({
    users: userRouter,
    hello: t.procedure.query(() => {
        return "Hello 👋 from tRPC";
    }),
});
export const createCallerFactory = t.createCallerFactory(appRouter);

// Export type definition of API
export type AppRouter = typeof appRouter;
