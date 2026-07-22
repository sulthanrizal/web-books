CREATE TABLE "web-books"."categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "web-books"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "web-books"."reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "rating_range" CHECK ("web-books"."reviews"."rating" >= 1 AND "web-books"."reviews"."rating" <= 5)
);
--> statement-breakpoint
CREATE TABLE "web-books"."favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"book_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "web-books"."books" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "web-books"."books" ADD COLUMN "isbn" varchar(20);--> statement-breakpoint
ALTER TABLE "web-books"."books" ADD COLUMN "cover_url" varchar(500);--> statement-breakpoint
ALTER TABLE "web-books"."books" ADD COLUMN "published_year" integer;--> statement-breakpoint
ALTER TABLE "web-books"."books" ADD COLUMN "category_id" integer;--> statement-breakpoint
ALTER TABLE "web-books"."books" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "web-books"."reviews" ADD CONSTRAINT "reviews_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "web-books"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "web-books"."reviews" ADD CONSTRAINT "reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "web-books"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "web-books"."favorites" ADD CONSTRAINT "favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "web-books"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "web-books"."favorites" ADD CONSTRAINT "favorites_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "web-books"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "reviews_user_book_unique" ON "web-books"."reviews" USING btree ("user_id","book_id");--> statement-breakpoint
CREATE UNIQUE INDEX "favorites_user_book_unique" ON "web-books"."favorites" USING btree ("user_id","book_id");--> statement-breakpoint
ALTER TABLE "web-books"."books" ADD CONSTRAINT "books_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "web-books"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "web-books"."books" ADD CONSTRAINT "books_isbn_unique" UNIQUE("isbn");