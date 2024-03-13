CREATE TABLE IF NOT EXISTS "mbtis" (
	"id" serial PRIMARY KEY NOT NULL,
	"mbti" "mbti" NOT NULL,
	"content" text NOT NULL,
	CONSTRAINT "mbtis_mbti_unique" UNIQUE("mbti")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_mbti_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"name" text NOT NULL,
	"mbti" "mbti",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_mbti_history" ADD CONSTRAINT "user_mbti_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_mbti_history" ADD CONSTRAINT "user_mbti_history_mbti_mbtis_mbti_fk" FOREIGN KEY ("mbti") REFERENCES "mbtis"("mbti") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
