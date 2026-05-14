CREATE TABLE "department_issue_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL,
	"issue_no" text NOT NULL,
	"serial_no" text NOT NULL,
	"order_no" text NOT NULL,
	"issue_weight" numeric(12, 3) NOT NULL,
	"karigar_name" text NOT NULL,
	"authorized_by" text NOT NULL,
	"planned_status" text DEFAULT 'pending' NOT NULL,
	"dept" text NOT NULL,
	"melting_type" text DEFAULT '',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "department_issue_entries_issue_no_unique" ON "department_issue_entries" USING btree ("issue_no");
