ALTER TABLE "michaelangeloio"."accounts" ALTER COLUMN "expires_at" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "michaelangeloio"."accounts" ADD COLUMN "refresh_token_expires_in" bigint;