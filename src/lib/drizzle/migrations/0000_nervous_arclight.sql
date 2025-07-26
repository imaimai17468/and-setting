CREATE TABLE "follows" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"follower_id" varchar(255) NOT NULL,
	"following_id" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"icon_url" text,
	"email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
	CONSTRAINT "members_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "rules" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"tool" text NOT NULL,
	"tags" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"member_id" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
	"updated_at" timestamp with time zone DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_members_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_id_members_id_fk" FOREIGN KEY ("following_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rules" ADD CONSTRAINT "rules_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;