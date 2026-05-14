CREATE TABLE "karigar_issue_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL,
	"issue_no" text NOT NULL,
	"order_no" text NOT NULL,
	"total_weight" numeric(12, 3) NOT NULL,
	"melting_type" text NOT NULL,
	"karigar_name" text NOT NULL,
	"expected_delivery" text DEFAULT '',
	"authorized_by" text NOT NULL,
	"direct_metal" numeric(12, 3) DEFAULT '0' NOT NULL,
	"die" numeric(12, 3) DEFAULT '0' NOT NULL,
	"chain" numeric(12, 3) DEFAULT '0' NOT NULL,
	"taar" numeric(12, 3) DEFAULT '0' NOT NULL,
	"kdm" numeric(12, 3) DEFAULT '0' NOT NULL,
	"planned" text DEFAULT '',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "karigar_issue_entries_issue_no_unique" ON "karigar_issue_entries" USING btree ("issue_no");