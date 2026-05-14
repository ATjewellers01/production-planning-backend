CREATE TABLE "department_receipt_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"issue_id" uuid NOT NULL,
	"receipt_no" text NOT NULL,
	"finished_net" numeric(12, 3) DEFAULT '0' NOT NULL,
	"scrap_metal" numeric(12, 3) DEFAULT '0' NOT NULL,
	"dust_weight" numeric(12, 3) DEFAULT '0' NOT NULL,
	"metal_loss" numeric(12, 3) DEFAULT '0' NOT NULL,
	"return_type" text NOT NULL,
	"received_by" text NOT NULL,
	"remarks" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "department_receipt_entries" ADD CONSTRAINT "department_receipt_entries_issue_id_department_issue_entries_id_fk" FOREIGN KEY ("issue_id") REFERENCES "public"."department_issue_entries"("id") ON DELETE cascade ON UPDATE no action;