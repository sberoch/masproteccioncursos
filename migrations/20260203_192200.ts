import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`home_blocks_hero_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_hero\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_hero_stats_order_idx\` ON \`home_blocks_hero_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_hero_stats_parent_id_idx\` ON \`home_blocks_hero_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`badge\` text,
  	\`headline\` text,
  	\`headline_highlight\` text,
  	\`subtitle\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_href\` text,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_href\` text,
  	\`image_id\` integer,
  	\`image_badge_title\` text,
  	\`image_badge_subtitle\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_hero_order_idx\` ON \`home_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_hero_parent_id_idx\` ON \`home_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_hero_path_idx\` ON \`home_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_hero_image_idx\` ON \`home_blocks_hero\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_course_intro_story_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_course_intro\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_course_intro_story_paragraphs_order_idx\` ON \`home_blocks_course_intro_story_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_course_intro_story_paragraphs_parent_id_idx\` ON \`home_blocks_course_intro_story_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_course_intro\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	\`video_thumbnail_id\` integer,
  	\`video_id\` integer,
  	\`video_url\` text,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`video_thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_course_intro_order_idx\` ON \`home_blocks_course_intro\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_course_intro_parent_id_idx\` ON \`home_blocks_course_intro\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_course_intro_path_idx\` ON \`home_blocks_course_intro\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_course_intro_video_thumbnail_idx\` ON \`home_blocks_course_intro\` (\`video_thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_course_intro_video_idx\` ON \`home_blocks_course_intro\` (\`video_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_about_instructor_bio_paragraphs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`paragraph\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_about_instructor\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_about_instructor_bio_paragraphs_order_idx\` ON \`home_blocks_about_instructor_bio_paragraphs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_about_instructor_bio_paragraphs_parent_id_idx\` ON \`home_blocks_about_instructor_bio_paragraphs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_about_instructor_credentials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_about_instructor\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_about_instructor_credentials_order_idx\` ON \`home_blocks_about_instructor_credentials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_about_instructor_credentials_parent_id_idx\` ON \`home_blocks_about_instructor_credentials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_about_instructor\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_about_instructor_order_idx\` ON \`home_blocks_about_instructor\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_about_instructor_parent_id_idx\` ON \`home_blocks_about_instructor\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_about_instructor_path_idx\` ON \`home_blocks_about_instructor\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_about_instructor_image_idx\` ON \`home_blocks_about_instructor\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_course_modules_modules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` numeric NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_course_modules\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_course_modules_modules_order_idx\` ON \`home_blocks_course_modules_modules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_course_modules_modules_parent_id_idx\` ON \`home_blocks_course_modules_modules\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_course_modules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	\`subtitle\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_course_modules_order_idx\` ON \`home_blocks_course_modules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_course_modules_parent_id_idx\` ON \`home_blocks_course_modules\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_course_modules_path_idx\` ON \`home_blocks_course_modules\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_testimonials_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text,
  	\`author_name\` text,
  	\`author_role\` text,
  	\`video_id\` integer,
  	\`thumbnail_id\` integer,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_testimonials_testimonials_order_idx\` ON \`home_blocks_testimonials_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_testimonials_testimonials_parent_id_idx\` ON \`home_blocks_testimonials_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_testimonials_testimonials_video_idx\` ON \`home_blocks_testimonials_testimonials\` (\`video_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_testimonials_testimonials_thumbnail_idx\` ON \`home_blocks_testimonials_testimonials\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_testimonials_order_idx\` ON \`home_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_testimonials_parent_id_idx\` ON \`home_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_testimonials_path_idx\` ON \`home_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_pricing_includes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_pricing\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_pricing_includes_order_idx\` ON \`home_blocks_pricing_includes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_pricing_includes_parent_id_idx\` ON \`home_blocks_pricing_includes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_pricing\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	\`description\` text,
  	\`price_label\` text,
  	\`price_currency\` text,
  	\`price_value\` text,
  	\`price_period\` text,
  	\`cta_label\` text,
  	\`cta_href\` text,
  	\`guarantee_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_pricing_order_idx\` ON \`home_blocks_pricing\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_pricing_parent_id_idx\` ON \`home_blocks_pricing\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_pricing_path_idx\` ON \`home_blocks_pricing\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_faq_items_order_idx\` ON \`home_blocks_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_faq_items_parent_id_idx\` ON \`home_blocks_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_faq_order_idx\` ON \`home_blocks_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_faq_parent_id_idx\` ON \`home_blocks_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_faq_path_idx\` ON \`home_blocks_faq\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_blog_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text,
  	\`date\` text,
  	\`title\` text NOT NULL,
  	\`excerpt\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_blog\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_blog_cards_order_idx\` ON \`home_blocks_blog_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_blog_cards_parent_id_idx\` ON \`home_blocks_blog_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_blog\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text,
  	\`view_all_label\` text,
  	\`view_all_href\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_blog_order_idx\` ON \`home_blocks_blog\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_blog_parent_id_idx\` ON \`home_blocks_blog\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_blog_path_idx\` ON \`home_blocks_blog\` (\`_path\`);`)
  await db.run(sql`DROP TABLE \`home_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_banner\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_client_logos_logos\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_client_logos\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`home_rels\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_cta\` ADD \`heading\` text;`)
  await db.run(sql`ALTER TABLE \`home_blocks_cta\` ADD \`text\` text;`)
  await db.run(sql`ALTER TABLE \`home_blocks_cta\` ADD \`primary_label\` text;`)
  await db.run(sql`ALTER TABLE \`home_blocks_cta\` ADD \`primary_href\` text;`)
  await db.run(sql`ALTER TABLE \`home_blocks_cta\` ADD \`secondary_label\` text;`)
  await db.run(sql`ALTER TABLE \`home_blocks_cta\` ADD \`secondary_href\` text;`)
  await db.run(sql`ALTER TABLE \`home_blocks_cta\` DROP COLUMN \`rich_text\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`home_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'full',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_content_columns_order_idx\` ON \`home_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_content_columns_parent_id_idx\` ON \`home_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_content_order_idx\` ON \`home_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_content_parent_id_idx\` ON \`home_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_content_path_idx\` ON \`home_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_cta_links_order_idx\` ON \`home_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_cta_links_parent_id_idx\` ON \`home_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_media_block_order_idx\` ON \`home_blocks_media_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_media_block_parent_id_idx\` ON \`home_blocks_media_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_media_block_path_idx\` ON \`home_blocks_media_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_media_block_media_idx\` ON \`home_blocks_media_block\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'info' NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_banner_order_idx\` ON \`home_blocks_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_banner_parent_id_idx\` ON \`home_blocks_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_banner_path_idx\` ON \`home_blocks_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_form_block_order_idx\` ON \`home_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_form_block_parent_id_idx\` ON \`home_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_form_block_path_idx\` ON \`home_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_form_block_form_idx\` ON \`home_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_client_logos_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_id\` integer NOT NULL,
  	\`alt\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_client_logos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_client_logos_logos_order_idx\` ON \`home_blocks_client_logos_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_client_logos_logos_parent_id_idx\` ON \`home_blocks_client_logos_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_client_logos_logos_logo_idx\` ON \`home_blocks_client_logos_logos\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_client_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`column_count\` text DEFAULT '4',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_client_logos_order_idx\` ON \`home_blocks_client_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_client_logos_parent_id_idx\` ON \`home_blocks_client_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_client_logos_path_idx\` ON \`home_blocks_client_logos\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_gallery_images_order_idx\` ON \`home_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_gallery_images_parent_id_idx\` ON \`home_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_gallery_images_image_idx\` ON \`home_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_gallery_order_idx\` ON \`home_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_gallery_parent_id_idx\` ON \`home_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_gallery_path_idx\` ON \`home_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_rels_order_idx\` ON \`home_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_parent_idx\` ON \`home_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_path_idx\` ON \`home_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_pages_id_idx\` ON \`home_rels\` (\`pages_id\`);`)
  await db.run(sql`DROP TABLE \`home_blocks_hero_stats\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_course_intro_story_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_course_intro\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_about_instructor_bio_paragraphs\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_about_instructor_credentials\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_about_instructor\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_course_modules_modules\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_course_modules\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_testimonials_testimonials\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_pricing_includes\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_pricing\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_faq_items\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_faq\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_blog_cards\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_blog\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_cta\` ADD \`rich_text\` text;`)
  await db.run(sql`ALTER TABLE \`home_blocks_cta\` DROP COLUMN \`heading\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_cta\` DROP COLUMN \`text\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_cta\` DROP COLUMN \`primary_label\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_cta\` DROP COLUMN \`primary_href\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_cta\` DROP COLUMN \`secondary_label\`;`)
  await db.run(sql`ALTER TABLE \`home_blocks_cta\` DROP COLUMN \`secondary_href\`;`)
}
