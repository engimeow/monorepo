ALTER TABLE "user_mbti_history" DROP CONSTRAINT "user_mbti_history_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_mbti_history" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "user_mbti_history" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_mbti_history" ADD COLUMN "user_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_mbti_history" ADD CONSTRAINT "user_mbti_history_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
