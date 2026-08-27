/*
# Create photos table and storage bucket for birthday website

1. New Tables
- `photos`
  - `id` (uuid, primary key)
  - `slot` (text, not null, unique) — identifies which photo slot this fills (e.g. "hero", "cover", "chapter-01-0", "gallery-3")
  - `storage_path` (text, not null) — path in the Supabase storage bucket
  - `caption` (text, nullable) — optional caption for gallery photos
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

2. Storage
- Create a public storage bucket named `photos` for storing uploaded images.
- Set public policies so the anon-key client can upload, read, and delete objects.

3. Security
- Enable RLS on `photos` table.
- Allow anon + authenticated CRUD (single-tenant personal gift site, no sign-in).
- Storage bucket is public for read; upload/delete allowed for anon + authenticated.

4. Notes
- This is a single-tenant personal birthday gift site with no sign-in, so all policies use `TO anon, authenticated`.
- The `photos` table uses a unique `slot` column so each photo slot has exactly one photo (upsert pattern).
*/

-- Create photos table
CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot text NOT NULL UNIQUE,
  storage_path text NOT NULL,
  caption text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- CRUD policies for anon + authenticated (single-tenant, no auth)
DROP POLICY IF EXISTS "anon_select_photos" ON photos;
CREATE POLICY "anon_select_photos" ON photos FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_photos" ON photos;
CREATE POLICY "anon_insert_photos" ON photos FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_photos" ON photos;
CREATE POLICY "anon_update_photos" ON photos FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_photos" ON photos;
CREATE POLICY "anon_delete_photos" ON photos FOR DELETE
  TO anon, authenticated USING (true);

-- Create the storage bucket (idempotent)
INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: allow anon + authenticated to read, upload, and delete
DROP POLICY IF EXISTS "anon_read_photos_bucket" ON storage.objects;
CREATE POLICY "anon_read_photos_bucket" ON storage.objects FOR SELECT
  TO anon, authenticated USING (bucket_id = 'photos');

DROP POLICY IF EXISTS "anon_write_photos_bucket" ON storage.objects;
CREATE POLICY "anon_write_photos_bucket" ON storage.objects FOR INSERT
  TO anon, authenticated WITH CHECK (bucket_id = 'photos');

DROP POLICY IF EXISTS "anon_update_photos_bucket" ON storage.objects;
CREATE POLICY "anon_update_photos_bucket" ON storage.objects FOR UPDATE
  TO anon, authenticated USING (bucket_id = 'photos') WITH CHECK (bucket_id = 'photos');

DROP POLICY IF EXISTS "anon_delete_photos_bucket" ON storage.objects;
CREATE POLICY "anon_delete_photos_bucket" ON storage.objects FOR DELETE
  TO anon, authenticated USING (bucket_id = 'photos');