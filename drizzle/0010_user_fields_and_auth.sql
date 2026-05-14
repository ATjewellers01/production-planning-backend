DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "user_id" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone_number" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile_image" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "page_access" text DEFAULT 'All' NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "users_user_id_unique" ON "users" USING btree ("user_id");--> statement-breakpoint
DROP TYPE "public"."user_role";