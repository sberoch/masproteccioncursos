import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`courses\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`thumbnail_id\` integer,
  	\`passing_score\` numeric DEFAULT 70 NOT NULL,
  	\`is_published\` integer DEFAULT false,
  	\`created_by_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`courses_slug_idx\` ON \`courses\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`courses_thumbnail_idx\` ON \`courses\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`courses_created_by_idx\` ON \`courses\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`courses_updated_at_idx\` ON \`courses\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`courses_created_at_idx\` ON \`courses\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`modules\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`course_id\` integer NOT NULL,
  	\`position\` numeric DEFAULT 0 NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`modules_course_idx\` ON \`modules\` (\`course_id\`);`)
  await db.run(sql`CREATE INDEX \`modules_position_idx\` ON \`modules\` (\`position\`);`)
  await db.run(sql`CREATE INDEX \`modules_updated_at_idx\` ON \`modules\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`modules_created_at_idx\` ON \`modules\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`lessons_questions_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`option_text\` text,
  	\`is_correct\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`lessons_questions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`lessons_questions_options_order_idx\` ON \`lessons_questions_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`lessons_questions_options_parent_id_idx\` ON \`lessons_questions_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`lessons_questions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question_text\` text,
  	\`question_type\` text DEFAULT 'multiple_choice',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`lessons\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`lessons_questions_order_idx\` ON \`lessons_questions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`lessons_questions_parent_id_idx\` ON \`lessons_questions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`lessons\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`module_id\` integer NOT NULL,
  	\`type\` text NOT NULL,
  	\`position\` numeric DEFAULT 0 NOT NULL,
  	\`is_final_quiz\` integer DEFAULT false,
  	\`youtube_url\` text,
  	\`duration_seconds\` numeric,
  	\`body\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`module_id\`) REFERENCES \`modules\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`lessons_module_idx\` ON \`lessons\` (\`module_id\`);`)
  await db.run(sql`CREATE INDEX \`lessons_position_idx\` ON \`lessons\` (\`position\`);`)
  await db.run(sql`CREATE INDEX \`lessons_updated_at_idx\` ON \`lessons\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`lessons_created_at_idx\` ON \`lessons\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`lesson_progress\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user_id\` integer NOT NULL,
  	\`lesson_id\` integer NOT NULL,
  	\`completed\` integer DEFAULT false,
  	\`completed_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lesson_id\`) REFERENCES \`lessons\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`lesson_progress_user_idx\` ON \`lesson_progress\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`lesson_progress_lesson_idx\` ON \`lesson_progress\` (\`lesson_id\`);`)
  await db.run(sql`CREATE INDEX \`lesson_progress_updated_at_idx\` ON \`lesson_progress\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`lesson_progress_created_at_idx\` ON \`lesson_progress\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`quiz_attempts_answers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question_index\` numeric NOT NULL,
  	\`selected_option_index\` numeric NOT NULL,
  	\`is_correct\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`quiz_attempts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`quiz_attempts_answers_order_idx\` ON \`quiz_attempts_answers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`quiz_attempts_answers_parent_id_idx\` ON \`quiz_attempts_answers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`quiz_attempts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user_id\` integer NOT NULL,
  	\`lesson_id\` integer NOT NULL,
  	\`score_percent\` numeric NOT NULL,
  	\`passed\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lesson_id\`) REFERENCES \`lessons\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`quiz_attempts_user_idx\` ON \`quiz_attempts\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`quiz_attempts_lesson_idx\` ON \`quiz_attempts\` (\`lesson_id\`);`)
  await db.run(sql`CREATE INDEX \`quiz_attempts_updated_at_idx\` ON \`quiz_attempts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`quiz_attempts_created_at_idx\` ON \`quiz_attempts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`certificates\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user_id\` integer NOT NULL,
  	\`course_id\` integer NOT NULL,
  	\`quiz_attempt_id\` integer NOT NULL,
  	\`external_certificate_id\` text,
  	\`external_certificate_url\` text,
  	\`issued_at\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`quiz_attempt_id\`) REFERENCES \`quiz_attempts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`certificates_user_idx\` ON \`certificates\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`certificates_course_idx\` ON \`certificates\` (\`course_id\`);`)
  await db.run(sql`CREATE INDEX \`certificates_quiz_attempt_idx\` ON \`certificates\` (\`quiz_attempt_id\`);`)
  await db.run(sql`CREATE INDEX \`certificates_updated_at_idx\` ON \`certificates\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`certificates_created_at_idx\` ON \`certificates\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`role\` text DEFAULT 'admin' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`courses_id\` integer REFERENCES courses(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`modules_id\` integer REFERENCES modules(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`lessons_id\` integer REFERENCES lessons(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`lesson_progress_id\` integer REFERENCES lesson_progress(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`quiz_attempts_id\` integer REFERENCES quiz_attempts(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`certificates_id\` integer REFERENCES certificates(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_courses_id_idx\` ON \`payload_locked_documents_rels\` (\`courses_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_modules_id_idx\` ON \`payload_locked_documents_rels\` (\`modules_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_lessons_id_idx\` ON \`payload_locked_documents_rels\` (\`lessons_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_lesson_progress_id_idx\` ON \`payload_locked_documents_rels\` (\`lesson_progress_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_quiz_attempts_id_idx\` ON \`payload_locked_documents_rels\` (\`quiz_attempts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_certificates_id_idx\` ON \`payload_locked_documents_rels\` (\`certificates_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`courses\`;`)
  await db.run(sql`DROP TABLE \`modules\`;`)
  await db.run(sql`DROP TABLE \`lessons_questions_options\`;`)
  await db.run(sql`DROP TABLE \`lessons_questions\`;`)
  await db.run(sql`DROP TABLE \`lessons\`;`)
  await db.run(sql`DROP TABLE \`lesson_progress\`;`)
  await db.run(sql`DROP TABLE \`quiz_attempts_answers\`;`)
  await db.run(sql`DROP TABLE \`quiz_attempts\`;`)
  await db.run(sql`DROP TABLE \`certificates\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`media_id\` integer,
  	\`users_id\` integer,
  	\`socials_id\` integer,
  	\`forms_id\` integer,
  	\`form_submissions_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`socials_id\`) REFERENCES \`socials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "pages_id", "media_id", "users_id", "socials_id", "forms_id", "form_submissions_id") SELECT "id", "order", "parent_id", "path", "pages_id", "media_id", "users_id", "socials_id", "forms_id", "form_submissions_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_socials_id_idx\` ON \`payload_locked_documents_rels\` (\`socials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`role\`;`)
}
