"use client";
// ^-- to make sure we can mount the Provider from a server component

import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { httpLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";
import { makeQueryClient } from "./query-client";
import type { appRouter } from "@celestial/api/src/trpc/router";
import { TRPC_ENDPOINT } from "@celestial/shared";

// Use the inferred type from the router instance instead of the type
export const trpc = createTRPCReact<typeof appRouter>();
let clientQueryClientSingleton: QueryClient;
function getQueryClient() {
    if (typeof window === "undefined") {
        // Server: always make a new query client
        return makeQueryClient();
    }
    // Browser: use singleton pattern to keep the same query client
    // biome-ignore lint: singleton pattern using nullish coalescing assignment
    return (clientQueryClientSingleton ??= makeQueryClient());
}

export function TRPCProvider(
    props: Readonly<{
        children: React.ReactNode;
    }>
) {
    // NOTE: Avoid useState when initializing the query client if you don't
    //       have a suspense boundary between this and the code that may
    //       suspend because React will throw away the client on the initial
    //       render if it suspends and there is no boundary
    const queryClient = getQueryClient();
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpLink({
                    // transformer: superjson, <-- if you use a data transformer
                    url: TRPC_ENDPOINT,
                    fetch(url, options) {
                        return fetch(url, {
                            ...options,
                            credentials: "include",
                        });
                    },
                }),
            ],
        })
    );
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
        </trpc.Provider>
    );
}
