import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth as _Auth } from "../auth";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function useAuthGuard(redirectPath = "/") {
    const db = ((await getCloudflareContext({ async: true })).env as { DB: D1Database }).DB;
    const auth = _Auth(db);
    const session = await auth.api
        .getSession({
            headers: await headers(),
        })
        .catch(() => {
            redirect(redirectPath);
        });

    if (!session) {
        redirect(redirectPath);
    }

    return session;
}

export async function checkAuth() {
    const db = ((await getCloudflareContext({ async: true })).env as { DB: D1Database }).DB;
    const auth = _Auth(db);
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        return session;
    } catch (_error) {
        return null;
    }
}
