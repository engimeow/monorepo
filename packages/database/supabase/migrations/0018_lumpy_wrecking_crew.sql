--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_mbti_history" (
	"id" uuid NOT NULL,
	"name" text NOT NULL,
	"mbti" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_mbti_history" ADD CONSTRAINT "user_mbti_history_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_mbti_history" ADD CONSTRAINT "user_mbti_history_mbti_mbtis_mbti_fk" FOREIGN KEY ("mbti") REFERENCES "mbtis"("mbti") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
