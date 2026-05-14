CREATE TABLE IF NOT EXISTS "alloy_conversion_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL,
	"serial_no" text NOT NULL,
	"production_plan" text NOT NULL,
	"target_karat" text NOT NULL,
	"batch_number" text NOT NULL,
	"input_24k" numeric(12, 3) NOT NULL,
	"purity" numeric(5, 2) NOT NULL,
	"expected_output" numeric(12, 3) NOT NULL,
	"actual_output" numeric(12, 3) NOT NULL,
	"estimated_loss" numeric(12, 3) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "alloy_conversion_entries_serial_no_unique" ON "alloy_conversion_entries" USING btree ("serial_no");
