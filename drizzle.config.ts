import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite", // 'mysql' | 'sqlite' | 'turso'
    schema: "packages/api/src/db/schema.ts",
    out: "./packages/api/src/migrations",
});
