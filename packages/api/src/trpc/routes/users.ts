import { user } from "../../db/schema";
import { initTRPC, TRPCError } from "@trpc/server";
import type { HonoContext } from "../..";
import { z } from "zod";
import { eq } from "drizzle-orm";

const t = initTRPC.context<HonoContext>().create();

export const userRouter = t.router({
    verifyOtp: t.procedure
        .input(
            z.object({
                otp: z.string(),
                profileId: z.string(), // This is the email in our case
            })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                const { otp, profileId } = input;

                if (!otp || !profileId) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "OTP and profile ID are required",
                    });
                }

                // Find the user with the given email (profileId)
                const userResult = await ctx.orm.select({ id: user.id, email: user.email }).from(user).where(eq(user.email, profileId)).limit(1);

                // If user doesn't exist, create a new one
                let userId: string;
                let userEmail = profileId;

                if (userResult.length === 0) {
                    // Create a new user
                    const id = crypto.randomUUID();
                    const now = new Date();

                    await ctx.orm.insert(user).values({
                        id,
                        name: profileId.split("@")[0], // Simple name from email
                        email: profileId,
                        emailVerified: 0, // Not verified yet
                        createdAt: now.toISOString(),
                        updatedAt: now.toISOString(),
                    });

                    userId = id;
                } else {
                    userId = userResult[0].id;
                    userEmail = userResult[0].email;
                }

                // Verify the OTP
                const result = await ctx.auth.api.signInEmailOTP({
                    asResponse: true,
                    body: {
                        email: userEmail,
                        otp,
                    },
                });

                if (!result.ok) {
                    const errorJson = await result.json();
                    const errorMessage =
                        typeof errorJson === "object" && errorJson !== null && "message" in errorJson ? String(errorJson.message) : "Invalid OTP";
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: errorMessage,
                    });
                }
                // Set Auth Cookie
                ctx.honoCtx.header("Set-Cookie", result.headers.getSetCookie()[0]);

                // Update user's emailVerified status
                await ctx.orm.update(user).set({ emailVerified: 1, updatedAt: new Date().toISOString() }).where(eq(user.id, userId));
                return { success: true, userId };
            } catch (error) {
                if (error instanceof TRPCError) throw error;

                console.error("Error verifying OTP:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "An error occurred while verifying the OTP",
                });
            }
        }),
});
