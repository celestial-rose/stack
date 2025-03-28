import { z } from "zod";
import { post } from "../../db/schema";
import { eq } from "drizzle-orm";

import { initTRPC } from "@trpc/server";
import { HonoContext } from "../..";

const t = initTRPC.context<HonoContext>().create();

export const postRouter = t.router({
    list: t.procedure.query(async ({ ctx }) => {
        return await ctx.orm.select().from(post).all();
    }),

    byId: t.procedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        return await ctx.orm.select().from(post).where(eq(post.id, input.id)).get();
    }),

    byAuthor: t.procedure.input(z.object({ authorId: z.string() })).query(async ({ ctx, input }) => {
        return await ctx.orm.select().from(post).where(eq(post.authorId, input.authorId)).all();
    }),

    create: t.procedure
        .input(
            z.object({
                title: z.string().min(1),
                content: z.string().min(1),
                authorId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const id = crypto.randomUUID();
            const now = new Date();

            await ctx.orm.insert(post).values({
                id,
                title: input.title,
                content: input.content,
                authorId: input.authorId,
                createdAt: now,
                updatedAt: now,
            });

            return { id, ...input, createdAt: now, updatedAt: now };
        }),
});
