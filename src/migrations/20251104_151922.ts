import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`work_items\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	\`client\` text,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`work_items_media_idx\` ON \`work_items\` (\`media_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`work_items_slug_idx\` ON \`work_items\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`work_items_updated_at_idx\` ON \`work_items\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`work_items_created_at_idx\` ON \`work_items\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`work_items__status_idx\` ON \`work_items\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`work_items_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`work_items\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_items_rels_order_idx\` ON \`work_items_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`work_items_rels_parent_idx\` ON \`work_items_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_items_rels_path_idx\` ON \`work_items_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`work_items_rels_categories_id_idx\` ON \`work_items_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`_work_items_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_media_id\` integer,
  	\`version_title\` text,
  	\`version_description\` text,
  	\`version_client\` text,
  	\`version_generate_slug\` integer DEFAULT true,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`work_items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_work_items_v_parent_idx\` ON \`_work_items_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_items_v_version_version_media_idx\` ON \`_work_items_v\` (\`version_media_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_items_v_version_version_slug_idx\` ON \`_work_items_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_work_items_v_version_version_updated_at_idx\` ON \`_work_items_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_work_items_v_version_version_created_at_idx\` ON \`_work_items_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_work_items_v_version_version__status_idx\` ON \`_work_items_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_work_items_v_created_at_idx\` ON \`_work_items_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_work_items_v_updated_at_idx\` ON \`_work_items_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_work_items_v_latest_idx\` ON \`_work_items_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_work_items_v_autosave_idx\` ON \`_work_items_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_work_items_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_work_items_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_work_items_v_rels_order_idx\` ON \`_work_items_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_work_items_v_rels_parent_idx\` ON \`_work_items_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_items_v_rels_path_idx\` ON \`_work_items_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_work_items_v_rels_categories_id_idx\` ON \`_work_items_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_header\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`subheading\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_header_order_idx\` ON \`pages_blocks_header\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_header_parent_id_idx\` ON \`pages_blocks_header\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_header_path_idx\` ON \`pages_blocks_header\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_header_image_idx\` ON \`pages_blocks_header\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`caption\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`socials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	\`icon\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`socials_updated_at_idx\` ON \`socials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`socials_created_at_idx\` ON \`socials\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_order_idx\` ON \`forms_blocks_checkbox\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_parent_id_idx\` ON \`forms_blocks_checkbox\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_path_idx\` ON \`forms_blocks_checkbox\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_country\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_order_idx\` ON \`forms_blocks_country\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_parent_id_idx\` ON \`forms_blocks_country\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_path_idx\` ON \`forms_blocks_country\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_email\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_order_idx\` ON \`forms_blocks_email\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_parent_id_idx\` ON \`forms_blocks_email\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_path_idx\` ON \`forms_blocks_email\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_message\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`message\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_order_idx\` ON \`forms_blocks_message\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_parent_id_idx\` ON \`forms_blocks_message\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_path_idx\` ON \`forms_blocks_message\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_order_idx\` ON \`forms_blocks_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_parent_id_idx\` ON \`forms_blocks_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_path_idx\` ON \`forms_blocks_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_order_idx\` ON \`forms_blocks_select_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_parent_id_idx\` ON \`forms_blocks_select_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_order_idx\` ON \`forms_blocks_select\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_parent_id_idx\` ON \`forms_blocks_select\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_path_idx\` ON \`forms_blocks_select\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_state\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_order_idx\` ON \`forms_blocks_state\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_parent_id_idx\` ON \`forms_blocks_state\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_path_idx\` ON \`forms_blocks_state\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_order_idx\` ON \`forms_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_parent_id_idx\` ON \`forms_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_path_idx\` ON \`forms_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_textarea\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`label\` text,
  	\`width\` numeric,
  	\`default_value\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_order_idx\` ON \`forms_blocks_textarea\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_parent_id_idx\` ON \`forms_blocks_textarea\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_path_idx\` ON \`forms_blocks_textarea\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_emails_order_idx\` ON \`forms_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_emails_parent_id_idx\` ON \`forms_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`submit_button_label\` text,
  	\`confirmation_type\` text DEFAULT 'message',
  	\`confirmation_message\` text,
  	\`redirect_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_updated_at_idx\` ON \`forms\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`forms_created_at_idx\` ON \`forms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions_submission_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_order_idx\` ON \`form_submissions_submission_data\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_parent_id_idx\` ON \`form_submissions_submission_data\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_form_idx\` ON \`form_submissions\` (\`form_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_updated_at_idx\` ON \`form_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_created_at_idx\` ON \`form_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`work_items_id\` integer,
  	\`categories_id\` integer,
  	\`pages_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	\`socials_id\` integer,
  	\`forms_id\` integer,
  	\`form_submissions_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_items_id\`) REFERENCES \`work_items\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`socials_id\`) REFERENCES \`socials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_work_items_id_idx\` ON \`payload_locked_documents_rels\` (\`work_items_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_socials_id_idx\` ON \`payload_locked_documents_rels\` (\`socials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
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
  await db.run(sql`CREATE TABLE \`home_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_cta_order_idx\` ON \`home_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_cta_parent_id_idx\` ON \`home_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_cta_path_idx\` ON \`home_blocks_cta\` (\`_path\`);`)
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
  await db.run(sql`CREATE TABLE \`home_blocks_collection_item_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'work-items',
  	\`limit\` numeric DEFAULT 10,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_blocks_collection_item_list_order_idx\` ON \`home_blocks_collection_item_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_collection_item_list_parent_id_idx\` ON \`home_blocks_collection_item_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_blocks_collection_item_list_path_idx\` ON \`home_blocks_collection_item_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`home\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`home_meta_meta_image_idx\` ON \`home\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE TABLE \`home_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`categories_id\` integer,
  	\`work_items_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_items_id\`) REFERENCES \`work_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_rels_order_idx\` ON \`home_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_parent_idx\` ON \`home_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_path_idx\` ON \`home_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_pages_id_idx\` ON \`home_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_categories_id_idx\` ON \`home_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_work_items_id_idx\` ON \`home_rels\` (\`work_items_id\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_content_columns\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_content_columns_order_idx\` ON \`about_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_content_columns_parent_id_idx\` ON \`about_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_content_order_idx\` ON \`about_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_content_parent_id_idx\` ON \`about_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_content_path_idx\` ON \`about_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_cta_links_order_idx\` ON \`about_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_cta_links_parent_id_idx\` ON \`about_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_cta_order_idx\` ON \`about_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_cta_parent_id_idx\` ON \`about_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_cta_path_idx\` ON \`about_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_media_block_order_idx\` ON \`about_blocks_media_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_media_block_parent_id_idx\` ON \`about_blocks_media_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_media_block_path_idx\` ON \`about_blocks_media_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_media_block_media_idx\` ON \`about_blocks_media_block\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'info' NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_banner_order_idx\` ON \`about_blocks_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_banner_parent_id_idx\` ON \`about_blocks_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_banner_path_idx\` ON \`about_blocks_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_form_block_order_idx\` ON \`about_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_form_block_parent_id_idx\` ON \`about_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_form_block_path_idx\` ON \`about_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_form_block_form_idx\` ON \`about_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`about_blocks_collection_item_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'work-items',
  	\`limit\` numeric DEFAULT 10,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_blocks_collection_item_list_order_idx\` ON \`about_blocks_collection_item_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_collection_item_list_parent_id_idx\` ON \`about_blocks_collection_item_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_blocks_collection_item_list_path_idx\` ON \`about_blocks_collection_item_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`about\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`content_heading\` text NOT NULL,
  	\`content_subheading\` text,
  	\`content_background_image_id\` integer,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`content_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`about_content_content_background_image_idx\` ON \`about\` (\`content_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`about_meta_meta_image_idx\` ON \`about\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE TABLE \`about_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`categories_id\` integer,
  	\`work_items_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_items_id\`) REFERENCES \`work_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_rels_order_idx\` ON \`about_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`about_rels_parent_idx\` ON \`about_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_rels_path_idx\` ON \`about_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`about_rels_pages_id_idx\` ON \`about_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`about_rels_categories_id_idx\` ON \`about_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`about_rels_work_items_id_idx\` ON \`about_rels\` (\`work_items_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_blocks_content_columns\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_blocks_content_columns_order_idx\` ON \`contact_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_content_columns_parent_id_idx\` ON \`contact_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_blocks_content_order_idx\` ON \`contact_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_content_parent_id_idx\` ON \`contact_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_content_path_idx\` ON \`contact_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`contact_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_blocks_cta_links_order_idx\` ON \`contact_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_cta_links_parent_id_idx\` ON \`contact_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_blocks_cta_order_idx\` ON \`contact_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_cta_parent_id_idx\` ON \`contact_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_cta_path_idx\` ON \`contact_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`contact_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_blocks_media_block_order_idx\` ON \`contact_blocks_media_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_media_block_parent_id_idx\` ON \`contact_blocks_media_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_media_block_path_idx\` ON \`contact_blocks_media_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_media_block_media_idx\` ON \`contact_blocks_media_block\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_blocks_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'info' NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_blocks_banner_order_idx\` ON \`contact_blocks_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_banner_parent_id_idx\` ON \`contact_blocks_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_banner_path_idx\` ON \`contact_blocks_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`contact_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_blocks_form_block_order_idx\` ON \`contact_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_form_block_parent_id_idx\` ON \`contact_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_form_block_path_idx\` ON \`contact_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_form_block_form_idx\` ON \`contact_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_blocks_collection_item_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'work-items',
  	\`limit\` numeric DEFAULT 10,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_blocks_collection_item_list_order_idx\` ON \`contact_blocks_collection_item_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_collection_item_list_parent_id_idx\` ON \`contact_blocks_collection_item_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_blocks_collection_item_list_path_idx\` ON \`contact_blocks_collection_item_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`contact\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`content_heading\` text NOT NULL,
  	\`content_subheading\` text,
  	\`content_background_image_id\` integer,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`content_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_content_content_background_image_idx\` ON \`contact\` (\`content_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_meta_meta_image_idx\` ON \`contact\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`categories_id\` integer,
  	\`work_items_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contact\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_items_id\`) REFERENCES \`work_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_rels_order_idx\` ON \`contact_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`contact_rels_parent_idx\` ON \`contact_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_rels_path_idx\` ON \`contact_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`contact_rels_pages_id_idx\` ON \`contact_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_rels_categories_id_idx\` ON \`contact_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`contact_rels_work_items_id_idx\` ON \`contact_rels\` (\`work_items_id\`);`)
  await db.run(sql`CREATE TABLE \`work_blocks_content_columns\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_blocks_content_columns_order_idx\` ON \`work_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_content_columns_parent_id_idx\` ON \`work_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`work_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_blocks_content_order_idx\` ON \`work_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_content_parent_id_idx\` ON \`work_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_content_path_idx\` ON \`work_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`work_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_blocks_cta_links_order_idx\` ON \`work_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_cta_links_parent_id_idx\` ON \`work_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`work_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_blocks_cta_order_idx\` ON \`work_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_cta_parent_id_idx\` ON \`work_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_cta_path_idx\` ON \`work_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`work_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_blocks_media_block_order_idx\` ON \`work_blocks_media_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_media_block_parent_id_idx\` ON \`work_blocks_media_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_media_block_path_idx\` ON \`work_blocks_media_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_media_block_media_idx\` ON \`work_blocks_media_block\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`work_blocks_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'info' NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_blocks_banner_order_idx\` ON \`work_blocks_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_banner_parent_id_idx\` ON \`work_blocks_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_banner_path_idx\` ON \`work_blocks_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`work_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_blocks_form_block_order_idx\` ON \`work_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_form_block_parent_id_idx\` ON \`work_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_form_block_path_idx\` ON \`work_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_form_block_form_idx\` ON \`work_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`work_blocks_collection_item_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'work-items',
  	\`limit\` numeric DEFAULT 10,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_blocks_collection_item_list_order_idx\` ON \`work_blocks_collection_item_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_collection_item_list_parent_id_idx\` ON \`work_blocks_collection_item_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_blocks_collection_item_list_path_idx\` ON \`work_blocks_collection_item_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`work\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`content_heading\` text NOT NULL,
  	\`content_subheading\` text,
  	\`content_background_image_id\` integer,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`content_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`work_content_content_background_image_idx\` ON \`work\` (\`content_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`work_meta_meta_image_idx\` ON \`work\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE TABLE \`work_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`categories_id\` integer,
  	\`work_items_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`work\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_items_id\`) REFERENCES \`work_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_rels_order_idx\` ON \`work_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`work_rels_parent_idx\` ON \`work_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_rels_path_idx\` ON \`work_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`work_rels_pages_id_idx\` ON \`work_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`work_rels_categories_id_idx\` ON \`work_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`work_rels_work_items_id_idx\` ON \`work_rels\` (\`work_items_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_content_columns\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_content_columns_order_idx\` ON \`services_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_content_columns_parent_id_idx\` ON \`services_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_content_order_idx\` ON \`services_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_content_parent_id_idx\` ON \`services_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_content_path_idx\` ON \`services_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_links_order_idx\` ON \`services_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_links_parent_id_idx\` ON \`services_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_order_idx\` ON \`services_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_parent_id_idx\` ON \`services_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_cta_path_idx\` ON \`services_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_media_block_order_idx\` ON \`services_blocks_media_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_media_block_parent_id_idx\` ON \`services_blocks_media_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_media_block_path_idx\` ON \`services_blocks_media_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_media_block_media_idx\` ON \`services_blocks_media_block\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_banner\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`style\` text DEFAULT 'info' NOT NULL,
  	\`content\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_banner_order_idx\` ON \`services_blocks_banner\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_banner_parent_id_idx\` ON \`services_blocks_banner\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_banner_path_idx\` ON \`services_blocks_banner\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_form_block_order_idx\` ON \`services_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_form_block_parent_id_idx\` ON \`services_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_form_block_path_idx\` ON \`services_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_form_block_form_idx\` ON \`services_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`services_blocks_collection_item_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'work-items',
  	\`limit\` numeric DEFAULT 10,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_blocks_collection_item_list_order_idx\` ON \`services_blocks_collection_item_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_collection_item_list_parent_id_idx\` ON \`services_blocks_collection_item_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_blocks_collection_item_list_path_idx\` ON \`services_blocks_collection_item_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`content_heading\` text NOT NULL,
  	\`content_subheading\` text,
  	\`content_background_image_id\` integer,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`content_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`services_content_content_background_image_idx\` ON \`services\` (\`content_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_meta_meta_image_idx\` ON \`services\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE TABLE \`services_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`categories_id\` integer,
  	\`work_items_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_items_id\`) REFERENCES \`work_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_rels_order_idx\` ON \`services_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_parent_idx\` ON \`services_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_path_idx\` ON \`services_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_pages_id_idx\` ON \`services_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_categories_id_idx\` ON \`services_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`services_rels_work_items_id_idx\` ON \`services_rels\` (\`work_items_id\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_nav_items_order_idx\` ON \`header_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_parent_id_idx\` ON \`header_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`cta_label\` text,
  	\`cta_link_type\` text DEFAULT 'reference',
  	\`cta_link_new_tab\` integer,
  	\`cta_link_url\` text,
  	\`cta_link_label\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`header_logo_idx\` ON \`header\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`header_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_rels_order_idx\` ON \`header_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_parent_idx\` ON \`header_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_path_idx\` ON \`header_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_pages_id_idx\` ON \`header_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_navigation_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_navigation_links_order_idx\` ON \`footer_navigation_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_navigation_links_parent_id_idx\` ON \`footer_navigation_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`content\` text,
  	\`navigation_title\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_rels_order_idx\` ON \`footer_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_parent_idx\` ON \`footer_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_path_idx\` ON \`footer_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_pages_id_idx\` ON \`footer_rels\` (\`pages_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`work_items\`;`)
  await db.run(sql`DROP TABLE \`work_items_rels\`;`)
  await db.run(sql`DROP TABLE \`_work_items_v\`;`)
  await db.run(sql`DROP TABLE \`_work_items_v_rels\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_header\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`socials\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_country\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_email\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_message\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_number\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_options\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_state\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_textarea\`;`)
  await db.run(sql`DROP TABLE \`forms_emails\`;`)
  await db.run(sql`DROP TABLE \`forms\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_submission_data\`;`)
  await db.run(sql`DROP TABLE \`form_submissions\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_banner\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`home_blocks_collection_item_list\`;`)
  await db.run(sql`DROP TABLE \`home\`;`)
  await db.run(sql`DROP TABLE \`home_rels\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_banner\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`about_blocks_collection_item_list\`;`)
  await db.run(sql`DROP TABLE \`about\`;`)
  await db.run(sql`DROP TABLE \`about_rels\`;`)
  await db.run(sql`DROP TABLE \`contact_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`contact_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`contact_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`contact_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`contact_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`contact_blocks_banner\`;`)
  await db.run(sql`DROP TABLE \`contact_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`contact_blocks_collection_item_list\`;`)
  await db.run(sql`DROP TABLE \`contact\`;`)
  await db.run(sql`DROP TABLE \`contact_rels\`;`)
  await db.run(sql`DROP TABLE \`work_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`work_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`work_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`work_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`work_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`work_blocks_banner\`;`)
  await db.run(sql`DROP TABLE \`work_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`work_blocks_collection_item_list\`;`)
  await db.run(sql`DROP TABLE \`work\`;`)
  await db.run(sql`DROP TABLE \`work_rels\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_banner\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`services_blocks_collection_item_list\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`services_rels\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP TABLE \`header_rels\`;`)
  await db.run(sql`DROP TABLE \`footer_navigation_links\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`footer_rels\`;`)
}
