CREATE TABLE "karigar_receipt_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"issue_no" text NOT NULL,
	"delay" text DEFAULT '0' NOT NULL,
	"voucher_number" text NOT NULL,
	"pcs" integer DEFAULT 0 NOT NULL,
	"ghat_jama_weight" numeric(12, 3) DEFAULT '0' NOT NULL,
	"ghat_melting" numeric(12, 3) DEFAULT '0' NOT NULL,
	"ghat_wastage" numeric(12, 3) DEFAULT '0' NOT NULL,
	"total_weight" numeric(12, 3) DEFAULT '0' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "karigar_receipt_entries" ADD CONSTRAINT "karigar_receipt_entries_issue_no_karigar_issue_entries_issue_no_fk" FOREIGN KEY ("issue_no") REFERENCES "public"."karigar_issue_entries"("issue_no") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "karigar_receipt_entries_voucher_number_unique" ON "karigar_receipt_entries" USING btree ("voucher_number");