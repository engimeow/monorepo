CREATE TABLE IF NOT EXISTS "results" (
	"id" serial PRIMARY KEY NOT NULL,
	"mbti" text NOT NULL,
	"content" text NOT NULL,
	CONSTRAINT "results_mbti_unique" UNIQUE("mbti")
);
