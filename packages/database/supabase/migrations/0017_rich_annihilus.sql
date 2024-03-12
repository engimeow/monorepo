CREATE TABLE IF NOT EXISTS "mbtis" (
	"id" serial PRIMARY KEY NOT NULL,
	"mbti" text NOT NULL,
	"content" text NOT NULL,
	CONSTRAINT "mbtis_mbti_unique" UNIQUE("mbti")
);
