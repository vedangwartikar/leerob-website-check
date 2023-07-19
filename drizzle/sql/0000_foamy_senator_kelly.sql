CREATE SCHEMA "michaelangeloio";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "michaelangeloio"."accounts" (
	"userId" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT accounts_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "michaelangeloio"."auth_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"is_subscribed" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "michaelangeloio"."comments" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"email" text,
	"comment" varchar(2000) NOT NULL,
	"comment_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "michaelangeloio"."sessions" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "michaelangeloio"."verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT verificationToken_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "michaelangeloio"."views" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"email" text,
	"route" varchar,
	"geo_ip_country" varchar,
	"geo_ip_region" varchar,
	"geo_ip_city" varchar,
	"geo_ip_latitude" varchar,
	"geo_ip_longitude" varchar,
	"view_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userId_idx" ON "michaelangeloio"."accounts" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "provider_idx" ON "michaelangeloio"."accounts" ("provider");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "providerAccountId_idx" ON "michaelangeloio"."accounts" ("providerAccountId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "expires_at_idx" ON "michaelangeloio"."accounts" ("expires_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "type_idx" ON "michaelangeloio"."accounts" ("type");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "id_idx" ON "michaelangeloio"."auth_users" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email" ON "michaelangeloio"."auth_users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "emailVerified" ON "michaelangeloio"."auth_users" ("emailVerified");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "id_idx" ON "michaelangeloio"."comments" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_idx" ON "michaelangeloio"."comments" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "comment_date_idx" ON "michaelangeloio"."comments" ("comment_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "userId_idx" ON "michaelangeloio"."sessions" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "expires_idx" ON "michaelangeloio"."sessions" ("expires");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessionToken_idx" ON "michaelangeloio"."sessions" ("sessionToken");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "expires_idx" ON "michaelangeloio"."verificationToken" ("expires");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "token_idx" ON "michaelangeloio"."verificationToken" ("token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "identifier_idx" ON "michaelangeloio"."verificationToken" ("identifier");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "id_idx" ON "michaelangeloio"."views" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_idx" ON "michaelangeloio"."views" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "route_idx" ON "michaelangeloio"."views" ("route");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "view_date_idx" ON "michaelangeloio"."views" ("view_date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geo_ip_country_idx" ON "michaelangeloio"."views" ("geo_ip_country");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geo_ip_region_idx" ON "michaelangeloio"."views" ("geo_ip_region");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geo_ip_city_idx" ON "michaelangeloio"."views" ("geo_ip_city");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geo_ip_latitude_idx" ON "michaelangeloio"."views" ("geo_ip_latitude");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "geo_ip_longitude_idx" ON "michaelangeloio"."views" ("geo_ip_longitude");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "michaelangeloio"."accounts" ADD CONSTRAINT "accounts_userId_auth_users_id_fk" FOREIGN KEY ("userId") REFERENCES "michaelangeloio"."auth_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "michaelangeloio"."sessions" ADD CONSTRAINT "sessions_userId_auth_users_id_fk" FOREIGN KEY ("userId") REFERENCES "michaelangeloio"."auth_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
