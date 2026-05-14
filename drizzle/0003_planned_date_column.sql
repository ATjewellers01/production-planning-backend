ALTER TABLE "production_planning_entries"
  RENAME COLUMN "planned_status" TO "planned";
--> statement-breakpoint
ALTER TABLE "production_planning_entries"
  ALTER COLUMN "planned" DROP DEFAULT;
--> statement-breakpoint
ALTER TABLE "production_planning_entries"
  ALTER COLUMN "planned" TYPE timestamp with time zone
  USING now();
--> statement-breakpoint
ALTER TABLE "production_planning_entries"
  ALTER COLUMN "planned" SET DEFAULT now();
