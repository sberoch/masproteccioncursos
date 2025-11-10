import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_client_logos_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_id\` integer NOT NULL,
  	\`alt\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_client_logos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_client_logos_logos_order_idx\` ON \`pages_blocks_client_logos_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_client_logos_logos_parent_id_idx\` ON \`pages_blocks_client_logos_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_client_logos_logos_logo_idx\` ON \`pages_blocks_client_logos_logos\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_client_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`column_count\` text DEFAULT '4',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_client_logos_order_idx\` ON \`pages_blocks_client_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_client_logos_parent_id_idx\` ON \`pages_blocks_client_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_client_logos_path_idx\` ON \`pages_blocks_client_logos\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_images_order_idx\` ON \`pages_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_images_parent_id_idx\` ON \`pages_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_images_image_idx\` ON \`pages_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_order_idx\` ON \`pages_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_parent_id_idx\` ON \`pages_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_gallery_path_idx\` ON \`pages_blocks_gallery\` (\`_path\`);`)
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
  await db.run(sql`CREATE TABLE \`about_blocks_client_logos_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_id\` integer NOT NULL,
  	\`alt\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_blocks_client_logos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_client_logos_logos_order_idx\` ON \`about_blocks_client_logos_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_client_logos_logos_parent_id_idx\` ON \`about_blocks_client_logos_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_client_logos_logos_logo_idx\` ON \`about_blocks_client_logos_logos\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_client_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`column_count\` text DEFAULT '4',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_client_logos_order_idx\` ON \`about_blocks_client_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_client_logos_parent_id_idx\` ON \`about_blocks_client_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_client_logos_path_idx\` ON \`about_blocks_client_logos\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_gallery_images_order_idx\` ON \`about_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_gallery_images_parent_id_idx\` ON \`about_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_gallery_images_image_idx\` ON \`about_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_gallery_order_idx\` ON \`about_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_gallery_parent_id_idx\` ON \`about_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_gallery_path_idx\` ON \`about_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`contact_blocks_client_logos_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_id\` integer NOT NULL,
  	\`alt\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact_blocks_client_logos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_blocks_client_logos_logos_order_idx\` ON \`contact_blocks_client_logos_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_client_logos_logos_parent_id_idx\` ON \`contact_blocks_client_logos_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_client_logos_logos_logo_idx\` ON \`contact_blocks_client_logos_logos\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_blocks_client_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`column_count\` text DEFAULT '4',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_blocks_client_logos_order_idx\` ON \`contact_blocks_client_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_client_logos_parent_id_idx\` ON \`contact_blocks_client_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_client_logos_path_idx\` ON \`contact_blocks_client_logos\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`contact_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_blocks_gallery_images_order_idx\` ON \`contact_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_gallery_images_parent_id_idx\` ON \`contact_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_gallery_images_image_idx\` ON \`contact_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_blocks_gallery_order_idx\` ON \`contact_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_gallery_parent_id_idx\` ON \`contact_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_gallery_path_idx\` ON \`contact_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`work_blocks_client_logos_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_id\` integer NOT NULL,
  	\`alt\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work_blocks_client_logos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_blocks_client_logos_logos_order_idx\` ON \`work_blocks_client_logos_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_client_logos_logos_parent_id_idx\` ON \`work_blocks_client_logos_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_client_logos_logos_logo_idx\` ON \`work_blocks_client_logos_logos\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`work_blocks_client_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`column_count\` text DEFAULT '4',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_blocks_client_logos_order_idx\` ON \`work_blocks_client_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_client_logos_parent_id_idx\` ON \`work_blocks_client_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_client_logos_path_idx\` ON \`work_blocks_client_logos\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`work_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_blocks_gallery_images_order_idx\` ON \`work_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_gallery_images_parent_id_idx\` ON \`work_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_gallery_images_image_idx\` ON \`work_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`work_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_blocks_gallery_order_idx\` ON \`work_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_gallery_parent_id_idx\` ON \`work_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_gallery_path_idx\` ON \`work_blocks_gallery\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_client_logos_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_id\` integer NOT NULL,
  	\`alt\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_client_logos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_client_logos_logos_order_idx\` ON \`services_blocks_client_logos_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_client_logos_logos_parent_id_idx\` ON \`services_blocks_client_logos_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_client_logos_logos_logo_idx\` ON \`services_blocks_client_logos_logos\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_client_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`column_count\` text DEFAULT '4',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_client_logos_order_idx\` ON \`services_blocks_client_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_client_logos_parent_id_idx\` ON \`services_blocks_client_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_client_logos_path_idx\` ON \`services_blocks_client_logos\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_gallery_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`caption\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_gallery\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_images_order_idx\` ON \`services_blocks_gallery_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_images_parent_id_idx\` ON \`services_blocks_gallery_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_images_image_idx\` ON \`services_blocks_gallery_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_order_idx\` ON \`services_blocks_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_parent_id_idx\` ON \`services_blocks_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_gallery_path_idx\` ON \`services_blocks_gallery\` (\`_path\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_client_logos_logos\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_client_logos\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_client_logos_logos\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_client_logos\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_client_logos_logos\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_client_logos\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`contact_blocks_client_logos_logos\`;`)
  await db.run(sql`DROP TABLE \`contact_blocks_client_logos\`;`)
  await db.run(sql`DROP TABLE \`contact_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`contact_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`work_blocks_client_logos_logos\`;`)
  await db.run(sql`DROP TABLE \`work_blocks_client_logos\`;`)
  await db.run(sql`DROP TABLE \`work_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`work_blocks_gallery\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_client_logos_logos\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_client_logos\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_gallery_images\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_gallery\`;`)
}
