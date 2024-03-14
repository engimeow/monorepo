import {
  pgEnum,
  pgSchema,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const authSchema = pgSchema("auth");

export const mbtiEnum = pgEnum("mbti", [
  "ISTP",
  "ISTJ",
  "ISFP",
  "INTP",
  "INTJ",
  "ISFJ",
  "INFJ",
  "INFP",
  "ESTJ",
  "ESTP",
  "ESFJ",
  "ESFP",
  "ENFJ",
  "ENFP",
]);

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

export const openSourceLicenses = pgTable("open_source_licenses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  content: text("content").notNull(),
});

export const mbtis = pgTable("mbtis", {
  id: serial("id").primaryKey(),
  mbti: mbtiEnum("mbti").unique().notNull(),
  content: text("content").notNull(),
});

export const userMBTIhistory = pgTable("user_mbti_history", {
  id: uuid("id").primaryKey().default("gen_random_uuid ()"),
  user_id: uuid("user_id").references(() => authUsers.id, {
    onDelete: "cascade",
  }),
  name: text("name").notNull(),
  mbti: mbtiEnum("mbti").notNull().references(() => mbtis.mbti, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  }).notNull().defaultNow(),
});
