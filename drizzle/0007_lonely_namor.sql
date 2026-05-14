ALTER TABLE "department_receipt_entries" DROP CONSTRAINT IF EXISTS "department_receipt_entries_issue_id_department_issue_entries_id_fk";
--> statement-breakpoint
ALTER TABLE "department_receipt_entries" DROP CONSTRAINT IF EXISTS "department_receipt_entries_issue_id_department_issue_entries_id";
--> statement-breakpoint
CREATE UNIQUE INDEX "production_planning_entries_serial_no_unique" ON "production_planning_entries" USING btree ("serial_no");--> statement-breakpoint
ALTER TABLE "department_issue_entries" ADD CONSTRAINT "department_issue_entries_serial_no_production_planning_entries_serial_no_fk" FOREIGN KEY ("serial_no") REFERENCES "public"."production_planning_entries"("serial_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "department_receipt_entries" ADD COLUMN "issue_no" text;--> statement-breakpoint
UPDATE "department_receipt_entries"
SET "issue_no" = "department_issue_entries"."issue_no"
FROM "department_issue_entries"
WHERE "department_receipt_entries"."issue_id" = "department_issue_entries"."id";--> statement-breakpoint
ALTER TABLE "department_receipt_entries" ALTER COLUMN "issue_no" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "department_receipt_entries" DROP COLUMN "issue_id";--> statement-breakpoint
ALTER TABLE "department_receipt_entries" ADD CONSTRAINT "department_receipt_entries_issue_no_department_issue_entries_issue_no_fk" FOREIGN KEY ("issue_no") REFERENCES "public"."department_issue_entries"("issue_no") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "department_receipt_entries_receipt_no_unique" ON "department_receipt_entries" USING btree ("receipt_no");
