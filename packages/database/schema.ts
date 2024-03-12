import {
  pgSchema,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const authSchema = pgSchema("auth");

export const authUsers = authSchema.table("users", {
  id: uuid("id").primaryKey().notNull(),
});

export const contributors = pgTable("contributors", {
  id: serial("id").primaryKey(),
  position: text("position").notNull(),
  content: text("content").notNull(),
  name: text("name").notNull(),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  mbti: text("mbti").notNull(),
  type: text("type").notNull(),
  questions: text("question").notNull(),
});

export const mbtis = pgTable("mbtis", {
  id: serial("id").primaryKey(),
  mbti: text("mbti").unique().notNull(),
  content: text("content").notNull(),
});

export const userMBTIhistory = pgTable("user_mbti_history", {
  id: serial("id").primaryKey(),
  user_id: uuid("id").notNull().references(() => authUsers.id, {
    onDelete: "cascade",
  }),
  name: text("name").notNull(),
  mbti: text("mbti").references(() => mbtis.mbti, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  }).notNull().defaultNow(),
});

export const openSourceLicenses = pgTable("open_source_licenses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  content: text("content").notNull(),
});
