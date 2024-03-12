CREATE TABLE IF NOT EXISTS "open_source_licenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"content" text NOT NULL
);
