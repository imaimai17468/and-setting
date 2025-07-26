import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// membersテーブルの定義
export const members = pgTable("members", {
	id: varchar("id", { length: 255 }).primaryKey(),
	name: text("name").notNull(),
	iconUrl: text("icon_url"),
	email: text("email").notNull().unique(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.default(sql`TIMEZONE('utc', NOW())`),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.default(sql`TIMEZONE('utc', NOW())`),
});

// フォロー関係のテーブル
export const follows = pgTable("follows", {
	id: uuid("id").primaryKey().defaultRandom(),
	followerId: varchar("follower_id", { length: 255 })
		.notNull()
		.references(() => members.id, { onDelete: "cascade" }),
	followingId: varchar("following_id", { length: 255 })
		.notNull()
		.references(() => members.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.default(sql`TIMEZONE('utc', NOW())`),
});

// ルールテーブルの定義
export const rules = pgTable("rules", {
	id: varchar("id", { length: 255 }).primaryKey(),
	title: text("title").notNull(),
	content: text("content").notNull(),
	tool: text("tool").notNull(),
	tags: text("tags").array().notNull().default(sql`ARRAY[]::text[]`),
	memberId: varchar("member_id", { length: 255 })
		.notNull()
		.references(() => members.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.default(sql`TIMEZONE('utc', NOW())`),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.default(sql`TIMEZONE('utc', NOW())`),
});

export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;

export type Follow = typeof follows.$inferSelect;
export type NewFollow = typeof follows.$inferInsert;

export type Rule = typeof rules.$inferSelect;
export type NewRule = typeof rules.$inferInsert;
