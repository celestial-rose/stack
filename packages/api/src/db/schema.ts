import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: integer("emailVerified").notNull(),
    image: text("image"),
    createdAt: text("createdAt").notNull(),
    updatedAt: text("updatedAt").notNull(),
    phone: text("phone"),
});

export const session = sqliteTable("session", {
    id: text("id").notNull().primaryKey(),
    expiresAt: text("expiresAt").notNull(),
    token: text("token").notNull().unique(),
    createdAt: text("createdAt").notNull(),
    updatedAt: text("updatedAt").notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId")
        .notNull()
        .references(() => user.id),
});

export const account = sqliteTable("account", {
    id: text("id").notNull().primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: text("userId")
        .notNull()
        .references(() => user.id),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    accessTokenExpiresAt: text("accessTokenExpiresAt"),
    refreshTokenExpiresAt: text("refreshTokenExpiresAt"),
    scope: text("scope"),
    password: text("password"),
    createdAt: text("createdAt").notNull(),
    updatedAt: text("updatedAt").notNull(),
});

export const verification = sqliteTable("verification", {
    id: text("id").notNull().primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: text("expiresAt").notNull(),
    createdAt: text("createdAt"),
    updatedAt: text("updatedAt"),
});

// Posts table (example)
export const post = sqliteTable("post", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    authorId: text("author_id")
        .notNull()
        .references(() => user.id),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

// Comments table (example)
export const comment = sqliteTable("comment", {
    id: text("id").primaryKey(),
    content: text("content").notNull(),
    postId: text("post_id")
        .notNull()
        .references(() => post.id),
    authorId: text("author_id")
        .notNull()
        .references(() => user.id),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
