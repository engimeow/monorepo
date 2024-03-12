CREATE TABLE IF NOT EXISTS "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"mbti" text NOT NULL,
	"type" text NOT NULL,
	"questions" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "user";