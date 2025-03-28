import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { ALLOWED_ORIGINS, APP_NAME } from "../constants";
import type { TypedEnv } from "../types";
import { Resend } from "resend";

export const sharedAuth = ({
    DB,
    BETTER_AUTH_COOKIES_DOMAIN,
    BETTER_AUTH_COOKIES_PREFIX,
    BETTER_AUTH_SECRET,
    BETTER_AUTH_URL,
    RESEND_API_KEY,
    RESEND_FROM_EMAIL,
    ENV,
}: TypedEnv) => {
    const cookiesAdvancedSettings: Partial<typeof betterAuth> =
        ENV === "local"
            ? {}
            : {
                  crossSubDomainCookies: {
                      enabled: true,
                      domain: `.${BETTER_AUTH_COOKIES_DOMAIN}`, // Domain with a leading period
                  },
                  defaultCookieAttributes: {
                      domain: BETTER_AUTH_COOKIES_DOMAIN,
                      secure: true,
                      httpOnly: true,
                      sameSite: "none", // Allows CORS-based cookie sharing across subdomains
                      partitioned: true, // New browser standards will mandate this for foreign cookies
                  },
              };
    return betterAuth({
        appName: APP_NAME,
        database: {
            db: DB,
            type: "sqlite",
        },
        baseURL: BETTER_AUTH_URL,
        advanced: {
            cookiePrefix: BETTER_AUTH_COOKIES_PREFIX,
            ...cookiesAdvancedSettings,
        },
        trustedOrigins: ALLOWED_ORIGINS,
        secret: BETTER_AUTH_SECRET,
        user: {
            additionalFields: {
                phone: {
                    type: "string",
                    required: false,
                },
            },
        },
        plugins: [
            emailOTP({
                async sendVerificationOTP({ email, otp }) {
                    const from = RESEND_FROM_EMAIL || "noreply@your-domain.dev";
                    const resend = new Resend(RESEND_API_KEY);

                    await resend.emails.send({
                        from,
                        to: email,
                        subject: `Your ${APP_NAME} Verification Code`,
                        html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${APP_NAME} Verification</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f7ff;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #e8eaff 0%, #f0e6ff 50%, #e6f7f5 100%); border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-top:26px; ">
              <tr>
                <td style="padding: 40px 30px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" style="padding-bottom: 30px;">
                        <h1 style="color: #1f2937; font-size: 28px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">${APP_NAME}</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                          <span style="font-family: monospace; font-size: 24px; font-weight: 600; color: #5b21b6; letter-spacing: 2px;">${otp}</span>
                        </div>
                        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
                          If you didn't request this code, you can safely ignore this email.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding-top: 30px;">
                        <p style="color: #6b7280; font-size: 14px; margin: 0;">
                          Experience the power of ${APP_NAME} Stack for your next project.
                        </p>
                        <p style="color: #6b7280; font-size: 12px; margin: 15px 0 0 0;">
                          &copy; ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
                    });
                },
            }),
        ],
    });
};

export type SharedAuth = typeof sharedAuth;
