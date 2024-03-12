import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id"),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const contributors = pgTable("contributors", {
  id: serial("id").primaryKey(),
  position: text("position").notNull(),
  content: text("content").notNull(),
  name: text("name").notNull(),
});
